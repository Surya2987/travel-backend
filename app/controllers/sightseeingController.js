const Sightseeing = require('../models/sightseeing');

// Controller actions for sightseeing
exports.getAllSightseeings = async (req, res) => {
  try {
    const sightseeings = await Sightseeing.findAll();
    res.json(sightseeings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createSightseeing = async (req, res) => {
  const { name, description, imageUrl } = req.body;

  try {
    const sightseeing = await Sightseeing.create({ name, description, imageUrl });
    res.status(201).json(sightseeing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSightseeingById = async (req, res) => {
  const sightseeingId = req.params.id;

  try {
    const sightseeing = await Sightseeing.findByPk(sightseeingId);
    if (!sightseeing) {
      return res.status(404).json({ message: 'Sightseeing not found' });
    }
    res.json(sightseeing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateSightseeing = async (req, res) => {
  const {id} = req.params;
  const { name, description, imageUrl } = req.body;

  try {
    const sightseeing = await Sightseeing.findByPk(id);
    if (!sightseeing) {
      return res.status(404).json({ message: 'Sightseeing not found' });
    }

    sightseeing.name = name;
    sightseeing.description = description;
    sightseeing.imageUrl = imageUrl;
    await sightseeing.save();

    res.json(sightseeing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteSightseeing = async (req, res) => {
  const {id} = req.params;

  try {
    const sightseeing = await Sightseeing.findByPk(id);
    if (!sightseeing) {
      return res.status(404).json({ message: 'Sightseeing not found' });
    }

    await sightseeing.destroy();
    return res.status(200).json({ message: 'Sightseeing is Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
