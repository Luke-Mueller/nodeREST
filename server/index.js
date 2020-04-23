const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mkClient = require('./utils/connection');
const Routes = require('./routes/index');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const createTableText = `
  CREATE TABLE IF NOT EXISTS art (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    artist VARCHAR,
    description TEXT,
    width NUMERIC,
    height NUMERIC,
    date Date 
  );
`
const client = mkClient();
client.query(createTableText)
  .catch(err => console.log(err))
  .finally(() => client.end());

app.use('/app', Routes);
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
