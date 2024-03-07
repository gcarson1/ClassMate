import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import {connect, closeConnection, reopenConnection} from './sqlconnect.js';
import {getUniversities, getClassInfo} from './sqlquery.js'
import { addUniversity, addClassType, addComment, addClass, addDifficulty, addProfessor, addUser } from './sqladd.js';
import { deleteUniversity, deleteClassType, deleteComment, deleteClass, deleteDifficulty, deleteProfessor, deleteUser } from './sqldelete.js';

const app = express();
app.use(express.json());
app.use(cors());

let poolConnection = await connect();
let lastActivity = Date.now();
const inactivityTime = 60 * 1000 * 10; // 10 minutes

// Schedule cron job to close connection after 10 minutes of inactivity
cron.schedule('*/10 * * * *', () => {
    console.log('Checking for inactivity ' + (Date.now() - lastActivity) / 1000);
    if ((Date.now() - lastActivity) >= inactivityTime) {
        console.log('True')
        closeConnection(poolConnection);
        console.log('Connection closed due to inactivity');
    }
});

// Gets universities from the database
app.get('/universities', async (req, res) => {
    reopenConnection(poolConnection);
    lastActivity = Date.now();
    let record = await getUniversities(poolConnection);
    res.json(record);
});

// Gets all class info and comments for a specific class at a specific university
app.get('/uni:uniID/class:classID', async (req, res) => {
    reopenConnection(poolConnection);
    lastActivity = Date.now();
    let record = await getClassInfo(poolConnection, req.params.classID, req.params.uniID); //The uniname is a placeholder for the university name
    res.json(record);
});

app.listen(7071, () => {
    console.log('Server is running on port 7071');
});


app.get('/activity', async (req, res) => {
    res.json({'Time inactive (minutes)': ((Date.now() - lastActivity) / 1000 / 60).toFixed(3)});
});