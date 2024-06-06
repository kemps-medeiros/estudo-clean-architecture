import PostgreSQLConnectionAdapter from "../../infra/database/PostgreSQLConnectionAdapter";

describe.skip('Connections Database', () => {
    it('should test connection with database', async () => {
        const connection = new PostgreSQLConnectionAdapter();
        
        const items = await connection.query("SELECT * FROM ccca.item", []);
        expect(items).toHaveLength(3)
        await connection.close();
    })
})