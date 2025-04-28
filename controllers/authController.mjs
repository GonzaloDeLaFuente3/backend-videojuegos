import authService from '../services/authService.mjs';

export const registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const { token, usuario } = await authService.registrar(nombre, email, password);
    res.json({ token, usuario });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, usuario } = await authService.login(email, password);
        res.json({ token, usuario });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};