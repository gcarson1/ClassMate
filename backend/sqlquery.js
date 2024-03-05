//create any query functions here

// Returns all universities in the database
export async function getUniversities(poolConnection) {
    try {
        console.log("requesting all Universities")
        let resultSet = await poolConnection.request().query("SELECT * FROM [dbo].[University]");
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

// given a certain class, returns all data necessary for that class
// this involves getting all comments, professors, and difficulties for that class
// TODO: Finish
export async function getClassInfo(poolConnection, classID) {
    try {
        console.log("requesting class info")
        let resultSet = await poolConnection.request().query(`
        SELECT d.*, c.*, cl.*
        FROM Difficulty d
        LEFT JOIN Comments c ON d.DifficultyID = c.DifficultyID
        LEFT JOIN Class cl ON d.ClassID = cl.ClassID
        WHERE d.ClassID = ${classID};
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}