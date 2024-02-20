const axios = require("axios");
const myProcess = process.env;

const getVideogamesService = async (search) => {
  if (search) {
    search = search.split(" ").join("-").toLowerCase();

    try {
      const { data } = await axios(
        `https://api.rawg.io/api/games?key=${myProcess.API_KEY}&search=${search}`
      );

      if (!data) {
        throw new Error("No games match that name. Please try again!");
      }

      const { results } = data;

      return results;
    } catch (error) {
      console.log(error);
    }
    const { data } = await axios(URL);

    if (!data) {
      throw new Error("No games were found. Please try again!");
    }
    const { results } = data;

    return results;
  }
};

const getGameByIdService = async (id) => {
  const URL = `https://api.rawg.io/api/games/${id}?key=${myProcess.API_KEY}`;

  try {
    const response = await axios.get(URL);
    const { data } = response;

    if (!data.id) {
      throw new Error("No games match that ID. Please try again!");
    }

    let { name, description, platforms, background_image, released, ratings } =
      data;

    if (background_image === null) {
      background_image =
        "https://www.pngitem.com/pimgs/m/17-175435_console-png-free-image-console-png-transparent-png.png";
    }

    const game = {
      id,
      name,
      description,
      platforms,
      background_image,
      released,
      ratings,
    };

    return game;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  gameService: getVideogamesService,
  gameIdService: getGameByIdService,
};
