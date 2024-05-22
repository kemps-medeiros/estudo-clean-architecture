import Item from "../entity/Item";

export default interface ItemRepository {
    getAll(): Promise<Item[]>;
    getById(idItem: number): Promise<Item | undefined>;
}