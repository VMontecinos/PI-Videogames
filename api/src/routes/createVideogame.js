const router = require("express").Router();
const {
  postVideogames,
  removeVideogame,
} = require("../controllers/postVideogames");

router.post("/", postVideogames);
router.delete("/:id", removeVideogame);

module.exports = router;
