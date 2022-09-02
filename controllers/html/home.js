const router = require("express").Router();
const axios = require("axios");
const { Book } = require("../../models");

/**
 * Load the homepage
 * /
 */
router.get("/", async (req, res) => {
  const loggedIn = req.session.loggedIn;
  console.log("🚀 ~ file: home.js ~ line 9 ~ router.get ~ loggedIn", loggedIn);

  res.render("home", {
    loggedIn,
  });
});

router.get("/profile", async (req, res) => {
  const UserId = req.session.userId;
  const loggedIn = req.session.loggedIn;

  try {
    const dbBooks = await Book.findAll({
      where: {
        UserId,
      },
    });
    const books = dbBooks.map((book) => book.get({ plain: true }));
    res.render("profile", {
      books,
      loggedIn,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.js ~ line 26 ~ router.post ~ error", error);
    return res
      .status(500)
      .json({ message: "Something has gone terribly wrong" });
  }
});

/**
 * /search/:term
 */
router.get("/search/:term", async (req, res) => {
  const term = req.params.term;
  const loggedIn = req.session.loggedIn;
  console.log("🚀 ~ file: home.js ~ line 23 ~ router.get ~ loggedIn", loggedIn);

  if (!term || term === "...") {
    res.end();
  }

  const axiosResponse = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${term}`
  );

  const books = axiosResponse.data.items.map((item) => {
    return {
      bookId: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors[0],
      description: item.volumeInfo.description,
      image: item.volumeInfo.imageLinks.smallThumbnail,
    };
  });
  res.render("results", {
    books,
    loggedIn,
  });
});

router.get("/login", async (req, res) => {
  const loggedIn = req.session.loggedIn;

  res.render("login", {
    loggedIn,
  });
});
module.exports = router;
