// Code used for testing the add and delete functions in the database

// await deleteUniversity(poolConnection, 5);

// let uni = await addUniversity(poolConnection, "University of California");
// let classType = await addClassType(poolConnection, "CSC", uni[0].UniID);
// let tmpClass = await addClass(poolConnection, "Intro", 101, classType[0].ClassTypeID);
// let prof = await addProfessor(poolConnection, "John Doe", uni[0].UniID);
// let user = await addUser(poolConnection, "John Doe", "password", "johndoe@gmail.com", uni[0].UniID);
// let diff = await addDifficulty(poolConnection, 5, 5, user[0].UserID, tmpClass[0].ClassID, prof[0].ProfessorID);
// let user2 = await addUser(poolConnection, "Jane Doe", "password", "jane@gmail.com", uni[0].UniID);
// let comment = await addComment(poolConnection, user2[0].UserID, "This class is hard", "Fall 2024", "C+", tmpClass[0].ClassID, 4,3, prof[0].ProfessorID);

// console.log(
//     uni,
//     classType,
//     tmpClass,
//     prof,
//     user,
//     user2,
//     diff,
//     comment
// );

// await deleteComment(poolConnection, comment[0].CommentID);
// await deleteDifficulty(poolConnection, diff[0].DifficultyID);
// await deleteClass(poolConnection, tmpClass[0].ClassID);
// await deleteProfessor(poolConnection, prof[0].ProfessorID);
// await deleteUser(poolConnection, user[0].UserID);
// await deleteClassType(poolConnection, classType[0].ClassTypeID);
// await deleteUniversity(poolConnection, 5);