import { TAction } from "../types";
import { IUserReducer } from "../../Interface/IUserReducer";


const initialState: IUserReducer = {
    id_user: -1,
    userbooks: []    
};

export default (state = initialState, action: TAction): IUserReducer => {
        switch (action.type) {
            case 'SET_ID_USER':               
                return { id_user: action.payload, userbooks: state.userbooks }
            case 'SET_USERBOOKS':
                return { id_user: state.id_user, userbooks: action.payload }
            default:
                return state;
        }
}  