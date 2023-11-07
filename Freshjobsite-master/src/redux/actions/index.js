import { store } from "../index";

function dispatch(action) {
  store.dispatch(action);
}

// export function saveUser(status) {
//   return dispatch => {
//     dispatch({type: 'CHANGE_STATUS', payload: status});
//   };
// }

export function savedReactions(payload) {
  dispatch({ type: "SAVED_REACTION", payload });
}
export function ReactionsValue(payload) {
  dispatch({ type: "SAVE_REACTION_VALUE", payload });
}
export function loaderStart() {
  dispatch({ type: "LOADER_START" });
}
export function loaderStop() {
  dispatch({ type: "LOADER_STOP" });
}
export function saveUser(user) {
  dispatch({ type: "SAVE_USER", payload: user });
}
export function saveToken(token) {
  dispatch({ type: "SAVE_TOKEN", payload: token });
}
export function resetUser() {
  dispatch({ type: "RESET_USER" });
}
export function changeLanguage(language) {
  dispatch({ type: "CHANGE_LANGUAGE", payload: language });
}
export function ingredientsList(ingredient) {
  dispatch({ type: "SAVE_INGREDIENT", payload: ingredient });
}
