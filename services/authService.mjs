import Usuario from '../models/Usuario.mjs';
import jwt from 'jsonwebtoken';

export const registrar = async (nombre, email, password) => {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
        throw new Error('El usuario ya existe');
    }

    usuario = new Usuario({ nombre, email, password });
    await usuario.save();

    const payload = { usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) reject(err);
        resolve({ token, usuario: payload.usuario });
        });
    });
};

export const login = async (email, password) => {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        throw new Error('Credenciales inválidas');
    }

    const esValido = usuario.compararPassword(password);
    if (!esValido) {
        throw new Error('Credenciales inválidas');
    }

    const payload = { usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) reject(err);
        resolve({ token, usuario: payload.usuario });
        });
    });
};

export default { registrar, login };