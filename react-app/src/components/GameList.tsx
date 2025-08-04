import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import gameService, { type GameType } from "../services/game-service";

interface Props {
  games: GameType[];
  pageNumber: number;
  selectedGenre: string;
  selectedGamesystem: string;
  onSelectGame: (item: GameType) => void;
  onPageSelect: (forward: boolean) => void;
  updateGames: (games: GameType[]) => void;
}

function GameList({
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    gameService.getAllGames(updateGames, setError, pageNumber);

    setLoading(false);
  }, [pageNumber, selectedGenre, selectedGamesystem]);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {loading && <div className="spinner-border"></div>}
      {!loading && games.length === 0 && <p>No games found</p>}

      <ul className="list-group">
        {games.map((game, index) => (
          <li
            key={game.id}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item list-group-item-action"
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
