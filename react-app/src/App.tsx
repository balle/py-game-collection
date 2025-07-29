import { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";

import "./index.css";
import Filter from "./components/Filter";

type GameType = {
  id: number;
  name: string;
};

function App() {
  const [games, updateGames] = useState<GameType[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
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

  let base_url = location.origin;
  base_url = "http://127.0.0.1:8000";

  const handleSelectPage = (forward: boolean) => {
    if (forward) {
      setPageNumber(pageNumber + 1);
    } else {
      setPageNumber(pageNumber - 1);
    }
  };
  const handleSelectedItem = (item: GameType) => {
    location.href = `${base_url}/game/${item.id}`;
  };

  // TODO: need new api call for filtering
  // TODO: this should be in list component
  useEffect(() => {
    const apiUrl = `${base_url}/api/games/?page=${pageNumber}`;

    let ajax = new XMLHttpRequest();
    ajax.onload = function () {
      try {
        const parsed = JSON.parse(this.response);
        const newGames: GameType[] = parsed["results"].map(
          (game: GameType) => ({
            id: game.id,
            name: game.name,
          })
        );
        updateGames(newGames);
      } catch (error: any) {
        console.error("Failed parsing /api/games response ", error.message);
      }
    };

    ajax.open("GET", apiUrl, false);
    ajax.setRequestHeader("Accept", "application/json");
    ajax.send();
  }, [pageNumber, selectedGenre, selectedGamesystem]);

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
        <ListGroup
          items={games}
          onSelectItem={handleSelectedItem}
          onPageSelect={handleSelectPage}
        />
      </div>
    </>
  );
}

export default App;
