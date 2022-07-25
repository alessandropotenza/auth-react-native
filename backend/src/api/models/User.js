const db = require("../../config/database");

module.exports = class User {
  /**
   * Create user model
   * @param {string} email
   * @param {string} password
   */
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static getPassword(email) {
    return db.execute("SELECT password FROM user WHERE email=?", [email]);
  }

  /**
   * Return the user ID for a given email
   */
  static getID(email) {
    return db.execute(
      "SELECT BIN_TO_UUID(userID) AS id FROM user WHERE email=?",
      [email]
    );
  }

  /**
   * Sign up a user with their credentials
   */
  signUp() {
    return db.execute("INSERT INTO user (email, password) VALUES (?, ?)", [
      this.email,
      this.password,
    ]);
  }

  /**
   * Return this user's ID
   */
  getID() {
    return db.execute(
      "SELECT BIN_TO_UUID(userID) AS id FROM user WHERE email=?",
      [this.email]
    );
  }
};
