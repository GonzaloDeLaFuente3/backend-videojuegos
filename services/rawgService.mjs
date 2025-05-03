import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); // Cargar variables de entorno desde el archivo .env
// Configuración de la API de RAWG

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAWG_BASE_URL = 'https://api.rawg.io/api';

export const obtenerJuegosPopulares = async () => {
    // console.log('Clave de API de RAWG:', RAWG_API_KEY);
    try {
        const response = await axios.get(`${RAWG_BASE_URL}/games`, {
        params: {
            key: RAWG_API_KEY,
            ordering: '-rating', // Ordenar por rating descendente
            page_size: 10, // Límite de resultados
        },
        });
        return response.data.results;// Devuelve los juegos populares
    } catch (error) {
        console.error('Error al obtener juegos populares de RAWG:', error);
        throw new Error('No se pudieron obtener los juegos populares');
    }
};

export default { obtenerJuegosPopulares };