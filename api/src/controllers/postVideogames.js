const { Videogame } = require("../db");

const postVideogames = async (req, res) => {
  let {
    name,
    description,
    platforms,
    genres,
    background_image,
    released,
    rating,
  } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ message: "Your game is missing information." });

  const slug = name.split(" ").join("-").toLowerCase();

  try {
    const [game, created] = await Videogame.findOrCreate({
      where: {
        name: slug,
      },
      defaults: {
        name,
        slug,
        description,
        platforms,
        genres,
        background_image,
        released,
        rating,
      },
    });

    if (!created) {
      return res.status(400).json({ message: "This game already exists." });
    } else {
      return res
        .status(201)
        .json({ message: "Game created successfully.", game });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeVideogame = async (req, res) => {
  const { id } = req.params;

  try {
    const gameFind = await Videogame.findOne({ where: { id: id } });
    if (!gameFind) {
      return res.status(400).json({
        message: "That game doesn't exist.",
      });
    }

    await Videogame.destroy({ where: { id: id } });
    return res.status(200).json({
      message: "Game removed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { postVideogames, removeVideogame };
