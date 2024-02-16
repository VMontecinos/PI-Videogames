const axios = require("axios");
const myProcess = process.env;

const getGenres = async () => {
  const URL = `https://api.rawg.io/api/genres?key=${myProcess.API_KEY}`;

  const { data } = await axios(URL);

  if (!data) {
    throw new Error("No genres were found. Please try again!");
  }

  const { results } = data;

  return results;
};

module.exports = { getGenreService: getGenres };
