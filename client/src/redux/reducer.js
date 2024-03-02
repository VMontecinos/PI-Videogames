import {
  GET_GENRES,
  ADD_GAME,
  ADD_ALL_GAMES,
  FILTER_GAMES,
  SORT_GAMES,
} from "./actions";

const initialState = {
  allGames: [],
  myGames: [],
};

export const rootReducer = (
  state = initialState,
  { type, payload } = action
) => {
  switch (type) {
    case GET_GENRES:
      return {
        ...state,
        allGenres: payload,
      };
    case ADD_GAME:
      return {
        ...state,
        myGames: payload,
        allGames: payload,
      };
    case ADD_ALL_GAMES:
      return {
        ...state,
        allGames: payload,
      };
    case FILTER_GAMES:
      const gameFilter = state.allGames.filter((game) => {
        if (payload === "Any") {
          return { ...state, ...state.allGames };
        }
        return game.genre.includes(payload);
      });

      return {
        ...state,
        allGames: gameFilter,
      };
    case SORT_GAMES:
      const gameSortByName = [...state.allGames];
      gameSortByName.sort((a, b) => {
        const nameA = a.slug ? a.slug : ""; // Check if slug property exists
        const nameB = b.slug ? b.slug : "";
        console.log(nameA.localeCompare(nameB));
        return payload === "A"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      return {
        ...state,
        allGames: gameSortByName,
      };
    default:
      return { ...state };
  }
};
