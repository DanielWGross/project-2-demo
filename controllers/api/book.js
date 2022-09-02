const { Book } = require("../../models");
const router = require("express").Router();
const { withAuth } = require("../../utils");

/**
 * Create a books
 * /api/book
 */
router.post("/", withAuth, async (req, res) => {
  const { title, image, description } = req.body;
  const UserId = req.session.userId;

  try {
    const newBook = await Book.create({
      title,
      image,
      author: "Dan Gross - Best Author Ever",
      description,
      UserId,
    });

    res.json(newBook);
  } catch (error) {
    console.log("🚀 ~ file: user.js ~ line 26 ~ router.post ~ error", error);
    return res
      .status(500)
      .json({ message: "Something has gone terribly wrong" });
  }
});

/**
 * Get Books by User
 * /api/book
 */
router.get("/", withAuth, async (req, res) => {
  const UserId = req.session.userId;

  try {
    const dbBooks = await Book.findAll({
      where: {
        UserId,
      },
    });
    dbBooks.map((book) => book.get({ plain: true }));
    res.status(200).json(dbBooks);
  } catch (error) {
    console.log("🚀 ~ file: user.js ~ line 26 ~ router.post ~ error", error);
    return res
      .status(500)
      .json({ message: "Something has gone terribly wrong" });
  }
});

module.exports = router;
