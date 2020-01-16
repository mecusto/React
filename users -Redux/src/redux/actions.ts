
import { TAction } from "./types";
import { IBook } from "../Interface/IBook";
import { IUser } from "../Interface/IUser";

export const setUserAction = (users:IUser[]): TAction => ({
  type: "SET_USERS",
  payload: users
})

export const setBooksAction = (books:IBook[]): TAction => ({
  type: "SET_BOOKS",
  payload: books
})

export const setProfileAction = (token: string): TAction => ({
  type: "SET_USER_PROFILE",
  payload: token
})

export const setUserBooksAction = (userbooks: IBook[]): TAction => ({
  type: "SET_USERBOOKS",
  payload: userbooks
})

export const setIdUserAction = (id_user: number): TAction => ({
  type: "SET_ID_USER",
  payload: id_user
})