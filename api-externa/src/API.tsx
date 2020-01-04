import React from 'react';
import './App.css';
import { ICurrentWeather } from "./ICurrentWeather";

const API_KEY = '4a69a8cdfebcf8c9a1f5f8b37372da16';
const API_URL = 'https://';

const buildAPIurl = (cityname: string) =>
 `${API_URL}?q=${cityname}&appid=${API_KEY}`;
//TODO interface con los datos de la API que nos interese, acuerdate de incluirlo en el constructor!

interface IState {
    weather: ICurrentWeather | null;
  }

class App extends React.Component{
    constructor(props: any) {
       super (props);

       this.state = {
         weather: null
       }
    }
    componentWillMount(){
        this.getWeather('Malaga,es')
    }

    async getWeather(cityname: string) {  
        const weather = await (await fetch(buildAPIurl(cityname))).json();
        this.setState({ weather })
    }  
    render() {
        const { weather } = this.state;
        return(<div>{weather?.coord.lon}</div>)
    }

}

export default App;