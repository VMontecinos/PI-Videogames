require("dotenv").config();
const { getGenreService } = require("../service/getGenres");
const { GameGenre } = require("../db");

const getGenres = async (req, res) => {
  try {
    const response = await getGenreService();

    let id = response.map((obj) => obj.id);

    console.log(id);

    const name = response.map((obj) => obj.name);

    console.log(name);

    const [genre, created] = await GameGenre.findOrCreate({
      where: {
        id: id,
      },
      defaults: {
        id: id,
        name: name,
      },
    });

    if (!created) {
      return res.status(400).json({
        message:
          "A genre with this ID already exists. Please use a different ID.",
      });
    }
    return res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getGenres;
