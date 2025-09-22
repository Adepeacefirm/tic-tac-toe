import React, { useState } from "react";
import Homepage from "./components/Homepage";
import GameStart from "./components/GameStart";

const App = () => {
  const [playerMark, setPlayerMark] = useState("X");
  const [opponent, setOpponent] = useState(null);

  return (
    <div>
      {!opponent ? (
        <Homepage setPlayerMark={setPlayerMark} playerMark={playerMark} setOpponent={setOpponent} />
      ) : (
        <GameStart
          playerMark={playerMark}
          opponent={opponent}
          setOpponent={setOpponent}
        />
      )}
    </div>
  );
};

export default App;
