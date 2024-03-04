import express from 'express';
import cors from 'cors';
import { getUniversities, connect } from './sqlconnect.js';
import { addUniversity, addClassType, addComment, addClass, addDifficulty, addProfessor, addUser } from './sqladd.js';
import { deleteUniversity, deleteClassType, deleteComment, deleteClass, deleteDifficulty, deleteProfessor, deleteUser } from './sqldelete.js';

const app = express();
app.use(express.json());
app.use(cors());

let poolConnection = await connect();

await deleteUniversity(poolConnection, 5);

let uni = await addUniversity(poolConnection, "University of California");
let classType = await addClassType(poolConnection, "CSC", uni[0].UniID);
let tmpClass = await addClass(poolConnection, "Intro", 101, classType[0].ClassTypeID);
let prof = await addProfessor(poolConnection, "John Doe", uni[0].UniID);
let user = await addUser(poolConnection, "John Doe", "password", "johndoe@gmail.com", uni[0].UniID);
let diff = await addDifficulty(poolConnection, 5, 5, user[0].UserID, tmpClass[0].ClassID, prof[0].ProfessorID);
let comment = await addComment(poolConnection, user[0].UserID, "This class is hard", "Fall 2024", "C+", tmpClass[0].ClassID, 4,3, prof[0].ProfessorID);

console.log(
    uni,
    classType,
    tmpClass,
    prof,
    user,
    diff,
    comment
);

await deleteUniversity(poolConnection, uni[0].UniID);

//await deleteUniversity(poolConnection, 5);

app.get('/universities', async (req, res) => {
    let record = await getUniversities(poolConnection);
    console.log(record);
    res.json(record);
});

app.listen(7071, () => {
    console.log('Server is running on port 7071');
})
