const Art = require('../models/art');

const mkClient = require('../utils/connection');

exports.deleteArt = (req, res) => {
  const id = [req.params.id];
  const text = `
    DELETE FROM 
      art 
    WHERE 
      art.id = ($1) 
    RETURNING *
  `;
  const client = mkClient()
  client.query(text, id)
    .then(result => {
      res.status(200).json({ data: result.rows[0] });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
    .finally(() => client.end());
};

exports.getArt = (req, res) => {
  const text = 'SELECT * FROM art';
  const client = mkClient();
  client.query(text)
    .then(result => {
      data = result.rows;
      res.status(200).json({
        message: 'Artwork retrieved successfully',
        payload: data
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })    .finally(() => client.end());
};

exports.postArt = (req, res) => {
  const data = JSON.parse(req.body.payload);

  const name = data.name;
  const artist = data.artist;
  const description = data.description;
  const width = data.width;
  const height = data.height;
  const date = data.date;

  const newArt = new Art(name, artist, description, width, height, date);
  newArt.create(res);
};

exports.updateArt = (req, res) => {
  const data = JSON.parse(req.body.payload);
  const id = req.params.id;

  const name = data.name;
  const artist = data.artist;
  const description = data.description;
  const width = data.width;
  const height = data.height;
  const date = data.date;
  const text = `
    UPDATE 
      art 
    SET 
      name = ($1), 
      artist = ($2), 
      description = ($3), 
      width = ($4), 
      height = ($5),
      date = ($6)
    WHERE 
      art.id = ($7)
  `;
  const values = [
    name,
    artist,
    description,
    width,
    height,
    date,
    id
  ];

  const client = mkClient()
  client.query(text, values)
    .then(() => {
      res.status(200).json({ message: 'Artwork updated successfully' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })    .finally(() => client.end());
};
