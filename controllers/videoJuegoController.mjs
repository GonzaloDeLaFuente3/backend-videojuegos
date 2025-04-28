import videojuegoService from '../services/videoJuegoService.mjs';

export const obtenerVideojuegos = async (req, res) => {
    const { genero, plataforma, edadMinima, pagina, limite } = req.query;
    // console.log('Parámetros recibidos:', { genero, plataforma, pagina, limite }); 
    try {
        const videojuegos = await videojuegoService.obtenerConFiltros(genero, plataforma, edadMinima, pagina, limite);
        res.json(videojuegos);
    } catch (err) {
        res.status(500).json({ msg: 'Error al obtener los videojuegos' });
    }
};

export const obtenerVideojuegoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const videojuego = await videojuegoService.obtenerPorId(id);
        if (!videojuego) return res.status(404).json({ msg: 'Videojuego no encontrado' });
        res.json(videojuego);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const crearVideojuego = async (req, res) => {
    const datos = req.body;
    try {
        const videojuego = await videojuegoService.crear(datos);
        res.json(videojuego);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const actualizarVideojuego = async (req, res) => {
    const { id } = req.params;
    const datos = req.body;
    try {
        const videojuego = await videojuegoService.actualizar(id, datos);
        if (!videojuego) return res.status(404).json({ msg: 'Videojuego no encontrado' });
        res.json(videojuego);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const eliminarVideojuego = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await videojuegoService.eliminar(id);
        if (!resultado) return res.status(404).json({ msg: 'Videojuego no encontrado' });
        res.json({ msg: 'Videojuego eliminado' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};