import React from 'react';
import './App.css';
import { ITodo } from '../interfaces/ITodo';
import produce from 'immer';
import { EventEmitter } from 'events';

interface IProps {
    addTodo(todo: string):void;

}

interface IState {
    input: any;
}

class TodoInput extends React.PureComponent<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.state = {
        input: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this); 

  }

  handleSubmit(event: any) {
    event.preventDefault();
    console.log(this.state.input)
    this.props.addTodo(this.state.input);
    this.setState({ input: "" })
  }

  handleChange(event: any) {
    event.preventDefault();
    this.setState({ input: event.target.value });
  }


  render(){
    const { input } = this.state;
    return(
        <>
        <input type="text" 
            value={input}
            onChange={event => this.handleChange(event)}/>

        <button onClick={event => this.handleSubmit(event)}>ADD</button>

        </>
    )
}
}
export default TodoInput;