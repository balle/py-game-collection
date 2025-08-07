import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import gameService, { Game } from "../services/game-service";

interface Props {
  error: string;
  setError: (msg: string) => void;
  selectedGenre: string;
  selectedGamesystem: string;
  onSelectGame: (item: Game) => void;
}

function GameList({
  error,
  setError,
  selectedGenre,
  selectedGamesystem,
  onSelectGame,
}: Props) {
  const [games, updateGames] = useState<Game[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    gameService.getGames(updateGames, setError, pageNumber, {
      genre: parseInt(selectedGenre),
      gamesystem: parseInt(selectedGamesystem),
    });

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
        <a onClick={() => setPageNumber(pageNumber - 1)}>
          <FaArrowAltCircleLeft />
        </a>
        <a onClick={() => setPageNumber(pageNumber + 1)}>
          <FaArrowAltCircleRight />
        </a>
      </p>
    </>
  );
}

export default GameList;
