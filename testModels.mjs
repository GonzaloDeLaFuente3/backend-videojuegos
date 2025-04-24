// testModels.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Usuario from './models/Usuario.mjs';
import Perfil from './models/Perfil.mjs';
import Videojuego from './models/Videojuego.mjs';

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB conectado');

  // Crear un usuario de prueba
  const usuario = new Usuario({
    nombre: 'Gonzalo De La Fuente',
    email: 'gonzalo@example.com',
    password: 'password123',
  });

  await usuario.save();
  console.log('Usuario creado:', usuario);

  // Crear un perfil asociado al usuario
  const perfil = new Perfil({
    nombre: 'Perfil Adulto',
    tipo: 'adulto',
    usuario: usuario._id,
  });

  await perfil.save();
  console.log('Perfil creado:', perfil);

  // Crear un videojuego
  const videojuego = new Videojuego({
    titulo: 'Juego de Prueba',
    genero: 'Acción',
    plataforma: 'PC',
    clasificacion: '18+',
  });

  await videojuego.save();
  console.log('Videojuego creado:', videojuego);

  // Limpiar la base de datos eliminando los documentos creados
  await Usuario.deleteMany({});
  await Perfil.deleteMany({});
  await Videojuego.deleteMany({});

  console.log('Documentos eliminados');
  mongoose.connection.close();
})
.catch(err => console.error('Error de conexión a MongoDB', err));