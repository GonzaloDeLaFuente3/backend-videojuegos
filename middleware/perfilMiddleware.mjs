// middleware/perfilMiddleware.mjs
import Perfil from '../models/Perfil.mjs'; // Usa import en lugar de require

const verificarPerfil = (tiposPermitidos) => {
  return async (req, res, next) => {// Middleware que verifica el perfil del usuario
    const perfilId = req.headers['perfil-id']; // Obtiene el ID del perfil del encabezado
    if (!perfilId) {
      return res.status(403).json({ msg: 'Perfil no proporcionado' });
    }

    try {
      // Carga el perfil desde la base de datos usando el perfilId
      const perfil = await Perfil.findById(perfilId);

      if (!perfil) {
        return res.status(403).json({ msg: 'Perfil no encontrado' });
      }

      if (!tiposPermitidos.includes(perfil.tipo)) {// Verifica si el tipo de perfil está permitido
        return res.status(403).json({ msg: 'Permiso denegado' });
      }

      req.perfil = perfil; // Asigna el perfil a la solicitud para su uso posterior
      next();// Llama al siguiente middleware o controlador
    } catch (error) {
      console.error('Error al verificar el perfil:', error);
      return res.status(500).json({ msg: 'Error interno del servidor' });
    }
  };
};

export default verificarPerfil;