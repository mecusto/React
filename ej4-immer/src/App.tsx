import React from 'react';
import './App.css';
import User from "./user";
import produce from 'immer';

// immer: librería que ayuda con las actualizaciones en los objetos anidados 
// produce('estado que queremos modificar', state,(draftstate) =>)
export interface IUser {
  name: string;
}

interface IProps {

}

interface IState {
  users: IUser[];
}

class App extends React.PureComponent<IProps, IState> {
  constructor(props: IProps){
    super(props);

    this.state = {
      users: [{ name: "Angel" }, { name: "Pascual" }]
    };
    this.changeName = this.changeName.bind(this);
  }
// // sin produce()
// // hay que recrear cada elemento del array para que los componentes a ellos
// // asociados se actualicen

//   changeName() {
//     this.setState(({ users }) => {
//       // users[0].name = "Angelo";
//       // users[0] = {...users[0]};
//       users[0] = {...users[0], name:'Angelo'};
//       return { users: [...users]};
//     });
//   }


// con produce()

  // changeName() {
  //   this.setState(state => {
  //     const newState = produce(state,draftState => {
  //       draftState.users[0].name = "Angelo";
  //     });
  //     return newState;
  //   });
  // }

    changeName() {
        this.setState(state => 
          produce(state, ({ users }) => {
        users[0].name = "Angelo";
      })
    );
  }

  // ejempo de produce para actualizar todo el estado: 
  
  // produce(this.state, 
  //   (draftState => {
  //     draftState.users[0].name = "Angelo";
  // }))

  render() {
    //const { users } = this.state;
    const { users } = this.state;
    return (
      <>
        <button onClick={this.changeName}>test</button>
        {users.map( user  => (
          <User user={user} />
          // <div>{name}</div>
        ))}
      </>
    );
  }
}

export default App;
