import React from "react";
import { ITodo } from "./ITodo";

interface IProps {
  todos: ITodo[];
  toggleTodo(index: number): void;
}

class TodoList extends React.PureComponent<IProps> {
  render() {
    const { todos, toggleTodo } = this.props;
    return (
      <div>
        {todos.map(({ done, text }, index) => (
          <div
            key={text + index}
            onClick={() => toggleTodo(index)}
            style={{ cursor: "pointer" }}
          >
            <input type="checkbox" checked={done} />{" "}
            <span style={{ textDecoration: done ? "line-through" : "initial" }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default TodoList;
