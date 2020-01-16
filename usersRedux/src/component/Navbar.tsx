import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { IStore } from "../Interface/IStore";
import { IProfile } from "../Interface/IProfile";


interface IProps {
  logout(): void;
}

interface IGlobalProps {
  userProfile: IProfile;
}
type TProps = IProps & IGlobalProps;

interface IState {}

class Navbar extends React.PureComponent<TProps, IState> {

  render() {
    const { token, username } = this.props.userProfile;
    const { logout } = this.props;
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
                    {token ? <Link to="/" className="nav-link" onClick={logout}>
                      Logout
                    </Link> : null}
                  </li>
                </ul>
                <ul>
                  {token ? <li className="nav-item active">{username.toUpperCase()}</li> : null}
                </ul>
              </div>
            </nav>
    );
  }
}
const mapStateToProps = (store: IStore) => ({ userProfile: store.userProfile });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
