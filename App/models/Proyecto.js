const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  fecha_iniciacion: { type: Date, required: true },
  fecha_entrega: { type: Date, required: true },
  valor: { type: Number, required: true },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  tipo_proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoProyecto', required: true },
  universidad: { type: mongoose.Schema.Types.ObjectId, ref: 'Universidad', required: true },
  etapa: { type: mongoose.Schema.Types.ObjectId, ref: 'Etapa', required: true }
});

module.exports = mongoose.model('Proyecto', proyectoSchema);
