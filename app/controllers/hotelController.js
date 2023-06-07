const HotelStay = require('../models/hotelStay');

// Controller actions for hotel stays
exports.getAllHotelStays = async (req, res) => {
  try {
    const hotelStays = await HotelStay.findAll();
    res.json(hotelStays);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createHotelStay = async (req, res) => {
  const { name, description, imageUrl } = req.body;

  try {
    const hotelStay = await HotelStay.create({ name, description, imageUrl });
    res.status(201).json(hotelStay);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getHotelStayById = async (req, res) => {
  const hotelStayId = req.params.id;

  try {
    const hotelStay = await HotelStay.findByPk(hotelStayId);
    if (!hotelStay) {
      return res.status(404).json({ message: 'Hotel stay not found' });
    }
    res.json(hotelStay);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateHotelStay = async (req, res) => {
  const hotelStayId = req.params.id;
  const { name, description, imageUrl } = req.body;

  try {
    const hotelStay = await HotelStay.findByPk(hotelStayId);
    if (!hotelStay) {
      return res.status(404).json({ message: 'Hotel stay not found' });
    }

    hotelStay.name = name;
    hotelStay.description = description;
    hotelStay.imageUrl = imageUrl;
    await hotelStay.save();

    res.json(hotelStay);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteHotelStay = async (req, res) => {
  const hotelStayId = req.params.id;

  try {
    const hotelStay = await HotelStay.findByPk(hotelStayId);
    if (!hotelStay) {
      return res.status(404).json({ message: 'Hotel stay not found' });
    }

    await hotelStay.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
