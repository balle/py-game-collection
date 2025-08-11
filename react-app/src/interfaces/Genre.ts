import type { Item } from "../interfaces/Item";


export class Genre implements Item {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }};
