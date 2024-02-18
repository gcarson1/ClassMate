import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

app.listen(7071, () => {
    console.log('Server is running on port 7071');
});