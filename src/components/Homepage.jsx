import React, { useState } from "react";
import { assets } from "../assets/assets";

const Homepage = ({ setPlayerMark, playerMark, setOpponent }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] bg-[hsl(202,32%,15%)]">
      <main className="w-[90%] sm:w-[70%] lg:w-[30%] mx-auto">
        <header className="flex justify-center items-center gap-2 my-5">
          <img className="w-[9%]" src={assets.icon_x} alt="icon x" />
          <img className="w-[9%]" src={assets.icon_o} alt="icon o" />
        </header>
        <section className="bg-[hsl(199,35%,19%)] flex flex-col justify-center px-2 py-5 rounded-2xl">
          <p className="text-center text-lg text-[hsl(198,23%,72%)] font-semibold">
            PICK PLAYER 1'S MARK
          </p>
          <div className="flex justify-center items-center my-5 bg-[hsl(202,32%,15%)] w-[80%] mx-auto py-2 rounded-lg">
            <div
              onClick={() => setPlayerMark("X")}
              className={`w-[40%] flex cursor-pointer justify-center px-2 py-1 rounded-xl ${
                playerMark === "X" && "bg-[hsl(198,23%,32%)]"
              }`}
            >
              <img className="w-[35%]" src={assets.icon_x} alt="icon x" />
            </div>
            <div
              onClick={() => setPlayerMark("O")}
              className={`w-[40%] flex cursor-pointer justify-center p-2 py-1 rounded-xl ${
                playerMark === "O" && "bg-[hsl(198,23%,32%)]"
              }`}
            >
              <img className="w-[35%]" src={assets.icon_o} alt="icon o" />
            </div>
          </div>
          <p className="text-center text-sm text-[hsl(198,23%,72%)]">
            REMEMBER: X GOES FIRST
          </p>
        </section>
        <footer className="my-8 flex flex-col gap-7">
          <button
            onClick={() => setOpponent("cpu")}
            className="bg-[hsl(39,88%,58%)] p-3 rounded-2xl shadow-[0_8px_0px_rgba(0,0,0,0.4)] shadow-[hsl(39,83%,44%)] font-bold cursor-pointer"
          >
            NEW GAME (VS CPU){" "}
          </button>
          <button
            onClick={() => setOpponent("multi")}
            className="bg-[hsl(178,60%,48%)] p-3 rounded-2xl shadow-[0_8px_0px_rgba(0,0,0,0.4)] shadow-[hsl(178,78%,31%)] font-bold cursor-pointer"
          >
            NEW GAME (VS PLAYER)
          </button>
        </footer>
      </main>
    </div>
  );
};

export default Homepage;
