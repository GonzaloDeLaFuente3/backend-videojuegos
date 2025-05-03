import Usuario from '../models/Usuario.mjs';
import jwt from 'jsonwebtoken';

export const registrar = async (nombre, email, password) => {// Extraigo los datos enviados en la petición
    let usuario = await Usuario.findOne({ email });// Busco si el usuario ya existe en la base de datos
    if (usuario) {
        throw new Error('El usuario ya existe');
    }

    usuario = new Usuario({ nombre, email, password });// Crea un nuevo usuario con los datos proporcionados
    await usuario.save();// Guarda el usuario en la base de datos

    const payload = { usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } };// Crea un payload con la información del usuario
    //payload es un objeto que contiene la información que se va a incluir en el token JWT. En este caso, contiene el id, nombre y email del usuario.
    return new Promise((resolve, reject) => {// Crea una nueva promesa para generar el token JWT. Una Promesa es un objeto que representa la eventual finalización (o falla) de una operación asíncrona y su valor resultante.
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {// Genera el token JWT usando la clave secreta y establece un tiempo de expiración de 1 hora
            if (err) reject(err);// Si hay un error al generar el token, lo rechaza
            resolve({ token, usuario: payload.usuario });// Resuelve la promesa con el token y la información del usuario
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

    const payload = { usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } };// Crea un payload con la información del usuario
    return new Promise((resolve, reject) => {// Crea una nueva promesa para generar el token JWT. Una Promesa es un objeto que representa la eventual finalización (o falla) de una operación asíncrona y su valor resultante.
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) reject(err);
            resolve({ token, usuario: payload.usuario });
        });
    });
};

export default { registrar, login };