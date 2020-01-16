import { TAction } from "../types";
import { IUser } from "../../Interface/IUser";

const initialState: IUser[] =[];

export default (state = initialState, action: TAction) => {
        switch (action.type) {
            case 'SET_USERS':
                return action.payload
            default:
                return state;
        }
}  