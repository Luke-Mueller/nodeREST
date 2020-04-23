const Art = require('../models/art');

exports.deleteArt = (req, res, next) => {
  const id = [req.params.id];
  const art = new Art();
  art.delete(id)
    .then(result => {
      res.status(200).json({ 
        message: `${result.name} deleted successfully` 
      });
    })
    .catch(err => next(err));
};

exports.getArt = (req, res, next) => {
  const art = new Art();
  art.get()
    .then(result => {
      res.status(200).json({
        message: 'Art retrieved successfully',
        payload: result
      });
    })
    .catch(err => next(err));
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
        payload: result
      });
    })
    .catch(err => next(err));
};

exports.updateArt = (req, res, next) => {
  const data = JSON.parse(req.body.payload);
  const id = req.params.id;
  const art = new Art();
  art.update(id, data)
    .then(result => {
      res.status(200).json({ message: `${result.name} updated successfully` });
    })
    .catch(err => next(err));
};
