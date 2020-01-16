import { combineReducers } from "redux";

import todos from "./todosReducer";
import { IStore } from "../../interfaces/IStore";

export default combineReducers<IStore>({
  todos
});
