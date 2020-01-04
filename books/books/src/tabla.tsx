import React from "react";
import { IUser } from './IUser';


interface IProps {
  users: IUser[];
  onUserSelection(id_users:number): void;
}

interface IState {
  userId: number;
}

class Tabla extends React.Component<IProps, IState> {
  render() {
    const { users, onUserSelection } = this.props;
    if (users.length === 0 ){
      return null;
    }
    
    return (       
        <table hidden= {users.length > 0 ? false : true}>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>email</th>
            <th>Admin</th>
          </tr>
      
        {users.map((user) => {
          return(
          <tr key={user.id_users} onClick={() => onUserSelection(user.id_users)} >
            <td>{user.id_users}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{`${user.Admin}`}</td>
          </tr>
          )
        })}
      </table>
    )
  }
}

export default Tabla;
