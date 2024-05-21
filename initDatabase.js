const mongoose = require('mongoose');
require('dotenv').config();

const Cliente = require('./Cliente/models/Cliente');
const Etapa = require('./App/models/Etapa');
const Proyecto = require('./App/models/Proyecto');
const TipoProyecto = require('./App/models/TipoProyecto');
const Universidad = require('./App/models/Universidad');

const mongoURI = process.env.MONGO_URI;

// Sample data
const sampleClientes = [
  { nombre: 'Juan Perez', email: 'juan.perez@example.com' },
  { nombre: 'Maria Gomez', email: 'maria.gomez@example.com' },
  { nombre: 'Carlos Rodriguez', email: 'carlos.rodriguez@example.com' }
];

const sampleEtapas = [
  { nombre: 'Anteproyecto' },
  { nombre: 'Entrega Parcial 1' },
  { nombre: 'Entrega Parcial 2' },
  { nombre: 'Entrega Final' }
];

const sampleTiposProyecto = [
  { nombre: 'Ensayo' },
  { nombre: 'Artículo' },
  { nombre: 'Monografía' },
  { nombre: 'Trabajo Final de Pregrado' },
  { nombre: 'Trabajo Final de Especialización' }
];

const sampleUniversidades = [
  { nombre: 'Universidad Nacional', direccion: 'Calle 123', telefono: '1234567' },
  { nombre: 'Universidad de los Andes', direccion: 'Calle 456', telefono: '2345678' }
];

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');

  // Insert sample data
  await Cliente.insertMany(sampleClientes);
  await Etapa.insertMany(sampleEtapas);
  await TipoProyecto.insertMany(sampleTiposProyecto);
  await Universidad.insertMany(sampleUniversidades);

  const cliente = await Cliente.findOne({ nombre: 'Juan Perez' });
  const tipoProyecto = await TipoProyecto.findOne({ nombre: 'Ensayo' });
  const universidad = await Universidad.findOne({ nombre: 'Universidad Nacional' });
  const etapa = await Etapa.findOne({ nombre: 'Anteproyecto' });

  const sampleProyecto = new Proyecto({
    numero: '12345',
    titulo: 'Proyecto de Ejemplo',
    fecha_iniciacion: new Date(),
    fecha_entrega: new Date(Date.now() + 7*24*60*60*1000), // 1 week later
    valor: 1000,
    cliente: cliente._id,
    tipo_proyecto: tipoProyecto._id,
    universidad: universidad._id,
    etapa: etapa._id
  });

  await sampleProyecto.save();

  console.log('Sample data inserted');
  mongoose.connection.close();
}).catch(err => {
  console.error('Connection error:', err);
});
