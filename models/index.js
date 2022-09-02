const User = require("./User");
const Book = require("./Book");

User.hasMany(Book);
Book.belongsTo(User);

module.exports = { Book, User };
