import React from 'react';
import './App.css';
import CountDown from './countdown';
import Crono from './crono';
import API from './API'


interface IState {
  name: string;
}

class App extends React.Component<any, IState> {
constructor(props:any) {
  super(props);

  this.state = {
    name: ""
  }
}
  render() {

    return(
      <>
      <div className='container'>
      <CountDown seconds ={120} />
      </div>
      <div className='container'>
      <Crono />
      </div>
      <input type="text"
        value={this.state.name.toUpperCase()}
        onChange = { ({ target: { value } })=> this.setState({ name:value }) }/>
      
      </>
    
    )
  }

}

export default App;
