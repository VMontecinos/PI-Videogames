const axios = require("axios");
const myProcess = process.env;

const getVideogamesService = async () => {
  const URL = `https://api.rawg.io/api/games?key=${myProcess.API_KEY}`;

  const { data } = await axios(URL);

  if (!data) {
    throw new Error("No games were found. Please try again!");
  }
  const { results } = data;

  return results;
};

const getGameByIdService = async (id) => {
  const URL = `https://api.rawg.io/api/games/${id}?key=${myProcess.API_KEY}`;

  const promise = await axios(URL);

  const {
    data,
    data: { name, description, platforms, image, releaseDate, rating },
  } = promise;

  if (!data.id) {
    throw new Error("No games match that ID. Please try again!");
  }

  const game = {
    id,
    name,
    description,
    platforms,
    image,
    releaseDate,
    rating,
  };

  return game;
};

const getGamesByNameService = async (search) => {
  search = search.split(" ").join("-").toLowerCase();

  const URL = `https://api.rawg.io/api/games?key=${myProcess.API_KEY}&search=${search}`;

  const { data } = await axios(URL);

  if (!data) {
    throw new Error("No games found with that name. Please try again!");
  }
  const { results } = data;

  return results;
};

module.exports = {
  gameService: getVideogamesService,
  gameIdService: getGameByIdService,
  gameNameService: getGamesByNameService,
};
