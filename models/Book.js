const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

class Book extends Model {}

Book.init(
  {
    bookId: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    author: {
      // If there are more than 1 authors we're kinda screwed at the moment
      // MYSQL doesn't support arrays as datatypes
      // As a workaround we could add a getter/setter here
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
  }
);

module.exports = Book;
