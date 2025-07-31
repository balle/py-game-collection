import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import type { GameType } from "./GameType";

interface Props {
  base_url: string;
  games: GameType[];
  pageNumber: number;
  selectedGenre: string;
  selectedGamesystem: string;
  onSelectGame: (item: GameType) => void;
  onPageSelect: (forward: boolean) => void;
  updateGames: (games: GameType[]) => void;
}

function GameList({
  base_url,
  games,
  pageNumber,
  selectedGenre,
  selectedGamesystem,
  onSelectGame,
  onPageSelect,
  updateGames,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState("");

  // TODO: need new api call for filtering
  useEffect(() => {
    const apiUrl = `${base_url}/api/games/?page=${pageNumber}`;

    let ajax = new XMLHttpRequest();
    ajax.open("GET", apiUrl);
    ajax.responseType = "json";
    ajax.timeout = 10000;
    ajax.onload = function () {
      if (ajax.status == 200) {
        const newGames: GameType[] = this.response["results"].map(
          (game: GameType) => ({
            id: game.id,
            name: game.name,
          })
        );
        updateGames(newGames);
      } else {
        setError("Failed fetching games");
      }
    };

    ajax.send();
  }, [pageNumber, selectedGenre, selectedGamesystem]);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {games.length === 0 && <p>No games found</p>}

      <ul className="list-group">
        {games.map((game, index) => (
          <li
            key={game.id}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectGame(game);
            }}
          >
            {game.name}
          </li>
        ))}
      </ul>
      <p>
        <a onClick={() => onPageSelect(false)}>
          <FaArrowAltCircleLeft />
        </a>
        <a onClick={() => onPageSelect(true)}>
          <FaArrowAltCircleRight />
        </a>
      </p>
    </>
  );
}

export default GameList;
