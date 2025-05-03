import Videojuego from '../models/Videojuego.mjs';

export const obtenerConFiltros = async (genero, plataforma, edadMinima, pagina = 1, limite = 10) => {// Extraigo los parámetros de la consulta
    const filtros = {};
    if (genero) filtros.genero = { $regex: genero, $options: 'i' };// Expresión regular para buscar por género
    if (plataforma) filtros.plataforma = { $regex: plataforma, $options: 'i' };// Expresión regular para buscar por plataforma
    if (edadMinima) filtros.edadMinima = { $lte: parseInt(edadMinima, 10) };// Filtrar por edad mínima

    // Validar parámetros de paginación
    const paginaNum = Math.max(1, parseInt(pagina, 10) || 1);// Asegurar que la página sea al menos 1
    const limiteNum = Math.max(1, parseInt(limite, 10)) || 10;// Asegurar que el límite sea al menos 1

    const opciones = {// Opciones de paginación
        skip: (paginaNum - 1) * limiteNum,// Calcular el número de documentos a omitir
        limit: limiteNum,// Limitar el número de documentos devueltos
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
        totalVideojuegos: Number(totalVideojuegos) // Aseguro que es un número
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