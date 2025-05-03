import express from 'express';
import { obtenerVideojuegos, obtenerVideojuegoPorId, crearVideojuego, actualizarVideojuego, eliminarVideojuego } from '../controllers/videoJuegoController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';
import verificarPerfil from '../middleware/perfilMiddleware.mjs';

const router = express.Router();

router.get('/', authMiddleware, obtenerVideojuegos);// Obtener todos los videojuegos authMiddleware Verifica que el usuario esté autenticado
router.get('/:id', authMiddleware, obtenerVideojuegoPorId);// Obtener un videojuego por ID
router.post('/crear', authMiddleware,verificarPerfil(['adulto', 'adolescente']), crearVideojuego);// Crear un nuevo videojuego
// Verifica que el usuario tenga un perfil de adulto o adolescente
router.put('/actualizar/:id', authMiddleware,verificarPerfil(['adulto', 'adolescente']), actualizarVideojuego);
router.delete('/eliminar/:id', authMiddleware,verificarPerfil(['adulto', 'adolescente']), eliminarVideojuego);

export default router;