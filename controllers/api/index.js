const router = require("express").Router();
const userRoutes = require("./user");
const bookRoutes = require("./book");

router.use("/user", userRoutes);
router.use("/book", bookRoutes);

module.exports = router;
