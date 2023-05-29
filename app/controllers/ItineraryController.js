const { Op } = require('sequelize');
const Itinerary = require('../models/Itinerary');
const Day = require('../models/day');
const OrderHistory = require('../models/orderHistory');
const Event = require('../models/event');
const HotelStay = require('../models/hotelStay');
const SightSeeing = require('../models/sightseeing');


// Get all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.findAll();
    res.status(200).json(itineraries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get an itinerary by ID
exports.getItineraryById = async (req, res) => {
  const { id } = req.params;
  try {
    const itinerary = await Itinerary.findByPk(id);
    if (itinerary) {
      res.status(200).json(itinerary);
    } else {
      res.status(404).json({ error: 'Itinerary not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new itinerary
exports.createItinerary = async (req, res) => {
  const { title, description, maxCapacity, costPerPerson, rating } = req.body;
  try {
    const itinerary = await Itinerary.create({
      title,
      description,
      maxCapacity,
      costPerPerson,
      rating,
    });
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an itinerary by ID
exports.updateItinerary = async (req, res) => {
  const { id } = req.params;
  const { title, description, maxCapacity, costPerPerson, rating } = req.body;
  try {
    const itinerary = await Itinerary.findByPk(id);
    if (itinerary) {
      await itinerary.update({
        title,
        description,
        maxCapacity,
        costPerPerson,
        rating,
      });
      res.status(200).json(itinerary);
    } else {
      res.status(404).json({ error: 'Itinerary not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an itinerary by ID
exports.deleteItinerary = async (req, res) => {
  const { id } = req.params;
  try {
    const itinerary = await Itinerary.findByPk(id);
    if (itinerary) {
      await itinerary.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Itinerary not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all latest itineraries
exports.getAllLatestItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.findAll({
      order: [['createdAt', 'DESC']],
      include: [Day],
    });
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all itineraries with bookings in descending order
exports.getAllItinerariesWithBookings = async (req, res) => {
  try {
    const itineraries = await Itinerary.findAll({
      order: [['bookingsMade', 'DESC']],
      include: [OrderHistory],
    });
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all itineraries with high rating
exports.getAllHighRatedItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.findAll({
      where: { rating: { [Op.gte]: 4.5 } },
      order: [['rating', 'DESC']],
    });
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get itinerary plan for all days associated with an itinerary
exports.getItineraryPlan = async (req, res) => {
  const { id } = req.params;
  try {
    const itinerary = await Itinerary.findByPk(id, { include: [Day] });
    if (itinerary) {
      res.status(200).json(itinerary);
    } else {
      res.status(404).json({ error: 'Itinerary not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get the details of a day associated with an itinerary
exports.getDayDetails = async (req, res) => {
  const { itineraryId, dayId } = req.params;
  try {
    const itinerary = await Itinerary.findByPk(itineraryId, {
      include: [
        {
          model: Day,
          where: { id: dayId },
          include: [Event, HotelStay, SightSeeing],
        },
      ],
    });
    if (itinerary) {
      res.status(200).json(itinerary);
    } else {
      res.status(404).json({ error: 'Itinerary not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
