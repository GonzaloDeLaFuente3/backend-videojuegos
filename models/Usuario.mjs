import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    perfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Perfil' }],
});

// Método para comparar contraseñas
UsuarioSchema.methods.compararPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Middleware para hashear la contraseña antes de guardar
UsuarioSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
export default Usuario;
