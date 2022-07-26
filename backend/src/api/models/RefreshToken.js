const db = require("../../config/database");

module.exports = class RefreshToken {
  /**
   * Create refreshToken model
   * @param {string} issued_at
   * @param {string} user_id
   */
  constructor(issued_at, user_id) {
    this.issued_at = issued_at;
    this.user_id = user_id;
  }

  /**
   * Return the claims associated with the refresh token if they exist in database
   */
  static findClaims(issued_at, user_id) {
    return db.execute(
      "SELECT issued_at, BIN_TO_UUID(user_id) AS user_id FROM refresh_token WHERE ISSUED_AT=? AND user_id=UUID_TO_BIN(?)",
      [issued_at, user_id]
    );
  }

  /**
   * Delete all refresh tokens valid for a given user
   */
  static invalidateAll(user_id) {
    return db.execute("DELETE FROM refresh_token WHERE user_id=?", [user_id]);
  }

  /**
   * Delete a specific refresh token
   */
  static revoke(issued_at, user_id) {
    return db.execute(
      "DELETE FROM refresh_token WHERE issued_at=? AND user_id=UUID_TO_BIN(?)",
      [issued_at, user_id]
    );
  }

  /**
   * Add claims needed for this refresh token to database
   */
  addClaims() {
    return db.execute(
      "INSERT INTO refresh_token (issued_at, user_id) VALUES (?, UUID_TO_BIN(?))",
      [this.issued_at, this.user_id]
    );
  }
};
