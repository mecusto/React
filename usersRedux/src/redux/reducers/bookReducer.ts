import { TAction } from "../types";
import { IBook } from "../../Interface/IBook";

const initialState: IBook[]= [];

export default(state = initialState, action: TAction) => {
        switch (action.type) {
            case 'SET_BOOKS':
                return action.payload;
            default:
                return state;
        }
}  