import { ITodo } from "../../interfaces/ITodo";
import produce from "immer";

export default (state: ITodo[] = [], action: any) => {
  switch (action.type) {
    case "ADD_TODO":
      return produce(state, draftState => {
        draftState.push(action.payload);
      });
    case "REMOVE_TODO":
      return produce(state, draftState => {
        draftState.splice(action.payload);
      });
    case "TOGGLE_TODO":
      return produce(state, draftState => {
        draftState[action.payload].done = !draftState[action.payload].done;
      });
    default:
      return state;
  }
};
