import Item, { TItemPayload } from "../../domain/entity/Item";
import ItemRepository from "../../domain/repository/ItemRepository";

const payloadIten1: TItemPayload = {
    idItem: 1,
    groupItem: "food",
    description: "banana",
    price: 1000
}

const payloadIten2: TItemPayload = {
    idItem: 2,
    groupItem: "food",
    description: "apple",
    price: 5000
}

const payloadIten3: TItemPayload = {
    idItem: 3,
    groupItem: "food",
    description: "pineapple",
    price: 30
}

export default class ItemRepositoryInMemory implements ItemRepository {
    items: Item[];

    constructor() {
        this.items = [
            new Item(payloadIten1),
            new Item(payloadIten2),
            new Item(payloadIten3),
        ]
    }

    getAll(): Item[] {
        throw new Error("Method not implemented.");
    }

    getById(idItem: number): Item | undefined{
        return this.items.find(item => item.idItem === idItem);
    }
}