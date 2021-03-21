import React from 'react';
import './PlayerCard.css';

class PlayerCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            playerNum: this.props.playerNum,
            totalScore: this.props.totalScore,
            currentScore: this.props.currentScore,
            currentPlayer: this.props.currentPlayer
        };
    }

    isCurrentPlayer = () => {
        if (this.props.playerNum === String(this.props.currentPlayer)) {
            return (
                <div className="current-player-mark">
                    Now Plays
                </div>
            )
        }
    }

    render () {
        return (
            <fieldset className="player-card">
                <h1 className="player-title">{`PLAYER ${this.props.playerNum}`}</h1>
                <p className="total-score">{this.props.totalScore}</p>
                {this.isCurrentPlayer()}
                <div className="current-score">
                    <p className="current-score-title">CURRENT</p>
                    <p className="current-score-score">{this.props.currentScore}</p>
                </div>
            </fieldset>
        )
    }
}

export default PlayerCard;