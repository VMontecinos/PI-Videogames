const router = require("express").Router();
const { postVideogames } = require("../controllers/postVideogames");

router.post("/", postVideogames);

module.exports = router;
