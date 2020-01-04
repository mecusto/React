import React from "react";
import './countdown';

interface IProps {
    seconds: number;
}

interface IState {
    seconds: number;
    running: boolean;
}

const oneSecondInMilsg = 1000;

class CountDown extends React.Component<IProps, IState> {
    private intervalId: any;
    constructor(props: any) {
        super(props);
    
        this.state = {
            seconds: props.seconds,
            running: false
        };
       
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
    
    }   
    render() {
        const { seconds, running }= this.state;
        const { seconds: initialSeconds } = this.props;
        
        const isElapsed = initialSeconds !== seconds;
        
        if(!seconds && running){
            this.stop();
        }

        return(
            <div className = 'countDown' >
                <h2>{seconds}</h2>
                {!isElapsed && !running && <button className='boton' onClick = {this.start}>START</button>}
                {running && <button className='boton' onClick = {this.stop}>PAUSE </button>}
                {isElapsed && !running && seconds > 0 &&
                 <button className='boton' onClick = {this.start}>RESUME</button>}
                {isElapsed && <button className='boton' onClick = {this.reset}>RESET</button >}
            </div>
        )
    }
//para evitar errores al desmontar el componente intentado actualizar un estado de un 
//componente desmontado tenemos que hacer el clearInterval al desmontarlo
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    
    restar = () => {
        this.setState(({ seconds }) => ({seconds: seconds - 1}))
    }

    start = () => {
            this.setState ({ running: true });
            this.intervalId = setInterval(this.restar, oneSecondInMilsg);
    }

    stop = () => {
        this.setState ({ running: false });
        clearInterval(this.intervalId);
    }
   
    reset = () => {
        clearInterval(this.intervalId);
        this.setState ({ running: false, seconds: this.props.seconds });

    }
}

export default CountDown;