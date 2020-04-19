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

  create(art) {
    const text = `
      INSERT INTO art 
        VALUES(DEFAULT, $1, $2, $3, $4, $5, $6) 
        RETURNING *
    `;
    const values = [
      art.name,
      art.artist,
      art.description,
      art.width,
      art.height,
      art.date
    ];

    const client = mkClient()
    return client.query(text, values)
      .then(result => result.rows[0])
      .catch(err => console.log(err))
      .finally(() => client.end());
  };

  delete(id) {
    const text = `
      DELETE FROM art 
        WHERE art.id = ($1) 
        RETURNING *
    `;
    const client = mkClient()
    return client.query(text, id)
      .then(result => result.rows[0])
      .catch(err => console.log(err))
      .finally(() => client.end());
  };

  getArt() {
    const text = 'SELECT * FROM art';
    const client = mkClient();
    return client.query(text)
      .then(result => result.rows)
      .catch(err => console.log(err))
      .finally(() => client.end());
  };

  // getById() {};

  update(id, data) {
    const text = `
      UPDATE art 
        SET name = ($1), 
            description = ($2) 
        WHERE art.id = ($3)
        RETURNING *
    `;
    const values = [
      data.name,
      data.description,
      id
    ];

    const client = mkClient()
    return client.query(text, values)
      .then(result => result.rows[0])
      .catch(err => console.log('ERR', err))
      .finally(() => client.end());
  };
};

module.exports = Art;