const express = require('express');
const router = express.Router();
const Proyecto = require('../models/Proyecto');

// Get all proyectos with populated fields
router.get('/', async (req, res) => {
  try {
    const proyectos = await Proyecto.find()
      .populate('cliente')
      .populate('tipo_proyecto')
      .populate('universidad')
      .populate('etapa');
    res.json(proyectos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new proyecto
router.post('/', async (req, res) => {
  const proyecto = new Proyecto({
    numero: req.body.numero,
    titulo: req.body.titulo,
    fecha_iniciacion: req.body.fecha_iniciacion,
    fecha_entrega: req.body.fecha_entrega,
    valor: req.body.valor,
    cliente: req.body.cliente,
    tipo_proyecto: req.body.tipo_proyecto,
    universidad: req.body.universidad,
    etapa: req.body.etapa
  });

  try {
    const newProyecto = await proyecto.save();
    res.status(201).json(newProyecto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a proyecto
router.put('/:id', async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) return res.status(404).json({ message: 'Proyecto not found' });

    if (req.body.numero) proyecto.numero = req.body.numero;
    if (req.body.titulo) proyecto.titulo = req.body.titulo;
    if (req.body.fecha_iniciacion) proyecto.fecha_iniciacion = req.body.fecha_iniciacion;
    if (req.body.fecha_entrega) proyecto.fecha_entrega = req.body.fecha_entrega;
    if (req.body.valor) proyecto.valor = req.body.valor;
    if (req.body.cliente) proyecto.cliente = req.body.cliente;
    if (req.body.tipo_proyecto) proyecto.tipo_proyecto = req.body.tipo_proyecto;
    if (req.body.universidad) proyecto.universidad = req.body.universidad;
    if (req.body.etapa) proyecto.etapa = req.body.etapa;
    proyecto.fecha_actualizacion = Date.now();

    const updatedProyecto = await proyecto.save();
    res.json(updatedProyecto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a proyecto
router.delete('/:id', async (req, res) => {
    try {
      const proyecto = await Proyecto.findById(req.params.id);
      if (!proyecto) return res.status(404).json({ message: 'Proyecto not found' });
  
      await Proyecto.deleteOne({ _id: req.params.id });
      res.json({ message: 'Proyecto deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
