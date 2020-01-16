import React from "react";
import { ITodo } from "../interfaces/ITodo";
import { connect } from "react-redux";

interface IProps {
  todos: ITodo[];
  toggleTodo(index: number): void;
  removeTodo(index: number): void;
}

class TodoList extends React.PureComponent<IProps> {
  render() {
    const { todos, toggleTodo, removeTodo } = this.props;
    return (
      <div>
        {todos.map(({ done, text }, index) => (
          <div key={text + index}>
            <label
              style={{ textDecoration: done ? "line-through" : "initial" }}
            >
              <input
                type="checkbox"
                checked={done}
                onChange={() => toggleTodo(index)}
              />
              {` ${text} `}
            </label>
            <button onClick={() => removeTodo(index)}>remove</button>
          </div>
        ))}
      </div>
    );
  }
}

// (store: any) => ({ todos: store.todos }) // sin refactorizar
const mapStateToProps = ({ todos }: any) => ({ todos });

const mapDispatchToProps = (dispatch: any) => ({
  toggleTodo: (index: number) =>
    dispatch({ type: "TOGGLE_TODO", payload: index }),
  removeTodo: (index: number) =>
    dispatch({ type: "REMOVE_TODO", payload: index })
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
