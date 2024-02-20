require("dotenv").config();
const { gameService, gameIdService } = require("../service/getVideogames");
const { Videogame } = require("../db");

const getVideogames = async (req, res) => {
  const { search } = req.query;
  const { id } = req.params;

  if (id) {
    try {
      const response = await gameIdService(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  } else if (search) {
    try {
      const response = await gameService(search);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const games = await gameService();
      res.status(200).json(games);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { getVideogames };
