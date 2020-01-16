import React from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

class App extends React.PureComponent {
  render() {
    return (
      <>
        <TodoInput />
        <TodoList />
      </>
    );
  }
}

export default App;
