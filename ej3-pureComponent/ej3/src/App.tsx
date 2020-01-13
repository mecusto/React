import React from 'react';

import './App.css';

interface IState {
  checkbox: boolean[];
}

//con pureComponent no funciona porque entiende que el estado no cambia
//no lee los cambios dentro de un array o un objeto

class App extends React.PureComponent<any, IState> {
//class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      checkbox: [true, true, true]
    }
  }

  onClickChangeState(index: number){
    // ({ checkbox }) ==> es el currentState deconstruido
    this.setState ( ({ checkbox }) => {
      checkbox[index] = !checkbox[index];
      return { checkbox: [... checkbox]} //clonar array para que el pureComponent detecte el cambio

    })
  }

  render(){
    const { checkbox }= this.state;
    return (
      <>
        {checkbox.map((checkbox, index) => (
          <div>
             <input type="checkbox" checked={checkbox} 
              onChange = {() => this.onClickChangeState(index) }/>
          </div>
        )
    )}
   </>
    )}
}

export default App;
