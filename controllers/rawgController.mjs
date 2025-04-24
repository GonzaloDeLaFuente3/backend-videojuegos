import rawgService from '../services/rawgService.mjs';

export const obtenerJuegosPopulares = async (req, res) => {
    try {
        const juegosPopulares = await rawgService.obtenerJuegosPopulares();
        res.json(juegosPopulares);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};