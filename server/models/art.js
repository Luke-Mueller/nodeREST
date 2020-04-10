const mkClient = require('../utils/connection');

class Art {
  constructor(name, artist, description, width, height, date) {
    this.name = name;
    this.artist = artist;
    this.description = description;
    this.width = width;
    this.height = height;
    this.date = date;
  };

  create(res) {
    const text = `
      INSERT INTO 
        art 
      VALUES(DEFAULT, $1, $2, $3, $4, $5, $6) 
      RETURNING *
    `;
    const values = [
      this.name,
      this.artist,
      this.description,
      this.width,
      this.height,
      this.date
    ];
    const client = mkClient()
    client.query(text, values)
      .then(result => {
        console.log("RESULT: ", result);
        const innerClient = mkClient()
        innerClient.query('SELECT * FROM art')
          .then(result => {
            data = result.rows;
            console.log(data)
            console.table(data);
            res.status(201).json({
              message: 'Artwork added successfully',
              payload: data
            })
          })
          .catch(err => console.log(err))
          .finally(() => client.end());
      })
      .catch(err => console.log(err))
      .finally(() => { client.end() });
  };

  read() {
    return {
      name: this.name,
      artist: this.artist,
      description: this.description,
      width: this.width,
      height: this.height,
      date: this.date
    }
  };
};

module.exports = Art;