import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import qrRouter from './qr.js';
import pairRouter from './pair.js';

const app = express();


app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

import('events').then(events => {
    events.EventEmitter.defaultMaxListeners = 500;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));


app.use('/qr', qrRouter);
app.use('/code', pairRouter);


app.use('/pair', (req, res) => {
    res.sendFile(path.join(__dirname, 'pair.html'));
});
app.use('/qrpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'qr.html'));
});
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.listen(PORT, () => {
    console.log(`YouTube: @vendroz-tech\nGitHub: @vendroz-tech\nServer running on http://localhost:${PORT}`);
});

export default app;
