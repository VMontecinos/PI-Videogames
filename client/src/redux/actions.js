export const GET_GENRES = "GET_GENRES";
export const ADD_GAME = "ADD_GAME";
export const ADD_ALL_GAMES = "ADD_ALL_GAMES";
export const FILTER_GAMES = "FILTER_GAMES";
export const SORT_GAMES = "SORT_GAMES";
export const REMOVE_GAME = "REMOVE_GAME";
import axios from "axios";

export const getGenres = () => {
  const endpoint = "http://localhost:3001/gameware/genres";

  return async (dispatch) => {
    const { data } = await axios.get(endpoint);

    return dispatch({
      type: GET_GENRES,
      payload: data,
    });
  };
};

export const addGame = (game) => {
  const endpoint = "http://localhost:3001/gameware/create";
  return async (dispatch) => {
    const { data } = await axios.post(endpoint, game);

    return dispatch({
      type: ADD_GAME,
      payload: data,
    });
  };
};

export const removeGame = (game) => {
  return { type: REMOVE_GAME, payload: game };
};

export const addAllGames = (games) => {
  return { type: ADD_ALL_GAMES, payload: games };
};

export const filterGames = (genre) => {
  return { type: FILTER_GAMES, payload: genre };
};

export const sortGames = (order) => {
  return { type: SORT_GAMES, payload: order };
};
