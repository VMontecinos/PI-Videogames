require("dotenv").config();
const {
  gameService,
  gameIdService,
  gameNameService,
} = require("../service/getVideogames");
const { Videogame } = require("../db");

const getVideogames = async (req, res) => {
  const { search } = req.query;

  if (!search) {
    try {
      const response = await gameService();
      return res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    if (!search || typeof search !== "string") {
      return res.status(400).send("You must provide a valid search term!");
    }

    try {
      const apiFind = await gameNameService(search);
      const dbFind = await Videogame.findOne({
        where: {
          slug: search,
        },
      });

      const response = { apiFind, dbFind };

      return res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

const getGameById = async (req, res) => {
  const { id } = req.params;

  if (!isNaN(Number(id))) {
    try {
      const response = await gameIdService(id);

      return res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    const findGame = await Videogame.findOne({
      where: {
        id: id,
      },
    });
    if (!findGame) {
      return res
        .status(404)
        .json({ message: "There are no games with this ID." });
    }
    return res.status(200).json(findGame);
  }
};

module.exports = { getVideogames, getGameById };
