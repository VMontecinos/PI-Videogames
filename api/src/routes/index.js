const router = require("express").Router();
const getGamesRouter = require("../routes/videogames");
const createGamesRouter = require("../routes/createVideogame");
const getGenresRouter = require("../routes/genres");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.use("/games", getGamesRouter);
router.use("/create", createGamesRouter);
router.use("/genres", getGenresRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
