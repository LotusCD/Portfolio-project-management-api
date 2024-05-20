const express = require('express');
const router = express.Router();
const Universidad = require('../models/Universidad');

// Get all universidades
router.get('/', async (req, res) => {
  try {
    const universidades = await Universidad.find();
    res.json(universidades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new universidad
router.post('/', async (req, res) => {
  const universidad = new Universidad({
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono
  });

  try {
    const newUniversidad = await universidad.save();
    res.status(201).json(newUniversidad);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a universidad
router.put('/:id', async (req, res) => {
  try {
    const universidad = await Universidad.findById(req.params.id);
    if (!universidad) return res.status(404).json({ message: 'Universidad not found' });

    if (req.body.nombre) universidad.nombre = req.body.nombre;
    if (req.body.direccion) universidad.direccion = req.body.direccion;
    if (req.body.telefono) universidad.telefono = req.body.telefono;
    universidad.fecha_actualizacion = Date.now();

    const updatedUniversidad = await universidad.save();
    res.json(updatedUniversidad);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a universidad
router.delete('/:id', async (req, res) => {
    try {
      const universidad = await Universidad.findById(req.params.id);
      if (!universidad) return res.status(404).json({ message: 'Universidad not found' });
  
      await Universidad.deleteOne({ _id: req.params.id });
      res.json({ message: 'Universidad deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
