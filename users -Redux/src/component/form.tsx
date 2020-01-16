import React from "react";
import "./form.css";
//import produce from 'immer';
import { ISwal } from "../Interface/ISwal";
import swal from "sweetalert";
import { setProfileAction } from "../redux/actions";
import { connect } from "react-redux";
import { IStore } from "../Interface/IStore";
import { IProfile } from "../Interface/IProfile";

interface IState {
  username: string;
  password: string;
  confirmPassword: string;
  validPassword: boolean;
}

interface IProps {
  //  userInserted(username: string):void;
}
interface IGlobalProps {
  userProfile: IProfile;
  setProfile(token: string): void;
}
type TProps = IProps & IGlobalProps;

const messageOk: ISwal = {
  title: "Bienvenido!",
  text: "El login se ha realizado correctamente",
  icon: "success",
  button: "OK"
};
const messageError: ISwal = {
  title: "Error!",
  text: "Datos incorrectos",
  icon: "error",
  button: "VOLVER"
};

class Form extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      validPassword: false
    };
    this.equalPassword = this.equalPassword.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  render() {
    return (
      <div className="form">
        <div className="box">
          <label> Name:</label>
          <input
            type="text"
            value={this.state.username}
            onChange={({ target: { value } }) =>
              this.setState({ username: value })
            }
          />
        </div>
        <div className="box">
          <label> Password:</label>
          <input
            type="password"
            value={this.state.password}
            onChange={({ target: { value } }) =>
              this.setState({ password: value })
            }
          />
        </div>
        <div className="box">
          <label> Confirm password:</label>
          <input
            type="password"
            onChange={({ target: { value } }) =>
              this.setState({ validPassword: this.equalPassword(value) })
            }
          />
        </div>
        <button
          type="submit"
          className="btn btn-secondary botonForm"
          disabled={!this.state.validPassword}
          onClick={this.getToken}
        >
          Sign in
        </button>
      </div>
    );
  }

  equalPassword = (value: String) => {
    const { password } = this.state;
    return password === value;
  };
  // TODO move getToken a API.ts
  getToken() {
    (async () => {
      const { username, password } = this.state;
      //            const { userInserted } = this.props;

      try {
        const response = await fetch("http://localhost:3000/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password
          })
        });

        const { token } = await response.json();
        this.props.setProfile(token);
        swal(token ? messageOk : messageError);
        
      } catch (err) {
        console.log(err);
        swal(messageError);
      }
    })();
  }
}

const mapStateToProps = (store: IStore) => ({ userProfile: store.userProfile });

const mapDispatchToProps = { setProfile: setProfileAction };

export default connect(mapStateToProps, mapDispatchToProps)(Form);
