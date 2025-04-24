import mongoose from 'mongoose';

const VideojuegoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    genero: [{ type: String, required: true }],
    plataforma: [{ type: String, required: true }],
    edadMinima: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    fechaLanzamiento: { type: Date, required: true },
    imgUrl: { type: String },
});

const Videojuego = mongoose.model('Videojuego', VideojuegoSchema);
export default Videojuego;