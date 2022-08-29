exports.getMessage = (req, res) => {
  res.json({
    greet: `Hello, ${req.userID}.`,
    message: "This is the secret message!",
  });
};
