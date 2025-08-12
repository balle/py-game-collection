import gameService, { type Genre } from "../services/game-service";
import Filter from "./Filter";
import { useQuery } from "@tanstack/react-query";

interface Props {
  setSelectedGenre: (id: string) => void;
}

const GenreFilter = ({ setSelectedGenre }: Props) => {
  const { data: genres } = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: () => gameService.getGenres(),
  });

  return <Filter items={genres} onSelect={setSelectedGenre} />;
};

export default GenreFilter;
