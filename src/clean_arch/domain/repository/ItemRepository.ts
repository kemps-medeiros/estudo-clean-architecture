import Item from "../entity/Item";

export default interface ItemRepository {
    getAll(): Item[];
    getById(idItem: number): Item | undefined;
}