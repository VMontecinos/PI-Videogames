require("dotenv").config();
const { getGenreService } = require("../service/getGenres");
const { GameGenre } = require("../db");

const getGenres = async (req, res) => {
  try {
    const response = await getGenreService();

    for (let i = 0; i < response.length; i++) {
      const id = response[i].id;
      const name = response[i].slug;

      const [genre, created] = await GameGenre.findOrCreate({
        where: { id: id },
        defaults: {
          id,
          name,
        },
      });
      if (!created) {
        return res.status(400).json({
          message:
            "A genre with this ID already exists. Please use a different ID.",
        });
      }
    }

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getGenres;
