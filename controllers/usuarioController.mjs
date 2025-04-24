import usuarioService from '../services/usuarioService.mjs';

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obtenerTodos();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioService.obtenerPorId(id);
        if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const datos = req.body;
    try {
        const usuario = await usuarioService.actualizar(id, datos);
        if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await usuarioService.eliminar(id);
        if (!resultado) return res.status(404).json({ msg: 'Usuario no encontrado' });
        res.json({ msg: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};