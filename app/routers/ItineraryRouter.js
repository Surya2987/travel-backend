const express = require('express');
const itineraryController = require('../controllers/ItineraryController');

const router = express.Router();

// Get all itineraries
router.get('/', itineraryController.getAllItineraries);

// Get an itinerary by ID
router.get('/:id', itineraryController.getItineraryById);

// Create a new itinerary
router.post('/', itineraryController.createItinerary);

// Update an itinerary by ID
router.put('/:id', itineraryController.updateItinerary);

// Delete an itinerary by ID
router.delete('/:id', itineraryController.deleteItinerary);

// Get all latest itineraries
router.get('/special/latest', itineraryController.getAllLatestItineraries);

// Get all itineraries with bookings in descending order
router.get('/special/bookings', itineraryController.getAllItinerariesWithBookings);

// Get all itineraries with high rating
router.get('/special/high-rated', itineraryController.getAllHighRatedItineraries);

// Get itinerary plan for all days associated with an itinerary
router.get('/special/:id/plan', itineraryController.getItineraryPlan);

// Get the details of a day associated with an itinerary
router.get('/:itineraryId/days/:dayId', itineraryController.getDayDetails);

router.post('/addDay',itineraryController.addDay);


module.exports = router;
