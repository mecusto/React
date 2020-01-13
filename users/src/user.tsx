import React from "react";
import "./user.css";
// import produce from 'immer';

// import { ISwal } from "./Interface/ISwal";
// import swal from "sweetalert";
import { IBook } from "./Interface/IBook";
import { IUser } from "./Interface/IUser";
import { getUsers, getBooksUserById, getBooks, postBook } from "./API";
// import { findAllByAltText } from "@testing-library/react";
import UserBooks from "./userBooks";

interface IState {
  users: IUser[];
  userbooks: IBook[];
  notUserbooks: IBook[];
  books: IBook[];
  id_user: number;
}

interface IProps {
  // isAdmin: boolean;
  username: string;
}

// const messageError: ISwal = {
//   title: "Error!",
//   text: "Error de conexión a la base de datos",
//   icon: "error",
//   button: "VOLVER"
// };

class User extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      userbooks: [],
      notUserbooks: [],
      books: [],
      id_user: -1
    };

    this.addBook = this.addBook.bind(this);
  }

  // Al cargar el componente se hace la query de usuarios y 
  // todos los libros
  componentDidMount() {
    (async () => {
      const token = sessionStorage.getItem("token");
      const users = await getUsers(token);
      const books = await getBooks(token);
      this.setState({ users, books });
    })();
  }

  // Al clicar sobre un usuario se cargan sus libros
  async onUserSelected(id_user: number) {
    const token = sessionStorage.getItem("token");
    this.setState({ id_user });

    const userbooks = await getBooksUserById(id_user, token);
    this.setState({ userbooks });

    this.manageBooks();
  }

  // Generar el array con los libros que no tiene el usuario
  manageBooks() {
    const { books, userbooks } = this.state;
    this.setState({ notUserbooks: [] });

    books.map(book => {
      if (!userbooks.find(userbook => userbook.title === book.title)) {
        this.setState({ notUserbooks: [...this.state.notUserbooks, book] });
      }
    });
  }

  async addBook(newBookIndex: number) {
      const token = sessionStorage.getItem("token");
      const { id_user } = this.state;
      const newUserbooks = await postBook(id_user, newBookIndex, token);
      this.setState({ userbooks: newUserbooks });
      this.manageBooks();
  }

  render() {
    const { userbooks, books } = this.state;
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="users col-2">

                {this.state.users.map(user => (
                  <div className="user" key={user.id_users}
                      onClick={() => this.onUserSelected(user.id_users)}
                  >
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.isAdmin ? "Administrador" : "Usuario"}</p>
                  </div>
                ))}

            </div>
            <div className="books col-8">
              {userbooks.length ? (
                <UserBooks
                  userbooks={userbooks}
                  notUserbooks={books.filter(({ book_code }) => !userbooks.some(b => b.book_code === book_code))}
                  addBook={this.addBook}
                ></UserBooks>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default User;
