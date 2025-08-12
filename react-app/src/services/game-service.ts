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
    async fetch<T extends Item>(apiUrl: string) {
        let newItems: T[] = [];

        try {
            const data = await apicall("GET", apiUrl) 

            newItems = data["results"].map(
                (item: T) => ({
                    id: item.id,
                    name: item.name}));
        } catch(e) {
            console.error(`Error fetching url ${apiUrl}: ${e}`)
        }
        
        return newItems;
    }
    
    getGenres(): Promise<Genre[]> {
        const apiUrl = "/api/genres/";
        return this.fetch<Genre>(apiUrl);
    }

    getGamesystems(): Promise<Gamesystem[]> {
        const apiUrl = "/api/gamesystems/";
        return this.fetch<Gamesystem>(apiUrl);
    }

    // TODO: Search for name
    getGames(page: number = -1, filter: GameFilterType): Promise<Game[]> {
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

        return this.fetch<Game>(apiUrl);
    }
}

export default new GameService();
export type { Game, Genre, Gamesystem }