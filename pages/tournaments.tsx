import React from "react";
import Image from "next/image";
import "../styles/tournaments.css";

export default function Tournaments() {
  return (
    <div>
      <div className="header">
        <div className="headerText">Futsal Tournament Live Bracket</div>
      </div>
      <div className="tournament-bracket">
        <div className="round r-of-8">
          <div className="bracket-game">
            <div className="player top win">
              Team 1<div className="score">3</div>
            </div>
            <div className="player bot loss">
              Team 2<div className="score">1</div>
            </div>
          </div>
          <div className="bracket-game">
            <div className="player top win">
              Team 3<div className="score">3</div>
            </div>
            <div className="player bot loss">
              Team 4<div className="score">2</div>
            </div>
          </div>
          <div className="bracket-game">
            <div className="player top win">
              Team 5<div className="score">3</div>
            </div>
            <div className="player bot loss">
              Team 6<div className="score">0</div>
            </div>
          </div>
          <div className="bracket-game">
            <div className="player top win">
              Team 7<div className="score">3</div>
            </div>
            <div className="player bot loss">
              Team 8<div className="score">1</div>
            </div>
          </div>
        </div>
        <div className="round r-of-4">
          <div className="bracket-game">
            <div className="player top win">
              Team 1<div className="score">3</div>
            </div>
            <div className="player bot loss">
              Team 2<div className="score">1</div>
            </div>
          </div>
          <div className="bracket-game">
            <div className="player top win">
              Team 3<div className="score">3</div>
            </div>
            <div className="player bot loss">
              Team 4<div className="score">2</div>
            </div>
          </div>
        </div>
        <div className="round r-of-2">
          <div className="bracket-game">
            <div className="player top win">
              Team 1<div className="score">3</div>
            </div>
            <div className="player bot loss">
              Team 2<div className="score">1</div>
            </div>
          </div>
        </div>
        <div>
          <Image
            width={300}
            height={500}
            alt="Image Alt"
            src={"/FutsalTournament2023.png"}
          ></Image>
        </div>
      </div>
    </div>
  );
}
