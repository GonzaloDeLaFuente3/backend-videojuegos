import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.mjs';
import Perfil from '../models/Perfil.mjs';

const auth = async (req, res, next) => {
  //token en el header de la peticion, se agrega key: value, donde key es x-auth-token y value es el token.
    // const token = req.header('x-auth-token');

    // Obtenemos el header de autorización
    const authHeader = req.headers['authorization'];
    // Extraemos el token del header (formato: "Bearer <token>")
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso denegado' });
    }
    
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.usuario.id);

    if (!usuario) {
        return res.status(401).json({ msg: 'Usuario no encontrado' });
    }

    // Buscar el perfil activo, si no existe, asignar null
    const perfilActivo = await Perfil.findOne({ usuario: usuario._id });
    req.usuario = usuario;
    req.perfil = perfilActivo || null;
    next();
    } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
    }
};
    
    export default auth;