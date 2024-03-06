import express from 'express';
import cors from 'cors';
import {connect } from './sqlconnect.js';
import {getUniversities, getClassInfo} from './sqlquery.js'
import { addUniversity, addClassType, addComment, addClass, addDifficulty, addProfessor, addUser } from './sqladd.js';
import { deleteUniversity, deleteClassType, deleteComment, deleteClass, deleteDifficulty, deleteProfessor, deleteUser } from './sqldelete.js';

const app = express();
app.use(express.json());
app.use(cors());

let poolConnection = await connect();

app.get('/universities', async (req, res) => {
    let record = await getUniversities(poolConnection);
    res.json(record);
});

app.get('/classes/:classID', async (req, res) => {
    let record = await getClassInfo(poolConnection, req.params.classID, "University of Tennessee, Knoxville"); //The uniname is a placeholder for the university name
    res.json(record);
});

app.listen(7071, () => {
    console.log('Server is running on port 7071');
})
