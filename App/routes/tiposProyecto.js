const express = require('express');
const router = express.Router();
const TipoProyecto = require('../models/TipoProyecto');

// Get all tipos de proyecto
router.get('/', async (req, res) => {
  try {
    const tiposProyecto = await TipoProyecto.find();
    res.json(tiposProyecto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new tipo de proyecto
router.post('/', async (req, res) => {
  const tipoProyecto = new TipoProyecto({
    nombre: req.body.nombre
  });

  try {
    const newTipoProyecto = await tipoProyecto.save();
    res.status(201).json(newTipoProyecto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a tipo de proyecto
router.put('/:id', async (req, res) => {
  try {
    const tipoProyecto = await TipoProyecto.findById(req.params.id);
    if (!tipoProyecto) return res.status(404).json({ message: 'Tipo de proyecto not found' });

    if (req.body.nombre) tipoProyecto.nombre = req.body.nombre;
    tipoProyecto.fecha_actualizacion = Date.now();

    const updatedTipoProyecto = await tipoProyecto.save();
    res.json(updatedTipoProyecto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a tipo de proyecto
router.delete('/:id', async (req, res) => {
    try {
      const tipoProyecto = await TipoProyecto.findById(req.params.id);
      if (!tipoProyecto) return res.status(404).json({ message: 'Tipo de proyecto not found' });
  
      await TipoProyecto.deleteOne({ _id: req.params.id });
      res.json({ message: 'Tipo de proyecto deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
