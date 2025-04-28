import Videojuego from '../models/Videojuego.mjs';

/* export const obtenerTodos = async () => {
    return await Videojuego.find();
}; */

export const obtenerConFiltros = async (genero, plataforma, edadMinima, pagina = 1, limite = 10) => {
    const filtros = {};
    if (genero) filtros.genero = { $regex: genero, $options: 'i' };
    if (plataforma) filtros.plataforma = { $regex: plataforma, $options: 'i' };
    if (edadMinima) filtros.edadMinima = { $lte: parseInt(edadMinima, 10) };// Cambia a $gte si quieres videojuegos con edad mínima mayor o igual a la proporcionada

    const opciones = {
        skip: (pagina - 1) * limite,
        limit: parseInt(limite, 10),
    };

    return await Videojuego.find(filtros, null, opciones);
};

export const obtenerPorId = async (id) => {
    return await Videojuego.findById(id);
};

export const crear = async (datos) => {
    const videojuego = new Videojuego(datos);
    return await videojuego.save();
};

export const actualizar = async (id, datos) => {
    return await Videojuego.findByIdAndUpdate(id, datos, { new: true });
};

export const eliminar = async (id) => {
    return await Videojuego.findByIdAndDelete(id);
};

export default { obtenerConFiltros , obtenerPorId, crear, actualizar, eliminar };