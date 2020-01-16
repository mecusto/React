import { IBook } from "./IBook";

export interface IUserReducer {
    id_user: number;
    userbooks: IBook[];
  }