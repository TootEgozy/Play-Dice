import React from 'react';

class DoubleMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dice: this.props.dice}
    }

    render () {
        return (
            <div style={{
                fontSize:"20px",
                color: "white"
            }}>
                <img src="fail.gif" alt="failed kick"
                style={{
                    position:"absolute",
                    width: "12rem",
                    height: "7rem",
                    transform: "translate(180px, 10px)"
                }}
                >
                </img>
                Got a double {this.props.dice}, {this.props.dice}
            </div>
        )
    }
}

export default DoubleMessage;