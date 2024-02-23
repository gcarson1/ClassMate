import express from 'express';
import cors from 'cors';
import { getUniveristies } from './sqlconnect.js';

const app = express();
app.use(express.json());
app.use(cors());

 

app.get('/universities', async (req, res) => {
    let record = await getUniveristies();
    console.log(record);
    res.json(record);
});

app.listen(7071, () => {
    console.log('Server is running on port 7071');
})