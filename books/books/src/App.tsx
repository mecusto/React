import React from "react";
import "./App.css";

import Tabla from "./tabla";
import { IUser } from "./IUser";
import TablaBooks from "./books_table";
import { IBooks } from "./IBooks";
import  { getBooksByUserId, getUsers } from "./API";


interface IState {
  users: IUser[];
  books: IBooks[];
}


class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      users: [],
      books: []
    };
    this.onUserSelection = this.onUserSelection.bind(this);
  }

  componentWillMount() {
    (async () => {
      const users = await getUsers();
      this.setState({ users })
    })();
  }


  async onUserSelection(id_user: number) {
    const books = await getBooksByUserId(id_user);
    this.setState({ books })
  };
   

  render() {
    const { users, books } = this.state;
    
    return (
      <div>
        {users.length ? <Tabla onUserSelection={this.onUserSelection} users={users} /> : null}
        {books.length ? <TablaBooks  books={books}  /> : null}
      </div>
    )
  }
}

export default App;
