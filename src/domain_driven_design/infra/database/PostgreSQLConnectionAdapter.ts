import Connection from "./Connection";
import pgPromise from "pg-promise";

export default class PostgreSQLConnectionAdapter implements Connection {
    connection: any;
    
    constructor() {
        const pgp = pgPromise({});
        const connectionString = 'postgres://myuser:mypassword@localhost:5432/mydatabase'; 
        this.connection = pgp(connectionString);
    }
    async close(): Promise<void> {

        await this.connection.$pool.end();
    }


    async query(stmt: string, params: any): Promise<any> {
        return await this.connection.query(stmt, params);
    }
}