//Contains all of the functions for adding data to the database

//! None of these functions have been tested yet; they are just placeholders for now

export async function addUser(poolConnection, username, password, email, uniID) {
    //TODO: Test function
    try {
        console.log("Adding user to database");
        let resultSet = await poolConnection.request().query(
            
            `
            -- Step 1: Determine the highest UserID currently in the table
            DECLARE @maxUserID INT;
            SELECT @maxUserID = MAX(UserID) FROM Users;

            -- Step 2: Increment the highest UserID by 1
            SET @maxUserID = ISNULL(@maxUserID, 0) + 1;

            -- Step 3: Insert the new user into the table
            INSERT INTO [dbo].[User] (UserID, Username, Password, Email, UniID) 
            VALUES ('@maxUserID, ${username}', '${password}', '${email}', '${uniID}');`
        );
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addUniversity(poolConnection, name) {
    //TODO: Test function
    try {
        console.log("Adding university to database");
        let resultSet = await poolConnection.request().query(
            `
            DECLARE @maxUniID INT;
            SELECT @maxUniID = MAX(UniID) FROM University;
            SET @maxUniID = ISNULL(@maxUniID, 0) + 1;

            INSERT INTO [dbo].[University] (UniID, UniName) 
            VALUES ('@maxUniID, ${name});`
        );
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addClass(poolConnection, name, universityID) {
    try {
        console.log("Adding class to database");
        let resultSet = await poolConnection.request().query(`INSERT INTO [dbo].[Course] (Name, UniversityID) VALUES ('${name}', '${universityID}')`);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addComment(poolConnection, userID, courseID, rating, review) {
    try {
        console.log("Adding comment to database");
        let resultSet = await poolConnection.request().query(`INSERT INTO [dbo].[Review] (UserID, CourseID, Rating, Review) VALUES ('${userID}', '${courseID}', '${rating}', '${review}')`);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addProfessor(poolConnection, name, universityID) {
    //TODO: Test function
    try {
        console.log("Adding professor to database");
        let resultSet = await poolConnection.request().query(
            `
            DECLARE @maxID INT;
            SELECT @maxID = MAX(ProfessorID) FROM Professors;
            SET @maxID = ISNULL(@maxID, 0) + 1;

            INSERT INTO [dbo].[Professors] (ProfessorID, Name, UniID) 
            VALUES ('@maxID, ${name}, ${universityID});`
        );
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addClassType(poolConnection, name, universityID) {
    //TODO: Test function
    try {
        console.log("Adding class type to database");
        let resultSet = await poolConnection.request().query(
            `
            DECLARE @maxID INT;
            SELECT @maxID = MAX(ClassTypeID) FROM ClassType;
            SET @maxID = ISNULL(@maxID, 0) + 1;

            INSERT INTO [dbo].[ClassType] (ClassTypeID, ClassType, UniID) 
            VALUES ('@maxID, ${name}, ${universityID});`
        );
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addDifficulty(poolConnection, name) {
    try {
        console.log("Adding Difficulty to database");
        let resultSet = await poolConnection.request().query(`INSERT INTO [dbo].[CourseType] (Name) VALUES ('${name}')`);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

