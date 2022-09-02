module.exports = {
  truncate: (string) => {
    if (!string) {
      return "No description for this book";
    }
    return string.substring(0, 100);
  },
};
