import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import gameService, { type Game } from "../services/game-service";
import { useQuery } from "@tanstack/react-query";

interface Props {
  selectedGenre: string;
  selectedGamesystem: string;
  selectedPlayed: boolean;
  selectedFinished: boolean;
  onSelectGame: (item: Game) => void;
}

function GameList({
  selectedGenre,
  selectedGamesystem,
  selectedPlayed,
  selectedFinished,
  onSelectGame,
}: Props) {
  // const [games, updateGames] = useState<Game[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const { data: games, error } = useQuery<Game[], Error>({
    queryKey: ["games"],
    queryFn: () => {
      setLoading(true);
      const data = gameService.getGames(pageNumber, {
        genre: parseInt(selectedGenre),
        gamesystem: parseInt(selectedGamesystem),
        played: selectedPlayed,
        finished: selectedFinished,
      });

      setLoading(false);
      return data;
    },
  });

  return (
    <>
      {error && <p className="text-danger">{error.message}</p>}
      {loading && <div className="spinner-border"></div>}
      {!loading && games?.length === 0 && <p>No games found</p>}

      <ul className="list-group">
        {games?.map((game, index) => (
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
