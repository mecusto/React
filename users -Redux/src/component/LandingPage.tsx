import React from "react";
import "./landingPage.css";
// import produce from 'immer';

import Form from './form';
import Navbar from './Navbar';
import User from './user';
import { connect } from "react-redux";
import { IStore } from "../Interface/IStore";
import { IProfile } from "../Interface/IProfile";
import { setProfileAction } from '../redux/actions';

interface IProps {
    history: any;
}
interface IGlobalProps {
    userProfile: IProfile;
    setProfile(token: string):void;
}
type TProps = IProps & IGlobalProps; 

interface IState {

}

// const intervalSg = 5000;


class Login extends React.PureComponent<TProps, IState> {  
    constructor(props: any) {
        super(props);

         this.userInserted = this.userInserted.bind(this);
         this.logout = this.logout.bind(this);
    }


    logout() {
        sessionStorage.removeItem('token');
        // TODO REMOVE_TOKEN action
    }

    render() {
        const { token } = this.props.userProfile;

        return (
            <div className="back">
            <Navbar logout={this.logout}></Navbar>
            {!token ? <Form></Form> : null}
            {token ? <User></User> : null}
           </div> 
    )}

    userInserted(username: string) {
        this.setState({ username: username });
    }
}


const mapStateToProps = (store: IStore) => ({ userProfile: store.userProfile });

const mapDispatchToProps = {setProfile : setProfileAction};

export default connect(mapStateToProps, mapDispatchToProps)(Login);