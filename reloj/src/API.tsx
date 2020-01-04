import React from 'react';
import { ICurrentWeather } from "./ICurrentWeather";

const API_KEY = '4a69a8cdfebcf8c9a1f5f8b37372da16';
const API_URL = 'https://openweathermap.org/data/2.5/weather';

const buildAPIurl = (cityname: string) =>
 `${API_URL}?q=${cityname}&appid=${API_KEY}`;
//TODO interface con los datos de la API que nos interese, acuerdate de incluirlo en el constructor!

interface IState {
    weather: ICurrentWeather | null;
  }

  class API extends React.Component<any, IState> {
    constructor(props: any) {
      super(props);
      this.state = {
        weather: null
      };
    }
    componentWillMount() {
      this.getWeather("Malaga,es");
    }
    async getWeather(cityName: string) {
      const weather = await (await fetch(buildAPIurl(cityName))).json();
      this.setState({ weather });
    }
    render() {
      const { weather } = this.state;
      return <div>{weather?.coord.lon}</div>;
    }
  }

export default API;
