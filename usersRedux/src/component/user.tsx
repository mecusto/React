import React from "react";
import "./user.css";
// import produce from 'immer';

// import { ISwal } from "./Interface/ISwal";
// import swal from "sweetalert";
import { IBook } from "../Interface/IBook";
import { IUser } from "../Interface/IUser";
import { getUsers, getBooksUserById, getBooks, postBook } from "../API";

import UserBooks from "./userBooks";
import { connect } from "react-redux";
import { IStore } from "../Interface/IStore";
import { setBooksAction, setUserAction, setIdUserAction, setUserBooksAction } from '../redux/actions';
import { IProfile } from "../Interface/IProfile";


interface IState {
  notUserbooks: IBook[];
}

interface IProps {

}

interface IGlobalProps {
  books: IBook[];
  id_user: number; //id del selected user, en el userReducer
  users: IUser[];
  userbooks: IBook[];
  userProfile: IProfile;

  setBooks(books: IBook[]): void;
  setUser(users: IUser[]): void;

  setIdUser(id_user: number): void;
  setUserBooks(books: IBook[]): void;
}

type TProps = IGlobalProps & IProps; 

class User extends React.PureComponent<TProps, IState> {
  constructor(props: any) {
    super(props);

    this.addBook = this.addBook.bind(this);
  }

  // Al cargar el componente se hace la query de usuarios y 
  // todos los libros
  componentDidMount() {
    (async () => {
      //SET_TOKEN almacena en el store y en el localStorage
      const token = this.props.userProfile.token;
      console.log(token);
      const users = await getUsers(token);
      const books = await getBooks(token);
      // SET_**** on store
      this.props.setUser(users);
      this.props.setBooks(books);
    })();
  }

  // Al clicar sobre un usuario se cargan sus libros
  async onUserSelected(id_user: number) {
    const token = this.props.userProfile.token;
    this.props.setIdUser(id_user);

    const userbooks = await getBooksUserById(id_user, token);
    this.props.setUserBooks(userbooks);

  }


  async addBook(newBookIndex: number) {
    const { token } = this.props.userProfile;
    const id_user = this.props.id_user;
    console.log(token);
    const newUserbooks = await postBook(id_user, newBookIndex, token);
    this.props.setUserBooks(newUserbooks);

  }

  render() {
    const { userbooks, books, users } = this.props;
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="users col-2">

                {users.map(user => (
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

const mapStateToProps = (store: IStore) => ({ 
  books: store.books,
  users: store.users,
  userbooks: store.userReducer.userbooks,
  userProfile: store.userProfile,
  id_user: store.userReducer.id_user
});

const mapDispatchToProps = {
  setBooks: setBooksAction,
  setUser: setUserAction,
  setIdUser: setIdUserAction,
  setUserBooks: setUserBooksAction
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

