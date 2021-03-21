import React from 'react';
import './Dice.css';

class Dice extends React.Component {
    constructor(props){
        super(props);
        this.state = {roll: this.props.roll}
    }
    render() {
        return (
            <img src={`/dice${this.props.roll}.png`} alt="dice"></img>
        )
    }
}

export default Dice;