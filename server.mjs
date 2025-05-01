// server.mjs
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.mjs';
import usuarioRoutes from './routes/usuarioRoutes.mjs';
import perfilRoutes from './routes/perfilRoutes.mjs';
import videojuegoRoutes from './routes/videoJuegoRoutes.mjs';
import rawgRoutes from './routes/rawgRoutes.mjs';

// Cargar variables de entorno desde un archivo .env
dotenv.config();

// Inicializar la aplicación Express
const app = express();

// Middleware para analizar JSON
app.use(express.json());

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173', // dominio de tu frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Perfil-Id', // Añade el encabezado Perfil-Id aquí
    'x-total-count' // Añade este header
  ],
  exposedHeaders: ['x-total-count'] // Asegúrate de exponer este heade
}));

//rutas 
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/perfiles', perfilRoutes);
app.use('/api/videojuegos', videojuegoRoutes);
app.use('/api/juegos', rawgRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error de conexión a MongoDB', err));

// Rutas
app.get('/', (req, res) => {
  res.send('API de NodoGames funcionando');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});