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
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const {
    data: games,
    error,
    isLoading,
  } = useQuery<Game[], Error>({
    queryKey: [
      selectedGamesystem,
      selectedGenre,
      selectedPlayed,
      selectedFinished,
      "games",
    ],
    queryFn: () => {
      return gameService.getGames(pageNumber, {
        genre: parseInt(selectedGenre),
        gamesystem: parseInt(selectedGamesystem),
        played: selectedPlayed,
        finished: selectedFinished,
      });
    },
    staleTime: 60_000, // 1 minute
    refetchInterval: 60_000, // 1 minute
  });

  return (
    <>
      {error && <p className="text-danger">{error.message}</p>}
      {isLoading && <div className="spinner-border"></div>}
      {!isLoading && games?.length === 0 && <p>No games found</p>}

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
