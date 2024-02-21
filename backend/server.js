import express from 'express';
import cors from 'cors';
import testQuery from './sqlconnect.js';

const app = express();
app.use(cors());

let record = await testQuery(); // Fixes race condition - otherwise leads to an empty promise


app.get('/', (req, res) => {
    res.json(record);
});

app.listen(7071, () => {
    console.log('Server is running on port 7071');
});