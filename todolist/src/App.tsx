import React from 'react';
import './App.css';
import { ITodo } from './interfaces/ITodo';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import produce from 'immer';


interface IProps {

}

interface IState {
  todoList: ITodo[];
}

class App extends React.PureComponent<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.state = {
      todoList: [],
    };
    this.addTodo= this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }


  addTodo(newTodoText: string){
    const newTodo: ITodo = { text: newTodoText, done:false }
//    this.setState({ todoList: [...this.state.todoList, newTodo] }); 
    this.setState(state => 
      produce(state, ({ todoList }) => {
        todoList.push(newTodo);
      })
    )
  }

  removeTodo(index: number){
    this.setState(state => 
        produce(state, ({ todoList }) => {
          todoList.splice(index);
        })
      )
  }

  toggleTodo(index: number){
    this.setState(state =>
      produce(state, ({ todoList }) => {
        todoList[index].done = !todoList[index].done;
      })
    );
  }

  render() {
  
    const { todoList } = this.state;
    return(
      <>
      <TodoInput addTodo={this.addTodo}></TodoInput>
      <TodoList todolist={todoList} 
                toggleTodo={this.toggleTodo}
                removeTodo={this.removeTodo}></TodoList>
      </>
    );
  }
  
}
export default App;
