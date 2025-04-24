const verificarPerfil = (tiposPermitidos) => {
    return (req, res, next) => {
        const perfil = req.perfil; // Asume que el perfil se carga en el middleware de autenticación
        if (!tiposPermitidos.includes(perfil.tipo)) {
            return res.status(403).json({ msg: 'Permiso denegado' });
        }
        next();
    };
};
export default verificarPerfil;