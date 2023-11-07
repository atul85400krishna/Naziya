const INITIAL_STATES = {
  user: null,
  token: "",
  loader: false,
  language: "en",
  ingredients: null,
  recentReaction: null,
  recentvalue: [
    { id: 1, rating: 0 },
    { id: 2, rating: 0 },
    { id: 3, rating: 0 },
    { id: 4, rating: 0 },
    { id: 5, rating: 0 },
  ],
};

export default function (state = INITIAL_STATES, action) {
  switch (action.type) {
    case "SAVE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SAVED_REACTION":
      return {
        ...state,
        recentReaction: action.payload,
      };
    case "SAVE_REACTION_VALUE":
      return {
        ...state,
        recentvalue: action.payload,
      };
    case "SAVE_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "RESET_USER":
      return {
        ...state,
        user: null,
      };
    case "LOADER_START":
      return {
        ...state,
        loader: true,
      };
    case "LOADER_STOP":
      return {
        ...state,
        loader: false,
      };
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
}
