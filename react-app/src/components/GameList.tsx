import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import gameService, { type GameType } from "../services/game-service";

interface Props {
  selectedGenre: string;
  selectedGamesystem: string;
  onSelectGame: (item: GameType) => void;
}

function GameList({ selectedGenre, selectedGamesystem, onSelectGame }: Props) {
  const [games, updateGames] = useState<GameType[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    gameService.getAllGames(updateGames, setError, pageNumber, {
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
