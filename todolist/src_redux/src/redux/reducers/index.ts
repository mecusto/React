import { combineReducers } from "redux";

import todos from "./todosReducer";


// combinar todos los reducers, en nuestro caso de momento solo están los ToDo
export default combineReducers({
  todos
});
