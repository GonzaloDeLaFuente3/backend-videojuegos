import mongoose from 'mongoose';

const PerfilSchema = new mongoose.Schema({
    apodo: { type: String, required: true },
    tipo: { type: String, enum: ['adulto', 'adolescente', 'infantil'], required: true },
    edad: { type: Number, required: true },
    avatar: { type: String, required: false },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    coleccion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Videojuego' }],
});

const Perfil = mongoose.model('Perfil', PerfilSchema);
export default Perfil;
