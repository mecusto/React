import React from "react";
import { ITodo } from "../interfaces/ITodo";
import { connect } from "react-redux";
import { AddTodoAction } from "../redux/actions";

interface IProps {
  addTodo(todo: ITodo): void;
}

interface IState {
  text: string;
}

class TodoInput extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      text: ""
    };

    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value });
  }

  add() {
    if (this.state.text) {
      this.props.addTodo({ text: this.state.text, done: false });
      this.setState({ text: "" });
    }
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <input type="text" value={text} onChange={this.onChange} />
        <button onClick={this.add}>ADD</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addTodo: AddTodoAction
};

export default connect(null, mapDispatchToProps)(TodoInput);
