import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    perfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Perfil' }],
});

// Método para comparar contraseñas
UsuarioSchema.methods.compararPassword = function(password) {// Compara la contraseña proporcionada con la almacenada en la base de datos
    // Utiliza bcrypt para comparar las contraseñas
    return bcrypt.compareSync(password, this.password);
};

// Middleware para hashear la contraseña antes de guardar
UsuarioSchema.pre('save', function(next) {//  se ejecuta antes de guardar el usuario
    if (!this.isModified('password')) {// Verifica si la contraseña ha sido modificada
        return next();
    }
    const salt = bcrypt.genSaltSync(10);// Genera un salt para el hash de la contraseña
    // Hashea la contraseña utilizando bcrypt
    // La función hashSync toma la contraseña y el salt como argumentos
    this.password = bcrypt.hashSync(this.password, salt);  
    next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
export default Usuario;
