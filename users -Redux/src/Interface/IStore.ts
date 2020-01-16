import { IUser } from "./IUser";
import { IBook } from "./IBook";
import { IProfile } from "./IProfile";
import { IUserReducer } from './IUserReducer';

export interface IStore {
  users: IUser[];
  books: IBook[];
  userProfile: IProfile;
  userReducer: IUserReducer; //id selected user y usersbooks
  // token: string; dentro del profile
}
