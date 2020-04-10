const express = require('express');

const controller = require('../controllers/index');

const router = express.Router();

router.delete('/:id', controller.deleteArt)
router.post('/', controller.postArt)
router.get('/', controller.getArt)
router.put('/:id', controller.updateArt)

module.exports = router;