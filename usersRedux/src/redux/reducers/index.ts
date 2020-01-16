import { combineReducers } from "redux";

import users from "./usersReducer";
import books from "./bookReducer";
import userReducer from "./userReducer"; 
import userProfile from "./loginReducer";

import { IStore } from "../../Interface/IStore";


export default combineReducers<IStore>({
  users,
  books,
  userProfile,
  userReducer
});  
