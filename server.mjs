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

// Configurar CORS. CORS permite que tu frontend acceda a la API desde un dominio diferente
app.use(cors({
  origin: 'https://nodogametfepico-delafuente.netlify.app', // dominio de tu frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Perfil-Id', // Añade el encabezado Perfil-Id . Este encabezado se utiliza para enviar el ID del perfil en las solicitudes
    'x-total-count' // Añade este header. Este header se utiliza para enviar el total de elementos en la respuesta
  ],
  exposedHeaders: ['x-total-count'] // Este header se utiliza para enviar el total de elementos en la respuesta. expose el header x-total-count para que el frontend pueda acceder a él
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