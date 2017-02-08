import React, { Component } from 'react';
import './App.css';

class App extends Component {
  //Constructor for data-structs
  constructor(props){
    super(props)
    //page header data-struct [CONTAINS: header message, subheader message]
    this.pageHeader = {
      message: "Tic-Tac-と",
      messagesub: "三目並べ"
    }
    //page footer data-struct [CONTAINS: footer message, subfooter message]
    this.pageFooter = {
      message: "Created By:",
      messagesub: "Nickita A. N."
    }
    //playerstate data-struct [CONTAINS: player one/two name, id, players array]
    this.playerState = {
      P_ONE_NAME: "PLAYER 1",
      P_TWO_NAME: "PLAYER 2",
      playersArray: [
        "", ""
      ],
      P_ONE_WINS: 0,
      P_TWO_WINS: 0
    }

    //state data-struct [CONTAINS: player one/two symbols, current turn flag, board slot vector]
    this.state = {
      P_ONE_SYM: "X",
      P_TWO_SYM: "O",
      currTurn: "X",
      board: [
        "", "", "", "", "", "", "", "", ""
      ],
      clearBoard: [
        "", "", "", "", "", "", "", "", ""
      ],
      winner: ""
    }
  }

  //turn switching logic
  switchTurn(){
    if(this.state.currTurn === this.state.P_ONE_SYM){
      this.state.currTurn = this.state.P_TWO_SYM;
    }else{
      this.state.currTurn = this.state.P_ONE_SYM;
    }
  }

  wipeBoard(){
    this.setState({
      board: [
      "", "", "","", "", "","", "", ""]
    })
  }


  //click handling functionality [CONTAINS: player symbol placement logic, turn switching]
  handleClick(index){
    //is the cell currently occupied? -> NO
    if(this.state.board[index] === ""){
      console.log("[SERVER] Player " + this.state.currTurn + " clicked on cell " + index);
      this.state.board[index] = this.state.currTurn;
      this.setState({
        board: this.state.board,
      })
      //someone won the game this move
      if(this.winCheck() != null){
        if(this.state.currTurn === "X"){
          this.playerState.P_ONE_WINS += 1;
          console.log("[SERVER] Player " + this.state.currTurn + " won the game, clearing the board!");
          this.wipeBoard();
        }else{
          this.playerState.P_TWO_WINS += 1;
          console.log("[SERVER] Player" + this.state.currTurn + " won the game, clearing the board!");
          this.wipeBoard();
        }
      }else{
        //Noone won the game -> turn-switching functionality
        this.switchTurn();
      }
      //is the cell currently occupied? -> YES
    }else{
      console.log("[SERVER] Player " + this.state.currTurn + "Clicked on occupied slot!");
    }
  }

  //win-checking functionality [CONTAINS: winning combos, win condition check]
  winCheck(){
    var winningPlayer = this.state.currTurn;
    var currentSym = this.state.board;
    var winComboArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    return winComboArray.find(function(combo){
      //Winning condition check
      if(currentSym[combo[0]] === currentSym[combo[1]] && currentSym[combo[1]] === currentSym[combo[2]] && currentSym[combo[0]] != "" && currentSym[combo[1]] != "" && currentSym[combo[2]] != ""){
        return winningPlayer;
      } else {
        return false;
      }

    })
  }

  //render output function for JSX
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2> {this.pageHeader.message} </h2>
          <h3> {this.pageHeader.messagesub} </h3>
        </div>

        <div className="pArea1">
          <h3> {this.playerState.P_ONE_NAME} </h3>
          <h4> {this.playerState.P_ONE_WINS} Wins</h4>
        </div>

        <div className="board">
            {this.state.board.map((cell, index) => {
              return <div onClick={() => this.handleClick(index)} className="square">{cell}</div>;
            })}
        </div>

        <div className="pArea2">
          <h3> {this.playerState.P_TWO_NAME} </h3>
          <h4> {this.playerState.P_TWO_WINS} Wins</h4>
        </div>

        <div className="App-footer">
          <h4> {this.pageFooter.message} </h4>
          <h4> {this.pageFooter.messagesub} </h4>
        </div>
      </div>
    );
  }
}

export default App;
