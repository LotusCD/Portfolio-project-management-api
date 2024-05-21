const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Listar clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear cliente
router.post('/', async (req, res) => {
  const cliente = new Cliente({
    nombre: req.body.nombre,
    email: req.body.email
  });
  try {
    const nuevoCliente = await cliente.save();
    res.status(201).json(nuevoCliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Editar cliente
router.put('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

    if (req.body.nombre) cliente.nombre = req.body.nombre;
    if (req.body.email) cliente.email = req.body.email;
    cliente.fecha_actualizacion = Date.now();

    const clienteActualizado = await cliente.save();
    res.json(clienteActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

    await Cliente.deleteOne({ _id: req.params.id });
    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
