import React from "react";
import './countdown.css';

interface IState {
    seconds: number;
    running: boolean;
}

const oneSecondInMilsg = 1000;

class Crono extends React.Component<any, IState> {
    private intervalId: any;
    constructor(props: any) {
        super(props);
    
        this.state = {
            seconds: 0,
            running: false
        };
       
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
    
    }   
    render() {
        const { seconds, running }= this.state;
        const initialSeconds  = 0;
        const isElapsed = initialSeconds !== seconds;

        return(
            <div className = 'countDown'>
                <h2>{seconds}</h2>
                {!running && !isElapsed && <button className='boton' onClick = {this.start}>START</button>}
                {running && <button className='boton' onClick = {this.stop}>PAUSE </button>}
                {!running && seconds > 0 && <button className='boton' onClick = {this.start}>RESUME</button>}
                {isElapsed && <button className='boton' onClick = {this.reset}>RESET</button >}
            </div>
        )
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    sumar = () => {
        this.setState(({ seconds }) => ({seconds: seconds + 1}))
    }

    start = () => {
        this.setState ({ running: true });
        this.intervalId = setInterval(this.sumar, oneSecondInMilsg);
    }

    stop = () => {
        this.setState ({ running: false });
        clearInterval(this.intervalId);
    }
   
    reset = () => {
        clearInterval(this.intervalId);
        this.setState ({ running: false, seconds: 0 });

    }
}

export default Crono;