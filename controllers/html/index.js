const router = require("express").Router();
const homeRoutes = require("./home");

router.use("/", homeRoutes);

module.exports = router;
