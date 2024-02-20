const router = require("express").Router();
const { getVideogames } = require("../controllers/getVideogames");

router.get("/", getVideogames);
router.get("/:id", getVideogames);

module.exports = router;
