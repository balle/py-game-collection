import apicall from "./api-client";

type GameType = {
  id: number;
  name: string;
};

type GameFilterType = {
    genre?: number;
    gamesystem?: number;
}

class GameService {
    // TODO: Need new api call for filtering
    getAllGames(successFunction: (games: GameType[]) => void, errorFunction: (msg: string) => void, page: number = -1, filter: GameFilterType) {
        let apiUrl = page === -1 ? "/api/games" : `/api/games/?page=${page}`;

        if (filter.gamesystem) {
            apiUrl += `&gamesystem=${filter.gamesystem}`
        }

        if (filter.genre) {
            apiUrl += `&genre=${filter.genre}`
        }

        apicall("GET", apiUrl, function () {
            if (this.status == 200) {
                const newGames: GameType[] = this.response["results"].map(
                (game: GameType) => ({
                    id: game.id,
                    name: game.name,
                })
                );
                successFunction(newGames);
            } else {
                errorFunction("Failed fetching games");
            }

        });
    }
}

export default new GameService();
export type {GameType};
