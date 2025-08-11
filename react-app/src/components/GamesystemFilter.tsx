import { useEffect, useState } from "react";
import Filter from "./Filter";
import gameService, { type Gamesystem } from "../services/game-service";

interface Props {
  setError: (msg: string) => void;
  selectedGamesystem: string;
  setSelectedGamesystem: (id: string) => void;
}

const GamesystemFilter = ({
  setError,
  selectedGamesystem,
  setSelectedGamesystem,
}: Props) => {
  const [gamesystems, updateGamesystems] = useState<Gamesystem[]>([]);

  useEffect(() => {
    gameService.getGamesystems(updateGamesystems, setError);
  }, [selectedGamesystem]);

  return <Filter items={gamesystems} onSelect={setSelectedGamesystem} />;
};

export default GamesystemFilter;
