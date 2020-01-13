import React from "react";
import { IUser } from "./App";
import produce from 'immer';

interface IProps {
  user: IUser;
}
class User extends React.PureComponent<IProps> {
  render() {
    console.log("user render");
    const { user } = this.props;
    return <div>{user.name}</div>;
  }
}
export default User;