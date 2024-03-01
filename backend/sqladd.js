//Contains all of the functions for adding data to the database

//! None of these functions have been tested yet; they are just placeholders for now

export async function addUser(poolConnection, username, password, email, uniID) {
    //TODO: Test function
    try {
        console.log("Adding user to database");
        let resultSet = await poolConnection.request().query(
            
            `
            -- Begin a transaction to ensure atomicity
            BEGIN TRANSACTION;

            -- Step 1: Determine the highest UserID currently in the table
            DECLARE @maxUserID INT;
            SELECT @maxUserID = MAX(UserID) FROM Users;

            -- Step 2: Increment the highest UserID by 1
            SET @maxUserID = ISNULL(@maxUserID, 0) + 1;

            -- Step 3: Insert the new user into the table
            INSERT INTO [dbo].[User] (UserID, Username, Password, Email, UniID) 
            VALUES (@maxUserID, '${username}', '${password}', '${email}', ${uniID});`
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
            -- Begin a transaction to ensure atomicity
            BEGIN TRANSACTION;

            DECLARE @maxUniID INT;
            SELECT @maxUniID = MAX(UniID) FROM University;
            SET @maxUniID = ISNULL(@maxUniID, 0) + 1;

            INSERT INTO [dbo].[University] (UniID, UniName) 
            VALUES (@maxUniID, '${name}');
            `
        );
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addClass(poolConnection, className, classNum, classTypeID) {
    //TODO: Test function
    try {
        console.log("Adding class to database");
        let resultSet = await poolConnection.request().query(`
        -- Begin a transaction to ensure atomicity
        BEGIN TRANSACTION;

        DECLARE @maxID INT;
        SELECT @maxID = MAX(ClassID) FROM Class;
        SET @maxID = ISNULL(@maxID, 0) + 1;

        INSERT INTO [dbo].[Class] (ClassID, ClassName, ClassNum, ClassTypeID) 
        VALUES (@maxID, '${className}', ${classNum}, ${classTypeID});)
        
        -- Junction table ClassType_Class

        INSERT INTO [dbo].[ClassType_Class] (ClassTypeID, ClassID)
        VALUES (${classTypeID}, @maxID);
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addComment(poolConnection, userID, comment, termTaken, grade, classID, difficultyValue, qualityValue, professorID) {
    try {
        console.log("Adding comment to database");
        let resultSet = await poolConnection.request().query(`
        -- Begin a transaction to ensure atomicity
        BEGIN TRANSACTION;

        -- Adding the new difficulty first
        DECLARE @maxID INT;
        SELECT @maxID = MAX(DifficultyID) FROM Difficulty;
        SET @maxID = ISNULL(@maxID, 0) + 1;

        INSERT INTO [dbo].[Difficulty] (DifficultyID, DifficultyValue, ProfessorID, UserID, ClassID, QualityValue) 
        VALUES (@maxID, ${difficultyValue}, ${professorID}, ${userID}, ${classID}, ${qualityValue});

        -- Junction table Class_Professor

        INSERT INTO [dbo].[Class_Professor] (ClassID, ProfessorID)
        VALUES (${classID}, ${professorID});

        -- Junction table User_Difficulty

        INSERT INTO [dbo].[User_Difficulty] (UserID, DifficultyID)
        VALUES (${userID}, @maxID);

        -- Junction table Class_Difficulty

        INSERT INTO [dbo].[Class_Difficulty] (ClassID, DifficultyID)
        VALUES (${classID}, @maxID);

        -- Now adding the comment

        DECLARE @maxCID INT;
        SELECT @maxCID = MAX(CommentID) FROM Comments;
        SET @maxCID = ISNULL(@maxID, 0) + 1;

        INSERT INTO [dbo].[Comments] (Comment, TermTaken, Grade, CommentID, UserID, ClassID, DifficultyID, PostDate) 
        VALUES ('${comment}', '${termTaken}', '${grade}', @maxCID, ${userID}, ${classID}, @maxID, CURRENT_TIMESTAMP);

        `);
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
            -- Begin a transaction to ensure atomicity
            BEGIN TRANSACTION;

            DECLARE @maxID INT;
            SELECT @maxID = MAX(ProfessorID) FROM Professors;
            SET @maxID = ISNULL(@maxID, 0) + 1;

            INSERT INTO [dbo].[Professors] (ProfessorID, Name, UniID) 
            VALUES (@maxID, '${name}', ${universityID});`
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
            -- Begin a transaction to ensure atomicity
            BEGIN TRANSACTION;

            DECLARE @maxID INT;
            SELECT @maxID = MAX(ClassTypeID) FROM ClassType;
            SET @maxID = ISNULL(@maxID, 0) + 1;

            INSERT INTO [dbo].[ClassType] (ClassTypeID, ClassType, UniID) 
            VALUES (@maxID, '${name}', ${universityID});`
        );
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addDifficulty(poolConnection, difficultyValue, qualityValue, userID, classID, professorID) {
    //TODO: Test function
    try {
        console.log("Adding Difficulty to database");
        let resultSet = await poolConnection.request().query(`
        -- Begin a transaction to ensure atomicity
        BEGIN TRANSACTION;
        
        DECLARE @maxID INT;
        SELECT @maxID = MAX(DifficultyID) FROM Difficulty;
        SET @maxID = ISNULL(@maxID, 0) + 1;

        INSERT INTO [dbo].[Difficulty] (DifficultyID, DifficultyValue, ProfessorID, UserID, ClassID, QualityValue) 
        VALUES (@maxID, ${difficultyValue}, ${professorID}, ${userID}, ${classID}, ${qualityValue});

        -- Junction table Class_Professor

        INSERT INTO [dbo].[Class_Professor] (ClassID, ProfessorID)
        VALUES (${classID}, ${professorID});

        -- Junction table User_Difficulty

        INSERT INTO [dbo].[User_Difficulty] (UserID, DifficultyID)
        VALUES (${userID}, @maxID);

        -- Junction table Class_Difficulty

        INSERT INTO [dbo].[Class_Difficulty] (ClassID, DifficultyID)
        VALUES (${classID}, @maxID);

        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

