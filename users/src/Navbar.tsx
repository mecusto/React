import React from "react";
import { Link } from "react-router-dom";
import produce from 'immer';


interface IProps {
  validUser: boolean;
  username: string;
  logout(): void;
}

interface IState {}

class Navbar extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { isToggleOn: true };

  }

  // logout(){
  //   sessionStorage.removeItem('token');
  // }

  render() {
    const { validUser, username, logout } = this.props;
    console.log(username);
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <h3 className="navbar-brand">
                Biblioteca
              </h3>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    {validUser ? <Link to="/" className="nav-link" onClick={logout}>
                      Logout
                    </Link> : null}
                  </li>
                </ul>
                <ul>
                  {validUser ? <li className="nav-item active">{username.toUpperCase()}</li> : null}
                </ul>
              </div>
            </nav>
    );
  }
}

export default Navbar;
