import videojuegoService from '../services/videoJuegoService.mjs';

export const obtenerVideojuegos = async (req, res) => {
    const { genero, plataforma, edadMinima, pagina = 1, limite = 10 } = req.query;

    try {
        const { videojuegos, totalVideojuegos } = await videojuegoService.obtenerConFiltros(
            genero, 
            plataforma, 
            edadMinima, 
            pagina, 
            limite
        );

        // Validar y asegurar que totalVideojuegos es un número
        const total = Number(totalVideojuegos);
        if (isNaN(total)) {
            throw new Error('El conteo total de videojuegos no es válido');
        }

        // Establecer el header con el total validado
        res.set('x-total-count', total.toString());
        res.json(videojuegos);
    } catch (err) {
        console.error('Error en obtenerVideojuegos:', err);
        res.status(500).json({ msg: 'Error al obtener los videojuegos', error: err.message });
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