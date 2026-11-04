import express from "express";
import router from './src/api/index.js';

const app = express();
const host = '127.0.0.1';
const port = 3000;

app.use('/public', express.static('public'));
app.use('/api/v1', router);

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
})