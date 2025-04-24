import Videojuego from '../models/Videojuego.mjs';

/* export const obtenerTodos = async () => {
    return await Videojuego.find();
}; */

export const obtenerConFiltros = async (genero, plataforma, pagina, limite) => {
    const filtros = {};
    //$regex permite hacer búsquedas parciales para busqueda insensible a mayúsculas y minúsculas
    if (genero) filtros.genero = { $regex: genero, $options: 'i' };
    if (plataforma) filtros.plataforma = { $regex: plataforma, $options: 'i' };

    const opciones = {
        //skip y limmit son para paginación de Mongoose
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