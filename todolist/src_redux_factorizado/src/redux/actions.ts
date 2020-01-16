import { ITodo } from "../interfaces/ITodo";
import { TAction } from "./types";

export const AddTodoAction = (todo: ITodo): TAction => ({
  type: "ADD_TODO",
  payload: todo
});

export const RemoveTodoAction = (index: number): TAction => ({
  type: "REMOVE_TODO",
  payload: index
});

export const ToggleTodoAction = (index: number): TAction => ({
  type: "TOGGLE_TODO",
  payload: index
});
