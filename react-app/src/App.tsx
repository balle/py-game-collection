import { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";
import Form from "./components/Form";

import "./index.css";

type GameType = {
  id: number;
  name: string;
};

function App() {
  let [games, updateGames] = useState<GameType[]>([]);
  let [pageNumber, setPageNumber] = useState(1);
  // updateGames(["Crash Bandicoot", "Super Mario", "Wipeout", "Burnout"]);

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
  }, [pageNumber]);

  return (
    <div>
      <ListGroup
        items={games}
        heading="Games"
        onSelectItem={handleSelectedItem}
        onPageSelect={handleSelectPage}
      />
    </div>
  );
}

export default App;
