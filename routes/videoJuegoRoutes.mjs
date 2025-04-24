import express from 'express';
import { obtenerVideojuegos, obtenerVideojuegoPorId, crearVideojuego, actualizarVideojuego, eliminarVideojuego } from '../controllers/videoJuegoController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';
import verificarPerfil from '../middleware/perfilMiddleware.mjs';

const router = express.Router();

router.get('/', authMiddleware, obtenerVideojuegos);
router.get('/:id', authMiddleware, obtenerVideojuegoPorId);
router.post('/crear', authMiddleware, verificarPerfil(['adulto', 'adolescente']), crearVideojuego);
router.put('/actualizar/:id', authMiddleware,verificarPerfil(['adulto', 'adolescente']), actualizarVideojuego);
router.delete('/eliminar/:id', authMiddleware,verificarPerfil(['adulto', 'adolescente']), eliminarVideojuego);

export default router;