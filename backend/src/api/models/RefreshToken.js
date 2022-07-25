const db = require("../../config/database");

module.exports = class RefreshToken {
  /**
   * Create refreshToken model
   * @param {string} token
   * @param {string} user_id
   */
  constructor(token, user_id) {
    this.token = token;
    this.user_id = user_id;
  }

  /**
   * Return user id associated with a refresh token if it exists
   */
  static verifyRefresh(token) {
    return db.execute(
      "SELECT BIN_TO_UUID(user_id) as id FROM refresh_token WHERE token=?",
      [token]
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
  static revoke(token) {
    return db.execute("DELETE FROM refresh_token WHERE token=?", [token]);
  }

  addRefresh() {
    return db.execute(
      "INSERT INTO refresh_token (token, user_id) VALUES (?, UUID_TO_BIN(?))",
      [this.token, this.user_id]
    );
  }
};
