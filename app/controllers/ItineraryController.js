const { Op } = require('sequelize');
const Itinerary = require('../models/Itinerary');
const Day = require('../models/day');
const OrderHistory = require('../models/orderHistory');
const Event = require('../models/event');
const HotelStay = require('../models/hotelStay');
const SightSeeing = require('../models/sightseeing');
const { sequelize } = require('../models/Itinerary');


// Get all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const { origin, destination, starts, ends } = req.query;

    const check = {
      [Op.and]: [],
    };
    if (origin) {
      check[Op.and].push({ origin: { [Op.like]: `%${origin}%` } });
    }
    if (destination) {
      check[Op.and].push({ destination: { [Op.like]: `%${destination}%` } });
    }
    if (starts) {
      check[Op.and].push({ start_date: sequelize.where(sequelize.fn('DATE', sequelize.col('start_date')), starts) });
    }
    if (ends) {
      check[Op.and].push({ end_date: sequelize.where(sequelize.fn('DATE', sequelize.col('end_date')), ends) });
    }
    const itineraries = await Itinerary.findAll({ where: check });
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
    const itinerary = await Itinerary.findByPk(id,{ include: [{ model: Day, as: 'Days' }] });
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
  const { title, description, costPerPerson, rating,imageUrl,start_date,end_date,origin,destination } = req.body;
  try {
    const itinerary = await Itinerary.create({
      title,
      description,
      costPerPerson,
      rating,
      imageUrl,
      start_date,
      end_date,
      origin,
      destination
    });
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an itinerary by ID
exports.updateItinerary = async (req, res) => {
  const { id } = req.params;
  const { title, description, costPerPerson, rating,imageUrl,start_date,end_date,origin,destination } = req.body;
  try {
    const itinerary = await Itinerary.findByPk(id);
    if (itinerary) {
      await itinerary.update({
        title,
        description,
        costPerPerson,
        rating,
        imageUrl,
        start_date,
        end_date,
        origin,
        destination
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
    const day = await Day.findOne({
      where: { id: dayId, ItineraryId: itineraryId },
      include: [Event, HotelStay, SightSeeing],
    });

    if (day) {
      res.status(200).json(day);
    } else {
      res.status(404).json({ error: 'Day not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new day
exports.addDay = async (req, res) => {
  try {
    const day = await Day.create(req.body);
    res.status(201).json(day);
  } catch (error) {
    res.status(500).json({ error: error || 'Internal server error' });
  }
};

