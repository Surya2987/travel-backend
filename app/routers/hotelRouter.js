const express = require('express');
const hotelStayController = require('../controllers/hotelController');

const router = express.Router();

// Routes for hotel stays
router.get('/', hotelStayController.getAllHotelStays);
router.post('/', hotelStayController.createHotelStay);
router.get('/:id', hotelStayController.getHotelStayById);
router.put('/:id', hotelStayController.updateHotelStay);
router.delete('/:id', hotelStayController.deleteHotelStay);

module.exports = router;
