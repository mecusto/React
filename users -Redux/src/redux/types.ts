 import { IUser } from "../Interface/IUser";
 import { IBook } from "../Interface/IBook";


interface ISetProfile {
    type: "SET_USER_PROFILE";
    payload: string;
}

interface ISetUsers {
    type: "SET_USERS";
    payload: IUser[];
}

interface ISetBooks {
    type: "SET_BOOKS";
    payload: IBook[];
}

interface ISetUserbooks{
    type: "SET_USERBOOKS";
    payload: IBook[]
}

interface ISetIdUser{
    type: "SET_ID_USER";
    payload: number;
}

interface ISetToken{
    type: "SET_TOKEN";
    payload: string;
}

export type TAction = ISetIdUser 
| ISetProfile 
| ISetUsers 
| ISetBooks 
| ISetUserbooks
| ISetToken;