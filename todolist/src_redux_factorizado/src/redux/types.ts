import { ITodo } from "../interfaces/ITodo";

interface IAddTodoAction {
  type: "ADD_TODO";
  payload: ITodo;
}

interface IRemoveTodoAction {
  type: "REMOVE_TODO";
  payload: number;
}

interface IToggleTodoAction {
  type: "TOGGLE_TODO";
  payload: number;
}

export type TAction = IAddTodoAction | IRemoveTodoAction | IToggleTodoAction;
