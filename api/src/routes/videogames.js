const router = require("express").Router();
const { getVideogames, getGameById } = require("../controllers/getVideogames");

router.get("/", getVideogames);
router.get("/:id", getGameById);

module.exports = router;
