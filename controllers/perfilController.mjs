import perfilService from '../services/perfilService.mjs';

export const obtenerPerfiles = async (req, res) => {
    try {
        const perfiles = await perfilService.obtenerPerfilesPorUsuario(req.usuario._id);//llama al servicio para obtener los perfiles del usuario autenticado. el usuario se añade al req en el middleware de autenticación
        res.json(perfiles);// respuesta exitosa, devuelve los perfiles
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const obtenerPerfilPorId = async (req, res) => {
    const { id } = req.params; // Extraigo el id del perfil de los parámetros de la petición
    try {
        const perfil = await perfilService.obtenerPorId(id);      //llama al servicio para obtener el perfil por id
        if (!perfil) return res.status(404).json({ msg: 'Perfil no encontrado' });
        res.json(perfil);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const crearPerfil = async (req, res) => {
    const datos = req.body;// Extraigo los datos del cuerpo de la petición
    try {
        const perfil = await perfilService.crear(datos);//llama al servicio para crear el perfil
        res.json(perfil);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const actualizarPerfil = async (req, res) => {
    const { id } = req.params;
    const datos = req.body;
    try {
        const perfil = await perfilService.actualizar(id, datos);
        if (!perfil) return res.status(404).json({ msg: 'Perfil no encontrado' });
        res.json(perfil);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const eliminarPerfil = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await perfilService.eliminar(id);//llama al servicio para eliminar el perfil
        if (!resultado) return res.status(404).json({ msg: 'Perfil no encontrado' });
        res.json({ msg: 'Perfil eliminado' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};