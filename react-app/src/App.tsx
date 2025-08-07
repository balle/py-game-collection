import { useState } from "react";
import GameList from "./components/GameList";
import "./index.css";
import { base_url } from "./services/api-client";
import type { Game } from "./services/game-service";
import GenreFilter from "./components/GenreFilter";
import GamesystemFilter from "./components/GamesystemFilter";

function App() {
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGamesystem, setSelectedGamesystem] = useState("");

  // TODO: use react detail view
  const handleSelectedItem = (item: Game) => {
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
            <GenreFilter
              setError={setError}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
            />
          </div>
          <div className="col">
            <GamesystemFilter
              setError={setError}
              selectedGamesystem={selectedGamesystem}
              setSelectedGamesystem={setSelectedGamesystem}
            />{" "}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <GameList
          error={error}
          setError={setError}
          selectedGenre={selectedGenre}
          selectedGamesystem={selectedGamesystem}
          onSelectGame={handleSelectedItem}
        />
      </div>
    </>
  );
}

export default App;
