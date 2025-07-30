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

  // TODO: need new api call for filtering
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
