import { useState } from "react";
import GameList from "./components/GameList";
import "./index.css";
import { base_url } from "./services/api-client";
import type { Game } from "./services/game-service";
import GenreFilter from "./components/GenreFilter";
import GamesystemFilter from "./components/GamesystemFilter";
import Checkbox from "./components/Checkbox";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGamesystem, setSelectedGamesystem] = useState("");
  const [selectedPlayed, setSelectedPlayed] = useState(false);
  const [selectedFinished, setSelectedFinished] = useState(false);

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
          <div className="col">Played</div>
          <div className="col">Finished</div>
        </div>
        <div className="row">
          <div className="col">
            <GenreFilter setSelectedGenre={setSelectedGenre} />
          </div>
          <div className="col">
            <GamesystemFilter setSelectedGamesystem={setSelectedGamesystem} />{" "}
          </div>
          <div className="col">
            <Checkbox onChange={setSelectedPlayed} />
          </div>
          <div className="col">
            <Checkbox onChange={setSelectedFinished} />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <GameList
          selectedGenre={selectedGenre}
          selectedGamesystem={selectedGamesystem}
          selectedPlayed={selectedPlayed}
          selectedFinished={selectedFinished}
          onSelectGame={handleSelectedItem}
        />
      </div>
    </>
  );
}

export default App;
