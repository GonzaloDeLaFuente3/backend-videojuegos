import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.mjs';
import Perfil from '../models/Perfil.mjs';

const auth = async (req, res, next) => {
  //token en el header de la peticion, se agrega key: value, donde key es x-auth-token y value es el token.
    // const token = req.header('x-auth-token');

    // Obtenemos el header de autorización
    const authHeader = req.headers['authorization'];// 'authorization' es el nombre del header que contiene el token
    // Extraemos el token del header (formato: "Bearer <token>")
    const token = authHeader && authHeader.split(' ')[1];// Si el header existe, separamos el token del prefijo "Bearer"

    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso denegado' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);// Verificamos el token usando la clave secreta
        const usuario = await Usuario.findById(decoded.usuario.id);// Buscamos el usuario en la base de datos usando el id decodificado del token

        if (!usuario) {
            return res.status(401).json({ msg: 'Usuario no encontrado' });
        }

        // Buscar el perfil activo, si no existe, asignar null
        const perfilActivo = await Perfil.findOne({ usuario: usuario._id });// Buscamos el perfil activo del usuario en la base de datos
        req.usuario = usuario;// Asignamos el usuario encontrado al objeto de la petición
        req.perfil = perfilActivo || null;// Asignamos el perfil activo al objeto de la petición, o null si no existe
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};
    
    export default auth;