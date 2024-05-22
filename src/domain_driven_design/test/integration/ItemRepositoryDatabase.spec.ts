import PostgreSQLConnectionAdapter from "../../infra/database/PostgreSQLConnectionAdapter"
import ItemRepositoryDatabase from "../../infra/repository/database/ItemRepositoryDatabase";

describe("ItemRepositoryDatabase", () => {
    it("should test item repository database", async () => {

        const connection = new PostgreSQLConnectionAdapter();
        const itemRepository = new ItemRepositoryDatabase(connection);
        const item = await itemRepository.getById(1);
        expect(item?.description).toBe("Guitarra");
        await connection.close();
    })
})