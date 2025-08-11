import { useEffect, useState } from "react";
import gameService, { type Genre } from "../services/game-service";
import Filter from "./Filter";

interface Props {
  setError: (msg: string) => void;
  selectedGenre: string;
  setSelectedGenre: (id: string) => void;
}

const GenreFilter = ({ setError, selectedGenre, setSelectedGenre }: Props) => {
  const [genres, updateGenres] = useState<Genre[]>([]);

  useEffect(() => {
    gameService.getGenres(updateGenres, setError);
  }, [selectedGenre]);

  return <Filter items={genres} onSelect={setSelectedGenre} />;
};

export default GenreFilter;
