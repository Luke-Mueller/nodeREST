const Art = require('../models/art');

const mkClient = require('../utils/connection');

exports.deleteArt = (req, res) => {
  const id = [req.params.id];
  console.log('id: ', id)
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
      console.log("RESULT: ", result);
      const innerClient = mkClient()
      innerClient.query('SELECT * FROM art')
        .then(result => {
          data = result.rows;
          console.log(data)
          console.table(data);
          res.status(200).json({
            message:'Artwork deleted successfully',
            payload: data
          })
        })
        .catch(err => console.log(err))
        .finally(() => client.end());
    })
    .catch(err => console.log(err))
    .finally(() => { client.end() });
};

exports.getArt = (req, res) => {
  const text = 'SELECT * FROM art';
  const client = mkClient()
  client.query(text)
    .then(result => {
      data = result.rows;
      res.status(200).json({
        message: 'Artwork retrieved successfully',
        payload: data
      })
    })
    .catch(err => console.log(err))
    .finally(() => client.end());
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
  console.log(newArt.read());
};

exports.updateArt = (req, res) => {
  const data = JSON.parse(req.body.payload)
  console.log('DATA: ', data)
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
    .catch(err => console.log(err))
    .finally(() => client.end());
}
