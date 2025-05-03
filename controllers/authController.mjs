import authService from '../services/authService.mjs';

export const registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;//Extraigo los datos enviados en la petición 
    try {
        const { token, usuario } = await authService.registrar(nombre, email, password);//llama al servicio de autenticación para registrar el usuario
        res.json({ token, usuario });// respuesta exitosa, devuelve el token y el usuario
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, usuario } = await authService.login(email, password);//llama al servicio de autenticación para validar el usuario
        res.json({ token, usuario });// respuesta exitosa, devuelve el token y el usuario
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};