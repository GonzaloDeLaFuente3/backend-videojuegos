import mongoose from 'mongoose';

const PerfilSchema = new mongoose.Schema({// Definición del esquema para el modelo de Perfil
    apodo: { type: String, required: true },
    tipo: { type: String, enum: ['adulto', 'adolescente', 'infantil'], required: true },
    edad: { type: Number, required: true },
    avatar: { type: String, required: false },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },// Referencia al modelo Usuario
    coleccion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Videojuego' }],
});

const Perfil = mongoose.model('Perfil', PerfilSchema);// Exporta el modelo de Perfil para su uso en otras partes de la aplicación
export default Perfil;
