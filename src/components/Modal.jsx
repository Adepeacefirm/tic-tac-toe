import React from "react";

const Modal = ({ winner, onQuit, onNext, currentPlayer, playerMark }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-slate-800 p-6 text-center space-y-4 w-full">
        <p className="text-sm text-[hsl(198,23%,72%)]">
          {playerMark === winner
            ? "YOU WON"
            : winner === "Tie"
            ? ""
            : "OH NO, YOU LOST..."}
        </p>
        <h2
          onClick={() => {
            console.log(currentPlayer);
            console.log(playerMark);
          }}
          className={`text-2xl font-bold ${
            winner === "X" && "text-[hsl(178,60%,48%)]"
          } ${winner === "O" && "text-[hsl(39,88%,58%)]"} ${
            winner === "Tie" && "text-[hsl(198,23%,72%)]"
          }`}
        >
          {winner === "Tie" ? "ROUND TIED" : `${winner} TAKES THE ROUND!`}
        </h2>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onQuit}
            className="bg-[hsl(198,23%,72%)] cursor-pointer px-4 py-2 rounded-xl"
          >
            Quit
          </button>
          <button
            onClick={onNext}
            className="bg-[hsl(39,88%,58%)] cursor-pointer px-4 py-2 rounded-xl"
          >
            Next Round
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
