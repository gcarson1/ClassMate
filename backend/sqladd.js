//Contains all of the functions for adding data to the database
// Each function takes in a poolConnection and the necessary parameters for the data to be added and returns the resulting recordset, which is the data that was added to the database

export async function addUser(poolConnection, username, email, uniID) {
    try {
        console.log("Adding user " + username + " to database");
        let resultSet = await poolConnection.request().query(`
            -- Begin a transaction to ensure atomicity
            BEGIN TRANSACTION;
            
            -- Step 1: Determine the highest UserID currently in the table
            DECLARE @maxUserID INT;
            SELECT @maxUserID = MAX(UserID) FROM Users;
            
            -- Step 2: Increment the highest UserID by 1
            SET @maxUserID = ISNULL(@maxUserID, 0) + 1;
            
            -- Step 3: Insert the new user into the table
            INSERT INTO [dbo].[Users] (UserID, Username, Password, Email, UniID) 
            VALUES (@maxUserID, '${username}', '${email}', ${uniID});
            
            -- Step 4: Commit the transaction
            COMMIT;
            
            -- Step 5: Select the details of the new user
            SELECT * FROM Users WHERE UserID = @maxUserID;
            `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addUniversity(poolConnection, name) {
    try {
        console.log("Adding university " + name + " to database");
        let resultSet = await poolConnection.request().query(
            `
            -- Begin a transaction to ensure atomicity
            BEGIN TRANSACTION;

            DECLARE @maxUniID INT;
            SELECT @maxUniID = MAX(UniID) FROM University;
            SET @maxUniID = ISNULL(@maxUniID, 0) + 1;

            INSERT INTO [dbo].[University] (UniID, UniName) 
            VALUES (@maxUniID, '${name}');

            COMMIT;

            SELECT * FROM University WHERE UniID = @maxUniID;
            `
        );
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addClass(poolConnection, className, classNum, classTypeID) {
    try {
        console.log("Adding class " + className + " to database");
        let resultSet = await poolConnection.request().query(`
        -- Begin a transaction to ensure atomicity
        BEGIN TRANSACTION;

        DECLARE @maxID INT;
        SELECT @maxID = MAX(ClassID) FROM Class;
        SET @maxID = ISNULL(@maxID, 0) + 1;

        INSERT INTO [dbo].[Class] (ClassID, ClassName, ClassNum, ClassTypeID) 
        VALUES (@maxID, '${className}', ${classNum}, ${classTypeID});

        COMMIT;

        SELECT * FROM Class WHERE ClassID = @maxID;
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

//Note that a Comment AUTOMATICALLY adds a Difficulty, so we don't need to add a Difficulty separately
//When a user wants to vote on difficulty, they will be adding a Difficulty. They can also add a comment, but they do not have to. Each user is entitled
//to either one difficulty or one difficulty and one comment per class, but not more than one. In the front end, I would imagine this working like voting 
//and adding a comment if they so desire
export async function addComment(poolConnection, userID, comment, termTaken, grade, classID, difficultyValue, qualityValue, professorID) {
    try {
        console.log("Adding comment: '"  + comment + "' to database");
        let resultSet = await poolConnection.request().query(`
        -- Begin a transaction to ensure atomicity
        BEGIN TRANSACTION;

        -- Adding the new difficulty first
        DECLARE @maxID INT;
        SELECT @maxID = MAX(DifficultyID) FROM Difficulty;
        SET @maxID = ISNULL(@maxID, 0) + 1;

        INSERT INTO [dbo].[Difficulty] (DifficultyID, DifficultyValue, ProfessorID, UserID, ClassID, QualityValue) 
        VALUES (@maxID, ${difficultyValue}, ${professorID}, ${userID}, ${classID}, ${qualityValue});

        -- Junction table Class_Professors (if needed)

        MERGE INTO [dbo].[Class_Professors] AS target
        USING (VALUES (${classID}, ${professorID})) AS source (ClassID, ProfessorID)
        ON (target.ClassID = source.ClassID AND target.ProfessorID = source.ProfessorID)
        WHEN NOT MATCHED THEN
            INSERT (ClassID, ProfessorID)
            VALUES (source.ClassID, source.ProfessorID);

        -- Now adding the comment
        DECLARE @maxCID INT;
        SELECT @maxCID = MAX(CommentID) FROM Comments;
        SET @maxCID = ISNULL(@maxCID, 0) + 1;

        INSERT INTO [dbo].[Comments] (Comment, TermTaken, Grade, CommentID, UserID, ClassID, DifficultyID, PostDate) 
        VALUES ('${comment}', '${termTaken}', '${grade}', @maxCID, ${userID}, ${classID}, @maxID, CURRENT_TIMESTAMP);

        -- Commit the transaction
        COMMIT;

        -- Select the details of the newly added comment
        SELECT * FROM Comments WHERE CommentID = @maxCID;
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addProfessor(poolConnection, name, universityID) {
    try {
        console.log("Adding professor " + name + " to database");
        let resultSet = await poolConnection.request().query(
            `
            -- Begin a transaction to ensure atomicity
            BEGIN TRANSACTION;

            DECLARE @maxID INT;
            SELECT @maxID = MAX(ProfessorID) FROM Professors;
            SET @maxID = ISNULL(@maxID, 0) + 1;

            INSERT INTO [dbo].[Professors] (ProfessorID, Name, UniID) 
            VALUES (@maxID, '${name}', ${universityID});
        
            COMMIT;

            SELECT * FROM Professors WHERE ProfessorID = @maxID;
            `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addClassType(poolConnection, name, universityID) {
    try {
        console.log("Adding class type " + name + " to database");
        let resultSet = await poolConnection.request().query(
            `
            -- Begin a transaction to ensure atomicity
            BEGIN TRANSACTION;

            DECLARE @maxID INT;
            SELECT @maxID = MAX(ClassTypeID) FROM ClassType;
            SET @maxID = ISNULL(@maxID, 0) + 1;

            INSERT INTO [dbo].[ClassType] (ClassTypeID, ClassType, UniID) 
            VALUES (@maxID, '${name}', ${universityID});
        
            COMMIT;

            SELECT * FROM ClassType WHERE ClassTypeID = @maxID;
            `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function addDifficulty(poolConnection, difficultyValue, qualityValue, userID, classID, professorID) {
    try {
        console.log("Adding Difficulty of " + difficultyValue + " and quality " + qualityValue + " to database");
        let resultSet = await poolConnection.request().query(`
        -- Begin a transaction to ensure atomicity
        BEGIN TRANSACTION;

        DECLARE @maxID INT;
        SELECT @maxID = MAX(DifficultyID) FROM Difficulty;
        SET @maxID = ISNULL(@maxID, 0) + 1;

        -- Adding a new difficulty
        INSERT INTO [dbo].[Difficulty] (DifficultyID, DifficultyValue, ProfessorID, UserID, ClassID, QualityValue) 
        VALUES (@maxID, ${difficultyValue}, ${professorID}, ${userID}, ${classID}, ${qualityValue});

        -- Junction table Class_Professors (if needed)
        MERGE INTO [dbo].[Class_Professors] AS target
        USING (VALUES (${classID}, ${professorID})) AS source (ClassID, ProfessorID)
        ON (target.ClassID = source.ClassID AND target.ProfessorID = source.ProfessorID)
        WHEN NOT MATCHED THEN
            INSERT (ClassID, ProfessorID)
            VALUES (source.ClassID, source.ProfessorID);

        -- Commit the transaction
        COMMIT;

        -- Select the details of the newly added difficulty
        SELECT * FROM Difficulty WHERE DifficultyID = @maxID;
        `);
        return resultSet.recordset;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

