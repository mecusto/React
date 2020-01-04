import React from "react";
import "./App.css";
import Form from "./form";
import Label from "./label";

interface IState {
  init: boolean;
  validUser: boolean;
}

const intervalSg = 5000;
const messageOk = "Usuario registrado correctamente, en 5sg será redirigido a la página principal";
const messageError = "Ha habido un error, inténtelo con nuevos datos";

class App extends React.Component<any, IState> {
  private intervalId: any;

  constructor(props: any) {
    super(props);

    this.state = {
      init: true,
      validUser: false
    };

    this.userInserted = this.userInserted.bind(this);
  } 
  conomponentWillMount() {
    clearInterval(this.intervalId);
  }
  
  render() {
    const { init, validUser } = this.state;
    return (
      
      <div>
        {init ? <Form userInserted = {this.userInserted} ></Form> : null}
        {!init && validUser ? <Label message = {messageOk}> </Label> : null}
        {!init && !validUser ? <Label message = {messageError}></Label> : null}
      </div>
      
    );
  }
  async userInserted(validUser:boolean) {
    this.intervalId = setInterval(() => this.updateState(validUser), intervalSg);
    console.log(validUser);
    this.setState({validUser: validUser, init:false })
    console.log("estoy en userInserted")
  }
  updateState(validUser: boolean) {
    console.log("estoy en updateState")
    clearInterval(this.intervalId);
    this.setState({validUser: validUser, init:true })
  }

}

export default App;
