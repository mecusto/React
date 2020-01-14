import React from "react";
import "./landingPage.css";
import produce from 'immer';

import Form from './form';
import Navbar from './Navbar';
import User from './user';

interface IProps {
    history: any;
}

interface IState {
    validUser: boolean;
    username: string;
}

// const intervalSg = 5000;


class Login extends React.PureComponent<IProps, IState> {  
    constructor(props: any) {
        super(props);

        this.state = { 
            validUser: false,
            username: ''
          };
         this.userInserted = this.userInserted.bind(this);
         this.logout = this.logout.bind(this);
    }

    

    logout() {
        this.setState( validUser => ({ validUser: !validUser }));
        sessionStorage.removeItem('token');
    }

    render() {
        const  { validUser, username } = this.state;

        return (
            <div className="back">
            <Navbar validUser = {validUser} username = {username} logout={this.logout}></Navbar>
            {!validUser ? <Form userInserted={this.userInserted}></Form> : null}
            {validUser ? <User username={username} ></User> : null}
           </div> 
    )}

    userInserted(validUser:boolean, username: string) {
        this.setState({validUser: validUser, username: username });
        // setTimeout(() => this.props.history.push((validUser ? '/user' : ''), intervalSg));    
    }


}

export default Login;