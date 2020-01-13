import React from "react";
import "./form.css";
//import produce from 'immer';
import { ISwal } from './Interface/ISwal';
import swal from 'sweetalert';

interface IState {
    username: string;
    password: string;
    confirmPassword: string;
    validPassword: boolean;
    token: string;
}

interface IProps {
  userInserted(valid: boolean, username: string):void;
}

const messageOk: ISwal =  {
    title: "Bienvenido!",
    text: "El login se ha realizado correctamente",
    icon: "success",
    button: "OK",
  } 
  const messageError: ISwal = {
    title: "Error!",
    text: "Datos incorrectos",
    icon: "error",
    button: "VOLVER",
  } ;

class Form extends React.PureComponent<IProps, IState> {  
    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            validPassword: false,
            token: ""
        };
        this.equalPassword = this.equalPassword.bind(this);
        this.getToken = this.getToken.bind(this);

    }

    render() {

        return (
            <div className="form">
                <div className="box">
                    <label> Name:</label>
                    <input type="text"
                        value={this.state.username}
                        onChange={({ target: { value } }) => this.setState({ username: value })} />
                </div>
                <div className="box">
                    <label> Password:</label>
                    <input type="password"
                        value={this.state.password}
                        onChange={({ target: { value } }) => this.setState({ password: value })} />
                </div>
                <div className="box">
                    <label> Confirm password:</label>
                    <input type="password"
                        onChange={({ target: { value } }) => this.setState({ validPassword: this.equalPassword(value) })}
                    />
                </div>
                <button type="submit" className="btn btn-secondary botonForm"
                    disabled={!this.state.validPassword}
                    onClick={this.getToken}>Sign in</button>
            </div>
        );
    }


    equalPassword = (value: String) => {
        const { password } = this.state;
        return password === value;
    }
// TODO move getToken a API.ts
    getToken() {
        (async () => {
            const { username, password } = this.state;
            const { userInserted } = this.props;

            try {
                const response = await fetch("http://localhost:3000/auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
    
                const { token } = await response.json();
                console.log(token);
                this.setState({ token });
                swal(token ? messageOk : messageError )
                token ? userInserted(true, username) : userInserted(false, '');
                sessionStorage.setItem('token', token);
                
            }
            catch (err) {
                console.log(err);
                swal(messageError );
                userInserted(false, '');
               
            }
        })()
    }
}


export default Form;
