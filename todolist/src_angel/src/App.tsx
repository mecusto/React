import React from "react";
import { ITodo } from "./ITodo";
import produce from "immer";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

interface IProps {}

interface IState {
  todos: ITodo[];
}

class App extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      todos: []
    };

    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  // no destructuring
  addTodo(todo: ITodo) {
    this.setState(state =>
      produce(state, draftState => {
        draftState.todos.push(todo);
      })
    );
  }

  // destructuring
  toggleTodo(index: number) {
    this.setState(state =>
      produce(state, ({ todos }) => {
        todos[index].done = !todos[index].done;
      })
    );
  }

  render() {
    const { todos } = this.state;
    return (
      <>
        <TodoInput addTodo={this.addTodo} />
        <TodoList todos={todos} toggleTodo={this.toggleTodo} />
      </>
    );
  }
}

export default App;

// instalar redux:
// npm install redux react-redux
// npm i @types/react-redux
// nump i --save redux-devtools-extensions