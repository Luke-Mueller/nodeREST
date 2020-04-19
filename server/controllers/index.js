const Art = require('../models/art');

exports.deleteArt = (req, res, next) => {
  const id = [req.params.id];
  const art = new Art();
  art.delete(id)
    .then(result => {
      res.status(200).json({ 
        message: `Art "${result.name}" deleted successfully` 
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getArt = (req, res, next) => {
  const art = new Art();
  art.getArt()
    .then(result => {
      res.status(200).json({
        message: 'Artwork retrieved successfully',
        payload: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postArt = (req, res, next) => {
  const data = JSON.parse(req.body.payload);
  const art = new Art(
    data.name,
    data.artist,
    data.description,
    data.width,
    data.height,
    data.date
  );
  art.create(art)
    .then(result => {
      res.status(201).json({
        message: 'Art created successfully',
        artObj: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      };
      next(err);
    })
};

exports.updateArt = (req, res, next) => {
  const data = JSON.parse(req.body.payload);
  const id = req.params.id;
  const art = new Art();
  art.update(id, data)
    .then(result => {
      res.status(200).json({ message: `Artwork "${result.name}" updated successfully` });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      };
      next(err);
    });
};
