import type { Game } from "../interfaces/Game";
import type { Gamesystem } from "../interfaces/Gamesystem";
import type { Genre } from "../interfaces/Genre";
import type { Item } from "../interfaces/Item";
import apicall from "./api-client";

type GameFilterType = {
    genre?: number;
    gamesystem?: number;
    played?: boolean;
    finished?: boolean;
}


class GameService {
    fetch(apiUrl: string, successFunction: (items: Item[]) => void, errorFunction: (msg: string) => void) {
        apicall("GET", apiUrl, function () {
        if (this.status == 200) {
            const newItems: Item[] = this.response["results"].map(
            (item: Item) => ({
                id: item.id,
                name: item.name,
            })
            );
            successFunction(newItems);
        } else {
            errorFunction("Failed fetching " + apiUrl);
        }

    });

    }
    getGenres(successFunction: (genres: Genre[]) => void, errorFunction: (msg: string) => void) {
        const apiUrl = "/api/genres/";
        this.fetch(apiUrl, successFunction, errorFunction);
    }

    getGamesystems(successFunction: (gamesystems: Gamesystem[]) => void, errorFunction: (msg: string) => void) {
        const apiUrl = "/api/gamesystems/";
        this.fetch(apiUrl, successFunction, errorFunction);
    }

    // TODO: Search for name
    getGames(successFunction: (games: Game[]) => void, errorFunction: (msg: string) => void, page: number = -1, filter: GameFilterType) {
        let apiUrl = page === -1 ? "/api/games" : `/api/games/?page=${page}`;

        if (filter.gamesystem) {
            apiUrl += `&gamesystem=${filter.gamesystem}`
        }

        if (filter.genre) {
            apiUrl += `&genre=${filter.genre}`
        }

        if (filter.played) {
            apiUrl += `&played=1`
        }

        if (filter.finished) {
            apiUrl += `&finished=1`
        }

        this.fetch(apiUrl, successFunction, errorFunction);
    }
}

export default new GameService();
export type { Game, Genre, Gamesystem }