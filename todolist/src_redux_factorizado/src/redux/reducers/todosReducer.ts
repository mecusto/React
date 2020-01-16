import { ITodo } from "../../interfaces/ITodo";
import produce from "immer";
import { TAction } from "../types";

const initialState: ITodo[] = [];

// export default (state = initialState, action: TAction) => {
//   switch (action.type) {
//     case "ADD_TODO":
//       return produce(state, draftState => {
//         draftState.push(action.payload);
//       });
//     case "REMOVE_TODO":
//       return produce(state, draftState => {
//         draftState.splice(action.payload);
//       });
//     case "TOGGLE_TODO":
//       return produce(state, draftState => {
//         draftState[action.payload].done = !draftState[action.payload].done;
//       });
//     default:
//       return state;
//   }
// };

export default (state = initialState, action: TAction) =>
  produce(state, draftState => {
    switch (action.type) {
      case "ADD_TODO":
        draftState.push(action.payload);
        break;
      case "REMOVE_TODO":
        draftState.splice(action.payload);
        break;
      case "TOGGLE_TODO":
        draftState[action.payload].done = !draftState[action.payload].done;
        break;
      default:
        return state;
    }
  });
