require("dotenv").config();
const { gameService, gameIdService } = require("../service/getVideogames");
const { Videogame } = require("../db");
const { Op } = require("sequelize");

const getVideogames = async (req, res) => {
  let { search, page } = req.query;
  const { id } = req.params;

  const isUUID = (str) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(str);
  };

  if (id) {
    if (Number(id)) {
      const apiResponse = await gameIdService(id);
      res.status(200).json(apiResponse);
    } else if (isUUID(id)) {
      try {
        const dbResponse = await Videogame.findByPk(id);
        const { dataValues } = dbResponse;
        if (dbResponse) {
          res.status(200).json(dataValues);
        } else {
          res.status(404).json({ message: "Game not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.status(400).json({ message: "Invalid ID format" });
    }
  } else if (search) {
    try {
      const apiResponse = await gameService(search);
      const dbResponse = await Videogame.findAll({
        where: { name: { [Op.iLike]: `%${search}%` } },
      });
      if (dbResponse.length > 0) {
        return res.status(200).json([...dbResponse, ...apiResponse]);
      } else {
        res.status(200).json(apiResponse);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const games = await gameService((search = ""), page);
      res.status(200).json(games);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { getVideogames };
