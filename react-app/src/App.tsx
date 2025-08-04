import { useState } from "react";
import GameList from "./components/GameList";
import Filter from "./components/Filter";
import "./index.css";
import { base_url } from "./services/api-client";
import type { GameType } from "./services/game-service";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGamesystem, setSelectedGamesystem] = useState("");

  // TODO: this should be fetched from server
  let genres = [
    {
      id: 3,
      name: "Racing",
    },
    {
      id: 6,
      name: "Fighting",
    },
    {
      id: 34,
      name: "Jump 'n run",
    },
  ];

  // TODO: this should be fetched from server
  let gamesystems = [
    {
      id: 3,
      name: "Playstation 3",
    },
    {
      id: 6,
      name: "Nintendo Switch",
    },
    {
      id: 9,
      name: "SNES",
    },
  ];

  // TODO: use react detail view
  const handleSelectedItem = (item: GameType) => {
    location.href = `${base_url}/game/${item.id}`;
  };

  return (
    <>
      <div className="text-center mt-3">
        <h1>Games</h1>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col">Genres</div>
          <div className="col">Gamesystems</div>
        </div>
        <div className="row">
          <div className="col">
            <Filter items={genres} onSelect={setSelectedGenre} />
          </div>
          <div className="col">
            <Filter items={gamesystems} onSelect={setSelectedGamesystem} />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <GameList
          selectedGenre={selectedGenre}
          selectedGamesystem={selectedGamesystem}
          onSelectGame={handleSelectedItem}
        />
      </div>
    </>
  );
}

export default App;
