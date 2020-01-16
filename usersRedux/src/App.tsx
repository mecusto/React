import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from './component/LandingPage';

import './App.css';
//import produce from 'immer';


interface IProps {
 
}
interface IState {
  
}


class App extends React.PureComponent<IProps, IState> {

  render() {

    return (
      <BrowserRouter>   
      <Switch>
        
        <Route path='/' exact component={LandingPage} />
        {/* <Route path='/user'  component={User} /> */}
        
      </Switch>
      </BrowserRouter>
    );
  }

}

export default App;

// Enrutado simple sin librería

// import React from "react";
// interface IProps {}
// interface IState {
//   path: string;
// }
// class App extends React.PureComponent<IProps, IState> {
//   constructor(props: IProps) {
//     super(props);
//     this.state = {
//       path: "/"
//     };
//     this.changePath = this.changePath.bind(this);
//   }
//   changePath(path: string) {
//     this.setState({ path });
//   }
//   render() {
//     const { path } = this.state;
//     return (
//       <>
//         {/* NAVBAR */}
//         <div>
//           <button onClick={() => this.changePath("/users")}>GO TO USERS</button>
//           <button onClick={() => this.changePath("/books")}>GO TO BOOKS</button>
//         </div>
//         {path === "/users" && <div>users</div>}
//         {path === "/books" && <div>books</div>}
//       </>
//     );
//   }
// }
// export default App;
