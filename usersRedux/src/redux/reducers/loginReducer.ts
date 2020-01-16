import { TAction } from "../types";
import jwt from "jsonwebtoken";
import { IProfile } from "../../Interface/IProfile";

const initialState:IProfile = {
    token: "",
    username: "",
    email: "",
    isAdmin: false
};

interface IPayload {
    username: string;
    email: string;
    isAdmin: boolean;
}

export default(state = initialState, action: TAction):IProfile => {
        switch (action.type) {
            case 'SET_USER_PROFILE':
                const { email, isAdmin, username } = jwt.verify(action.payload, "myprivatekey") as IPayload;
                const token = action.payload;
                const userProfile: IProfile = { token, username, email, isAdmin };
                return userProfile;

            default:
                return state;
        }
}  