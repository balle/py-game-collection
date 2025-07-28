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
  // updateGames(["Crash Bandicoot", "Super Mario", "Wipeout", "Burnout"]);

  const handleSelectedItem = (item: GameType) => {
    console.log(item);
  };

  const apiUrl = "http://127.0.0.1:8000/api/games/?page=1";

  useEffect(() => {
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

      console.log(this.response);
    };

    ajax.open("GET", apiUrl, false);
    ajax.setRequestHeader("Accept", "application/json");
    ajax.send();
  }, []);

  return (
    <div>
      <ListGroup
        items={games}
        heading="Games"
        onSelectItem={handleSelectedItem}
      />
    </div>
  );
}

export default App;
