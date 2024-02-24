import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: true });

const config = {
    user: process.env.AZURE_SQL_USER, // better stored in an app setting such as process.env.DB_USER
    password: process.env.AZURE_SQL_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
    server: process.env.AZURE_SQL_SERVER, // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: process.env.AZURE_SQL_DATABASE, // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

//create any query functions here


async function testQuery() {
    try {
        let poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        let resultSet = await poolConnection.request().query(`SELECT * FROM [dbo].[Dummy]`);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        let columns = "";
        for (let column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
            console.log("%s   %s   %s", row.ID, row.Name, row.Age);
        });

        // close connection only when we're certain application is finished
        poolConnection.close();
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

async function getClassInfo(id) {
    try {
        let poolConnection = await sql.connect(config);
        let resultSet = await poolConnection.request().input('id', sql.Int, id).query(`SELECT * FROM [dbo].[Class] WHERE ID =
        @id`);
        poolConnection.close();
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function getUniversities() {
    try {
        let poolConnection = await sql.connect(config);
        console.log("requesting all Universities")
        let resultSet = await poolConnection.request().query("SELECT * FROM [dbo].[University]");
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export default testQuery // export any query function created like this
