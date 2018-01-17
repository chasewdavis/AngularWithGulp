require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const massive = require('massive');

const app = express();
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../dist`))

const PORT = 8088;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));