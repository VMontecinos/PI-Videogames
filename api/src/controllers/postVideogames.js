const { Videogame } = require("../db");

const postVideogames = async (req, res) => {
  const { name, description, platforms, background_image, released, rating } =
    req.body;
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

module.exports = { postVideogames };
