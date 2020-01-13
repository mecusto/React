import React from "react";
import "./form.css";


interface IState {
    username: string;
    password: string;
    confirmPassword: string;
    validPassword: boolean;
    token: string;
}

interface IProps {
  userInserted(valid: boolean):void;
}


class Form extends React.Component<IProps, IState> {  
    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            validPassword: false,
            token: ""
        };
        this.validatePassword = this.validatePassword.bind(this);
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
                        onChange={({ target: { value } }) => this.setState({ validPassword: this.validatePassword(value) })}
                    />
                </div>
                <button type="submit"
                    disabled={!this.state.validPassword}
                    onClick={this.getToken}>Sign in</button>
            </div>
        );
    }


    validatePassword = (value: String) => {
        const { password } = this.state;
        return password === value;
    }


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
                this.setState({ token });
                console.log(token);
                token ? userInserted(true) : userInserted(false);
            }
            catch (err) {
                console.log(err);
                userInserted(false);
               
            }
        })()
    }

    // getToken = async () => {
    //     const { username, password } = this.state;
    //     const { userInserted } = this.props;
    //     try {
    //         const response = await fetch("http://localhost:3000/auth", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 username: username,
    //                 password: password
    //             })
    //         })

    //         const { token } = await response.json();
    //         this.setState({ token });
    //         console.log(token);
    //         token ? userInserted(true) : userInserted(false);
    //     }
    //     catch (err) {
    //         console.log(err);
    //         userInserted(false);
           
    //     }
    // }

}


export default Form;
