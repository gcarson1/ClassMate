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
// this involves getting all comments and difficulties for that class
export async function getClassInfo(poolConnection, classID, uniID) {
    try {
        console.log("requesting class info for classID " + classID + " at university " + uniID);
        let resultSet = await poolConnection.request().query(`
        WITH 
            fullclassname (ClassID, ClassType, ClassName, ClassNum, UniName, UniID) AS (
                SELECT c.ClassID, ct.ClassType, c.ClassName, c.ClassNum, u.UniName, u.UniID
                FROM ClassType ct
                LEFT JOIN Class c ON c.ClassTypeID = ct.ClassTypeID
                LEFT JOIN University u ON ct.UniID = u.UniID
            ),
            fulldiffname (DifficultyID, DifficultyValue, QualityValue, ProfessorName, UserName, ClassID) AS (
                SELECT d.DifficultyID, d.DifficultyValue, d.QualityValue, p.Name, u.UserName, d.ClassID
                FROM Difficulty d
                LEFT JOIN Professors p ON d.ProfessorID = p.ProfessorID
                LEFT JOIN Users u ON d.UserID = u.UserID
            )

        SELECT d.DifficultyValue, d.QualityValue, d.ProfessorName, d.UserName, c.Comment, c.TermTaken, c.Grade, c.PostDate, cl.ClassType, cl.ClassName, cl.ClassNum, cl.UniName
        FROM fulldiffname d
        LEFT JOIN Comments c ON d.DifficultyID = c.DifficultyID
        LEFT JOIN fullclassname cl ON d.ClassID = cl.ClassID
        WHERE d.ClassID = ${classID} AND cl.UniID = '${uniID}'
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function getClassesByUniAndType(poolConnection, uniID, classTypeID) {
    try {
        console.log("requesting class info for classTypeID " + classTypeID + " at university " + uniID);
        let resultSet = await poolConnection.request().query(`
        SELECT ct.ClassType, c.ClassNum, c.ClassName
        FROM [dbo].[ClassType] ct
        INNER JOIN [dbo].[Class] c ON c.ClassTypeID = ct.ClassTypeID
        WHERE ct.UniID = ${uniID} AND ct.ClassTypeID = ${classTypeID}
        ORDER BY ct.ClassType, c.ClassNum
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}