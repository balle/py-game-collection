import type { Item } from "./Item";


export class Game implements Item {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
};
