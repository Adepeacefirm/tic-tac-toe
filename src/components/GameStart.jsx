import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Square from "./Square";
import Modal from "./Modal";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const GameStart = ({ playerMark, opponent, setOpponent }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, Ties: 0 });
  const [winner, setWinner] = useState(null);

  const currentPlayer = xIsNext ? "X" : "O";

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("xIsNext", JSON.stringify(xIsNext));
    localStorage.setItem("scores", JSON.stringify(scores));
    localStorage.setItem("winner", winner || "");
  }, [board, xIsNext, scores, winner]);

  const handleClick = (i) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = currentPlayer;
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      updateScores(win);
    } else if (!newBoard.includes(null)) {
      setWinner("Tie");
      updateScores("Tie");
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const checkWinner = (b) => {
    for (let [a, b1, c] of WINNING_LINES) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  };

  const updateScores = (result) => {
    if (result === "Tie") {
      setScores((s) => ({ ...s, Ties: s.Ties + 1 }));
    } else {
      setScores((s) => ({ ...s, [result]: s[result] + 1 }));
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  const cpuMove = () => {
    if (winner) return;

    const cpuMark = playerMark === "X" ? "O" : "X";

    // 1. Check for winning move
    for (let [a, b, c] of WINNING_LINES) {
      if (board[a] === cpuMark && board[b] === cpuMark && !board[c]) return c;
      if (board[a] === cpuMark && board[c] === cpuMark && !board[b]) return b;
      if (board[b] === cpuMark && board[c] === cpuMark && !board[a]) return a;
    }

    // 2. Block player’s winning move
    for (let [a, b, c] of WINNING_LINES) {
      if (board[a] === playerMark && board[b] === playerMark && !board[c])
        return c;
      if (board[a] === playerMark && board[c] === playerMark && !board[b])
        return b;
      if (board[b] === playerMark && board[c] === playerMark && !board[a])
        return a;
    }

    // 3. Take center if available
    if (!board[4]) return 4;

    // 4. Otherwise, random move
    const available = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((v) => v !== null);

    return available[Math.floor(Math.random() * available.length)];
  };

  useEffect(() => {
    if (opponent === "cpu" && !winner && currentPlayer !== playerMark) {
      const available = board
        .map((val, idx) => (val === null ? idx : null))
        .filter((v) => v !== null);

      if (available.length > 0) {
        const randomIndex =
          available[Math.floor(Math.random() * available.length)];

        const timer = setTimeout(() => {
          handleClick(randomIndex);
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [board, xIsNext, opponent, winner, playerMark]);

  return (
    <div className="bg-[hsl(202,32%,15%)] w-full min-h-screen">
      <main className="min-h-[100vh]  sm:w-[70%] lg:w-[40%] sm:mx-auto">
        <header className="flex justify-between w-[90%] sm:w-[60%] mx-auto pt-5 sm:pt-15">
          <div className="flex items-center gap-2">
            <img className="w-[15%]" src={assets.icon_x} alt="icon x" />
            <img className="w-[15%]" src={assets.icon_o} alt="icon o" />
          </div>
          <div className="-ml-20 px-5 py-1 text-[hsl(198,23%,72%)] bg-[hsl(202,32%,25%)] rounded-md">
            <p>{currentPlayer} Turn</p>
          </div>
          <div className="bg-[hsl(198,23%,72%)] flex justify-between items-center p-2 rounded-md">
            <img className="" src={assets.icon_restart} alt="" />
          </div>
        </header>

        <section>
          <div className="grid grid-cols-3 gap-3 w-72 mx-auto mt-15 mb-5">
            {board.map((val, i) => (
              <Square
                key={i}
                value={val}
                onClick={() => handleClick(i)}
                preview={currentPlayer}
              />
            ))}
          </div>
        </section>

        <footer>
          <div className="flex justify-between gap-3 bg-slate-800 p-4 rounded-xl w-72 mx-auto">
            <div className="bg-[hsl(178,60%,48%)] p-2 rounded-lg">
              X (You):{" "}
              <span className="block text-center font-bold">{scores.X}</span>
            </div>
            <div className="bg-[hsl(199,15%,58%)] p-2 rounded-lg">
              Ties:{" "}
              <span className="block text-center font-bold">{scores.Ties}</span>
            </div>
            <div className="bg-[hsl(39,88%,58%)] p-2 rounde-lg">
              O ({opponent === "cpu" ? "CPU" : "P2"}):{" "}
              <span className="block text-center font-bold">{scores.O}</span>
            </div>
          </div>
        </footer>

        {winner && (
          <Modal
            winner={winner}
            onQuit={() => setOpponent(null)}
            onNext={resetBoard}
            playerMark={playerMark}
            currentPlayer={currentPlayer}
          />
        )}
      </main>
    </div>
  );
};

export default GameStart;
