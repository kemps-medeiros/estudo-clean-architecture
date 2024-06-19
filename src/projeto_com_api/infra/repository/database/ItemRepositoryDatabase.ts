import Item, { TItemPayload } from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";
import Connection from "../../database/Connection";

export default class ItemRepositoryDatabase implements ItemRepository{

    constructor(readonly connection: Connection) {}

    async getAll(): Promise<Item[]> {
        throw new Error("Method not implemented.");
    }
    async getById(idItem: number): Promise<Item | undefined> {
        const [itemData] = await this.connection.query("select * from ccca.item where id_item = $1", [idItem]);

        const itemPayload: TItemPayload = {
            idItem: itemData.id_item,
            description: itemData.description,
            groupItem: 'x',
            price: itemData.price,
            width: itemData.width,
            height: itemData.height,
            length: itemData.length,
            weight: itemData.weight
        }

        const item = new Item(itemPayload);

        return item;
    }

}