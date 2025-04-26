import perfilService from '../services/perfilService.mjs';

export const obtenerPerfiles = async (req, res) => {
    try {
        const perfiles = await perfilService.obtenerPerfilesPorUsuario(req.usuario._id);
        res.json(perfiles);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const obtenerPerfilPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const perfil = await perfilService.obtenerPorId(id);
        if (!perfil) return res.status(404).json({ msg: 'Perfil no encontrado' });
        res.json(perfil);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const crearPerfil = async (req, res) => {
    const datos = req.body;
    try {
        const perfil = await perfilService.crear(datos);
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
        const resultado = await perfilService.eliminar(id);
        if (!resultado) return res.status(404).json({ msg: 'Perfil no encontrado' });
        res.json({ msg: 'Perfil eliminado' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};