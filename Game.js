import React from "react";
import Dice from "./Dice";
import DoubleMessage from "./DoubleMessege";
import './Game.css';
import PlayerCard from "./PlayerCard";

const rolls= [1, 2, 3, 4, 5, 6];


/// winning the game: write a method that checks if there is a win, by comparing 
/// the threshold score to the players score.
/// if there is no win, do nothing.
/// if there is a win: 
/// stop game loop, show a component that has a winning message and a score. 
/// advanced: save the winning score in the local memory.


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            currentPlayer: 1,
            player1totalScore: 0,
            player2totalScore: 0,
            player1currentScore: 0,
            player2currentScore: 0,
            thresholdScore: 100,
            thresholdSet: false,
            dice1Result: 0,
            dice2Result: 0,
            singlePlayer: false
        }
    }
    //when game loads
    componentDidMount () {
        this.startNewGame();
    }

    startNewGame = (e) => {
        //reset all game parameters
        this.setState({
            //randomly decide who playes first
            currentPlayer: Math.floor(Math.random() * 2) + 1,
            player1totalScore: 0,
            player2totalScore: 0,
            player1currentScore: 0,
            player2currentScore: 0,
            thresholdScore: 100,
            thresholdSet: false,
            dice1Result: 0,
            dice2Result: 0,
            singlePlayer: false
        })
    }

    //if threshold is not setted yet, update it
    updateThreshHold = (e) => {
        if (this.state.thresholdSet === false) {
            this.setState({thresholdScore: Number(e.target.value)});
        }

    }
    //when enter key is pressed, block threshold
    blockTreshold = (e) => {
        if (e.keyCode === 13) {
            this.setState({thresholdSet: true});
        }
    }

    rollDice = () => {
        //generate two rolls 
        const roll1 = rolls[Math.floor(Math.random() * rolls.length)];
        const roll2 = rolls[Math.floor(Math.random() * rolls.length)];
        const sum = roll1 + roll2;

        //if the roll is not a double
        if (roll1 !== roll2) {
            //update state data for the player that rolled
            if (this.state.currentPlayer === 1) {
                this.setState({
                    player1currentScore: this.state.player1currentScore + sum})
            }
            else {
              this.setState({player2currentScore: this.state.player2currentScore + sum})  
            }
        }
        //update dice state
        this.setState({dice1Result: roll1, dice2Result: roll2});
    }

    //when the player presses hold
    hold = (e) => {
        // update totalScore & CurrentScore for player
        // pass the turn to the other player 
        if (this.state.currentPlayer === 1) {
            this.setState({
                player1totalScore: this.state.player1totalScore + this.state.player1currentScore,
                player1currentScore: 0,
                currentPlayer: 2
            })
        }
        else {
            this.setState({
                player2totalScore: this.state.player2totalScore + this.state.player2currentScore,
                player2currentScore: 0,
                currentPlayer: 1
            })
        }
    }

    computerPlays = () => {

        const roll1 = this.state.dice1Result;
        const roll2 = this.state.dice2Result;

        if (this.state.singlePlayer === true && this.state.currentPlayer === 2) {
              setTimeout(()=> {
                  this.rollDice();

                if (roll1 !== roll2) {
                    setTimeout(()=> {
                        this.rollDice();
                        
                        if(roll1 !== roll2) {
                            this.hold();
                        }
                        else {
                            this.gotADouble();
                        }
                    },300);
                }
              },300);
        }
    }

    //if there is a roll, show the dice. returns a div with dice
    showDice = () => {
        if(this.state.dice1Result > 0 && this.state.dice2Result > 0) {
            return (
                <div className="dice-container">
                    <Dice roll={this.state.dice1Result}/>
                    <Dice roll={this.state.dice2Result}/>
                </div>
            )
        }
    }

    //if the player got a double, reset his current score and switch turns.
    //if the player is the user, show an annoying gif.
    gotADouble = () => {
        if (this.state.dice1Result === this.state.dice2Result &&
            this.state.dice1Result !== 0) {
                console.log("got a double:");
                console.log(this.state.dice1Result, this.state.dice2Result);
            if (this.state.currentPlayer === 1) {
                this.setState({
                    player1currentScore: 0,
                    currentPlayer: 2,
                    dice1Result: 0,
                    dice2Result: 0
                })
            }
            else {
                this.setState({
                    player2currentScore: 0,
                    currentPlayer: 1,
                    dice1Result: 0,
                    dice2Result: 0
                })
            }
        }
    }

    //showes the double fail gif
    showDoubleMessage = () => {
        setTimeout(()=> {
            if (this.state.dice1Result === this.state.dice2Result && this.state.dice1Result !== 0) {
                return (
                    <DoubleMessage dice={this.state.dice1Result}/>
                )
            }
        }, 300)
         
    }

    //check if the game is won, and if so, return the gameWon function 
    isGameWon = () => {
        if (this.state.player1totalScore > this.state.thresholdScore ||
            this.state.player2totalScore > this.state.thresholdScore){
            return this.gameWon();
         } 
    }

    //check if the game is won.
    //if so, stop game loop.
    //return victory sign.
    //return a new game button.
    gameWon = () => {
        //get winner title and score
        let winner;
        let winnerScore;

        if(this.state.player1totalScore>this.state.player2totalScore) {
            winner = "Player 1";
            winnerScore = this.state.player1totalScore;
        }
        else {
            winner = "Player 2";
            winnerScore = this.state.player2totalScore;
        }
        //return the winning banner
        return (
            <div className="win-card">
                <h1 className="win-title">{winner} Wins!</h1>
                <p className="win-data">With the score of {winnerScore}</p>

                <button 
                className="restart"
                onClick={this.startNewGame} 
                >
                    Play Again?
                </button>
            </div>
        )
    }

    render() {
        return (
            <div className="game-board">
                <PlayerCard 
                playerNum="1"
                totalScore={this.state.player1totalScore}
                currentScore={this.state.player1currentScore}
                currentPlayer={this.state.currentPlayer}
                />
                <div className="middle-section">
                    <button 
                    className="new-game"
                    onClick={this.startNewGame}
                    >
                        New Game
                    </button>

                    <div className="threshold-container">
                        <div className="winnig-score">Winning score:</div>
                        <input 
                        type="number" 
                        min={0}
                        value={this.state.thresholdScore}
                        onChange={this.updateThreshHold}
                        onKeyUp={this.blockTreshold}
                        className={(this.state.thresholdSet === true)? "thresh-blocked" : "thresh-allowed"}>
                        </input>
                    </div>

                    <div className="dice-place-holder">
                        {this.gotADouble()}
                        {this.showDoubleMessage()}
                        {this.showDice()}
                    </div>

                    <button onClick={this.rollDice}>Roll Dice</button>
                    <button onClick={this.hold}>Hold</button>                   

                </div>
                <PlayerCard 
                playerNum="2"
                totalScore={this.state.player2totalScore}
                currentScore={this.state.player2currentScore}
                currentPlayer={this.state.currentPlayer}
                />

                {this.isGameWon()}

                {this.computerPlays()}

                <audio controls autoPlay>
                    <source src="jazz.mp3" type="audio/mpeg"></source>
                    <source src="jazz.ogg" type="audio/ogg"></source>
                </audio>                
            </div>
        )
    }
}

export default Game;