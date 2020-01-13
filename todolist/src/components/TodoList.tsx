import React from 'react';
import './App.css';
import { ITodo } from '../interfaces/ITodo';
import produce from 'immer';

interface IProps {
    todolist: ITodo[];
    toggleTodo(index:number): void;
    removeTodo(index:number): void;
}

interface IState {

}

class TodoList extends React.PureComponent<IProps, IState> {
    constructor(props:IProps) {
        super(props);
        this.state ={};
    };


  render(){
      const { todolist, toggleTodo, removeTodo } = this.props;
      return(
        <div>
        {todolist.map(({ done, text }, index) => (
          <div
            key={text + index}
            onClick={() => toggleTodo(index)}
            style={{ cursor: "pointer" }}
          >
            <input type="checkbox" checked={done} />{" "}
            <span style={{ textDecoration: done ? "line-through" : "initial" }}>
              {text}
            </span>
            <button onClick={() => removeTodo(index)}>DELETE</button>
          </div>
        ))}
      </div>
      )
  }
}
export default TodoList;