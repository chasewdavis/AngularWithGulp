require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const massive = require('massive');

const app = express();
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../dist`))

const CONNECTION_STRING = process.env.CONNECTION_STRING;
massive(CONNECTION_STRING).then(db => app.set('db', db))

app.get('/api/getScores', (req,res) => {
    const db = req.app.get('db')
    db.get_scores()
    .then(scores => res.status(200).send(scores));
})

app.post('/api/postScore', (req,res) => {
    const db = req.app.get('db')
    
    db.post_score(req.body.username, req.body.score, req.body.category)
    .then( res => console.log('res from postscore', res));

    res.sendStatus(200);
})

const PORT = 8088;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));