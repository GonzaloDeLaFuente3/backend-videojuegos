import Videojuego from '../models/Videojuego.mjs';

/* export const obtenerTodos = async () => {
    return await Videojuego.find();
}; */

export const obtenerConFiltros = async (genero, plataforma, edadMinima, pagina = 1, limite = 10) => {
    const filtros = {};
    if (genero) filtros.genero = { $regex: genero, $options: 'i' };
    if (plataforma) filtros.plataforma = { $regex: plataforma, $options: 'i' };
    if (edadMinima) filtros.edadMinima = { $lte: parseInt(edadMinima, 10) };

    // Validar parámetros de paginación
    const paginaNum = Math.max(1, parseInt(pagina, 10) || 1);
    const limiteNum = Math.max(1, parseInt(limite, 10)) || 10;

    const opciones = {
        skip: (paginaNum - 1) * limiteNum,
        limit: limiteNum,
    };

    // Obtener el total de videojuegos que coinciden con los filtros
    const totalVideojuegos = await Videojuego.countDocuments(filtros);
    
    // Validar que el total sea un número
    if (typeof totalVideojuegos !== 'number' || isNaN(totalVideojuegos)) {
        throw new Error('El conteo total de videojuegos no es un número válido');
    }

    // Obtener los videojuegos paginados
    const videojuegos = await Videojuego.find(filtros, null, opciones);

    return {
        videojuegos,
        totalVideojuegos: Number(totalVideojuegos) // Asegurar que es número
    };
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