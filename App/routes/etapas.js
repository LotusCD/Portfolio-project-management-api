const express = require('express');
const router = express.Router();
const Etapa = require('../models/Etapa');

// Get all etapas
router.get('/', async (req, res) => {
  try {
    const etapas = await Etapa.find();
    res.json(etapas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new etapa
router.post('/', async (req, res) => {
  const etapa = new Etapa({
    nombre: req.body.nombre
  });

  try {
    const newEtapa = await etapa.save();
    res.status(201).json(newEtapa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an etapa
router.put('/:id', async (req, res) => {
  try {
    const etapa = await Etapa.findById(req.params.id);
    if (!etapa) return res.status(404).json({ message: 'Etapa not found' });

    if (req.body.nombre) etapa.nombre = req.body.nombre;
    etapa.fecha_actualizacion = Date.now();

    const updatedEtapa = await etapa.save();
    res.json(updatedEtapa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an etapa
router.delete('/:id', async (req, res) => {
    try {
      const etapa = await Etapa.findById(req.params.id);
      if (!etapa) return res.status(404).json({ message: 'Etapa not found' });
  
      await Etapa.deleteOne({ _id: req.params.id });
      res.json({ message: 'Etapa deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;
