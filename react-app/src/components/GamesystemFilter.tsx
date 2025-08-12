import Filter from "./Filter";
import gameService, { type Gamesystem } from "../services/game-service";
import { useQuery } from "@tanstack/react-query";

interface Props {
  setSelectedGamesystem: (id: string) => void;
}

const GamesystemFilter = ({ setSelectedGamesystem }: Props) => {
  const { data: gamesystems } = useQuery<Gamesystem[]>({
    queryKey: ["gamesystems"],
    queryFn: () => gameService.getGamesystems(),
  });

  return <Filter items={gamesystems} onSelect={setSelectedGamesystem} />;
};

export default GamesystemFilter;
