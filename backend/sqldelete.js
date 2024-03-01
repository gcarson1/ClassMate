//Contains all of the functions for deleting data from the database
//TODO: Write a tree of dependencies to check

export async function deleteUser(poolConnection, userID) {
    //TODO: Test function
    try {
        console.log("Deleting user" + userID + "from database");
        let resultSet = await poolConnection.request().query(`
        BEGIN TRANSACTION;

        -- Start by deleting all of the junction tables that reference something that will be deleted (difficulty, comment)

        DELETE FROM [dbo].[Class_Difficulty] WHERE DifficultyID IN (SELECT DifficultyID FROM [dbo].[Difficulty] WHERE UserID = ${userID});
        DELETE FROM [dbo].[Class_Professor] WHERE ProfessorID IN (SELECT ProfessorID FROM [dbo].[Professors] WHERE UserID = ${userID});

        DELETE FROM [dbo].[Users] WHERE UserID = ${userID};
        DELETE FROM [dbo].[User_Difficulty] WHERE UserID = ${userID};
        DELETE FROM [dbo].[User_Comments] WHERE UserID = ${userID};
        DELETE FROM [dbo].[Comments] WHERE UserID = ${userID};
        DELETE FROM [dbo].[Difficulty] WHERE UserID = ${userID};
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

//!Warning: VERY DANGEROUS FUNCTION -- YOU PROBABLY DON'T WANT TO USE THIS UNLESS YOU'RE USING TEST DATA
export async function deleteUniversity(poolConnection, uniID) {
    //TODO: Test function
    try {
        console.log("Deleting University" + uniID + "from database");
        let resultSet = await poolConnection.request().query(`
        BEGIN TRANSACTION;

        -- Start by deleting all of the tables that reference something that will be deleted

        DELETE FROM [dbo].[Class_Comments] WHERE ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE UniID = ${uniID});
        DELETE FROM [dbo].[ClassType_Class] WHERE ClassTypeID IN (SELECT ClassTypeID FROM [dbo].[ClassType] WHERE UniID = ${uniID});
        DELETE FROM [dbo].[Class_Difficulty] WHERE ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE UniID = ${uniID});
        DELETE FROM [dbo].[Class_Professors] WHERE ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE UniID = ${uniID});
        DELETE FROM [dbo].[Difficulty] WHERE ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE UniID = ${uniID});
        DELETE FROM [dbo].[Comments] WHERE ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE UniID = ${uniID});
        DELETE FROM [dbo].[User_Comments] WHERE UserID IN (SELECT UserID FROM [dbo].[Users] WHERE UniID = ${uniID});
        DELETE FROM [dbo].[User_Difficulty] WHERE UserID IN (SELECT UserID FROM [dbo].[Users] WHERE UniID = ${uniID});
        DELETE FROM [dbo].[Users] WHERE UniID = ${uniID};

        DELETE FROM [dbo].[ClassType] WHERE UniID = ${uniID};
        DELETE FROM [dbo].[Professors] WHERE UniID = ${uniID};
        DELETE FROM [dbo].[Class] WHERE UniID = ${uniID};
        DELETE FROM [dbo].[University] WHERE UniID = ${uniID};
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function deleteClass(poolConnection, classID) {
    //TODO: Test function
    try {
        console.log("Deleting class" + classID + "from database");
        let resultSet = await poolConnection.request().query(`
        BEGIN TRANSACTION;

        -- Start by deleting all of the junction tables that reference something that will be deleted (difficulty, comment)

        DELETE FROM [dbo].[Class_Difficulty] WHERE ClassID = ${classID};
        DELETE FROM [dbo].[Class_Professors] WHERE ClassID = ${classID};
        DELETE FROM [dbo].[Class_Comments] WHERE ClassID = ${classID};
        DELETE FROM [dbo].[ClassType_Class] WHERE ClassID = ${classID};
        DELETE FROM [dbo].[User_Comments] WHERE CommentID IN (SELECT CommentID FROM [dbo].[Comments] WHERE ClassID = ${classID});
        DELETE FROM [dbo].[User_Difficulty] WHERE DifficultyID IN (SELECT DifficultyID FROM [dbo].[Difficulty] WHERE ClassID = ${classID});

        DELETE FROM [dbo].[Difficulty] WHERE ClassID = ${classID};
        DELETE FROM [dbo].[Comments] WHERE ClassID = ${classID};
        DELETE FROM [dbo].[Class] WHERE ClassID = ${classID};
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function deleteComment(poolConnection, commentID) {
    try {
        console.log("Deleting comment" + commentID + "from database");
        let resultSet = await poolConnection.request().query(`
        BEGIN TRANSACTION;

        -- Start by deleting all of the junction tables that reference something that will be deleted (difficulty, comment)
        DELETE FROM [dbo].[User_Comments] WHERE CommentID = ${commentID};
        DELETE FROM [dbo].[Class_Comments] WHERE CommentID = ${commentID};
        DELETE FROM [dbo].[User_Difficulty] WHERE DifficultyID IN (SELECT DifficultyID FROM [dbo].[Comments] WHERE CommentID = ${commentID});
        DELETE FROM [dbo].[Difficulty] WHERE DifficultyID IN (SELECT DifficultyID FROM [dbo].[Comments] WHERE CommentID = ${commentID});
        DELETE FROM [dbo].[Class_Difficulty] WHERE DifficultyID IN (SELECT DifficultyID FROM [dbo].[Comments] WHERE CommentID = ${commentID});

        DELETE FROM [dbo].[Comments] WHERE CommentID = ${commentID};
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function deleteProfessor(poolConnection, professorID) {
    //TODO: Test function
    try {
        console.log("Deleting professor" + professorID + "from database");
        let resultSet = await poolConnection.request().query(`
        BEGIN TRANSACTION;

        -- Start by deleting all of the junction tables that reference something that will be deleted (difficulty, comment)
        DELETE FROM [dbo].[Class_Professors] WHERE ProfessorID = ${professorID};
        DELETE FROM [dbo].[Class_Difficulty] WHERE DifficultyID IN (SELECT DifficultyID FROM [dbo].[Difficulty] WHERE ProfessorID = ${professorID});
        DELETE FROM [dbo].[User_Comments] WHERE CommentID IN (SELECT CommentID FROM [dbo].[Comments] WHERE DifficultyID IN (SELECT DifficultyID FROM [dbo].[Difficulty] WHERE ProfessorID = ${professorID}));
        DELETE FROM [dbo].[Class_Comments] WHERE CommentID IN (SELECT CommentID FROM [dbo].[Comments] WHERE DifficultyID IN (SELECT DifficultyID FROM [dbo].[Difficulty] WHERE ProfessorID = ${professorID}));
        DELETE FROM [dbo].[Comments] WHERE DifficultyID IN (SELECT DifficultyID FROM [dbo].[Difficulty] WHERE ProfessorID = ${professorID});
        DELETE FROM [dbo].[User_Difficulty] WHERE DifficultyID IN (SELECT DifficultyID FROM [dbo].[Difficulty] WHERE ProfessorID = ${professorID});
        
        DELETE FROM [dbo].[Difficulty] WHERE ProfessorID = ${professorID};
        DELETE FROM [dbo].[Professors] WHERE ProfessorID = ${professorID};
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function deleteClassType(poolConnection, classTypeID) {
    //TODO: Test function
    try {
        console.log("Deleting user" + classTypeID + "from database");
        let resultSet = await poolConnection.request().query(`
        BEGIN TRANSACTION;

        -- Start by deleting all of the junction tables that reference something that will be deleted (difficulty, comment)

        DELETE FROM [dbo].[User_Comments] WHERE CommentID IN (SELECT CommentID FROM [dbo].[Comments] WHERE ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE ClassTypeID = ${classTypeID}));
        DELETE FROM [dbo].[User_Difficulty] WHERE DifficultyID IN (SELECT DifficultyID FROM [dbo].[Difficulty] WHERE ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE ClassTypeID = ${classTypeID}));

        DELETE FROM [dbo].[Class_Difficulty] WHERE ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE ClassTypeID = ${classTypeID});
        DELETE FROM [dbo].[Class_Professors] WHERE ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE ClassTypeID = ${classTypeID});
        DELETE FROM [dbo].[Class_Comments] ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE ClassTypeID = ${classTypeID});
        DELETE FROM [dbo].[ClassType_Class] WHERE ClassTypeID = ${classTypeID};

        DELETE FROM [dbo].[Difficulty] WHERE ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE ClassTypeID = ${classTypeID});
        DELETE FROM [dbo].[Comments] WHERE ClassID IN (SELECT ClassID FROM [dbo].[Class] WHERE ClassTypeID = ${classTypeID});
        DELETE FROM [dbo].[Class] WHERE ClassTypeID = ${classTypeID};

        DELETE FROM [dbo].[ClassType] WHERE ClassTypeID = ${classTypeID};
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function deleteDifficulty(poolConnection, difficultyID) {
    //TODO: Test function
    try {
        console.log("Deleting difficulty" + difficultyID + "from database");
        let resultSet = await poolConnection.request().query(`
        BEGIN TRANSACTION;

        -- Start by deleting all of the junction tables that reference something that will be deleted (difficulty, comment)
        DELETE FROM [dbo].[User_Comments] WHERE CommentID IN (SELECT CommentID FROM [dbo].[Comments] WHERE DifficultyID = ${difficultyID});
        DELETE FROM [dbo].[Class_Comments] WHERE CommentID IN (SELECT CommentID FROM [dbo].[Comments] WHERE DifficultyID = ${difficultyID});

        DELETE FROM [dbo].[Class_Difficulty] WHERE DifficultyID = ${difficultyID};
        DELETE FROM [dbo].[User_Difficulty] WHERE DifficultyID = ${difficultyID};
        DELETE FROM [dbo].[Comments] WHERE DifficultyID = ${difficultyID};
        
        DELETE FROM [dbo].[Difficulty] WHERE DifficultyID = ${difficultyID};
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

