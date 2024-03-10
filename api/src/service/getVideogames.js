const axios = require("axios");
const myProcess = process.env;

const getVideogamesService = async (search, page) => {
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

      const updatedResults = results.map(({ genres, ...rest }) => ({
        genres: genres.map((genre) => genre.name),
        ...rest,
      }));

      return updatedResults;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const { data } = await axios(
        `https://api.rawg.io/api/games?key=${myProcess.API_KEY}&page=${page}`
      );

      if (!data) {
        throw new Error("No games were found. Please try again!");
      }

      const { results } = data;

      const updatedResults = results.map(({ genres, ...rest }) => ({
        genres: genres.map((genre) => genre.name),
        ...rest,
      }));

      return updatedResults;
    } catch (error) {
      console.log(error);
    }
  }
};

const getGameByIdService = async (id) => {
  const URL = `https://api.rawg.io/api/games/${id}?key=${myProcess.API_KEY}`;
  try {
    const response = await axios(URL);
    const { data } = response;

    if (!data.id) {
      throw new Error("No games match that ID. Please try again!");
    }

    let {
      name,
      description,
      platforms,
      genres,
      background_image,
      released,
      rating,
    } = data;

    platforms = platforms.map(({ platform }) => {
      return platform.name;
    });

    if (background_image === null) {
      background_image =
        "https://i.pinimg.com/736x/95/4b/cd/954bcd8a30e8c1222d0b3095ea3e54f5.jpg";
    }

    const game = {
      id,
      name,
      description,
      genres,
      platforms,
      background_image,
      released,
      rating,
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
