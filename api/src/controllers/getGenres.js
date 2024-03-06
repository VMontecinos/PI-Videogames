require("dotenv").config();
const { getGenreService } = require("../service/getGenres");
const { GameGenre } = require("../db");

const getGenres = async (req, res) => {
  try {
    const response = await getGenreService();

    if (await GameGenre.findAll()) {
      const data = response.map((gameGenre) => ({
        id: gameGenre.id,
        name: gameGenre.name,
      }));
      return res.status(200).json(data);
    } else {
      try {
        const promise = await GameGenre.bulkCreate(response);
        const data = promise.map((gameGenre) => gameGenre.dataValues);
        return res.status(200).json(data);
      } catch (error) {
        console.log("The following error occurred:", error);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getGenres;
