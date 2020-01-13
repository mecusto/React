import React from "react";
import "./userBooks.css";
//import produce from 'immer';

import { IBook } from "./Interface/IBook";

interface IState {
  value: number;
}

interface IProps {
  userbooks: IBook[];
  notUserbooks: IBook[];
  addBook(newBookIndex: number): void;
}

class UserBooks extends React.PureComponent<IProps, IState> {
  // pasar el libro nuevo mediante managebook a user y así repintar los componentes ?'
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Actualizar estado con nuevo libro
  handleChange(event: any) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.props.addBook(this.state.value);
  }

  render() {
    const { userbooks, notUserbooks } = this.props;

    return (
      <>
        <div  className="divtable">
          <table  className="table">
            <thead>
              <tr>
                <td>Title</td>
                <td>Author</td>
                <td>Year </td>
                <td>Price</td>
              </tr>
            </thead>
            <tbody>
              {userbooks.map(book => (
                <tr key={book.book_code}>
                  <td>{book.title}</td>
                  <td>
                    {book.first_name} {book.last_name}
                  </td>
                  <td>{book.year_written}</td>
                  <td>{book.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="input-group">
            <select
              className="custom-select"
              id="newBook"
              aria-label="Select a book"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value="Choose"></option>
              {notUserbooks.map(book => (
                <option key={book.book_code} value={book.book_code}>
                  {book.title}
                </option>
              ))}
            </select>
            <div className="input-group-append">
              <button
                onClick={this.handleSubmit}
                className="btn btn-outline-dark"
                type="button"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserBooks;
