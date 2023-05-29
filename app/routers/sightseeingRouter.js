const express = require('express');
const sightseeingController = require('../controllers/sightseeingController');

const router = express.Router();

// Routes for sightseeing
router.get('/', sightseeingController.getAllSightseeings);
router.post('/', sightseeingController.createSightseeing);
router.get('/:id', sightseeingController.getSightseeingById);
router.put('/:id', sightseeingController.updateSightseeing);
router.delete('/:id', sightseeingController.deleteSightseeing);

module.exports = router;
