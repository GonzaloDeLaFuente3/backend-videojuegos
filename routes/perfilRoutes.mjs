import express from 'express';
import { obtenerPerfiles, obtenerPerfilPorId, crearPerfil, actualizarPerfil, eliminarPerfil } from '../controllers/perfilController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/', authMiddleware, obtenerPerfiles);
router.get('/:id', authMiddleware, obtenerPerfilPorId);
router.post('/crear', authMiddleware, crearPerfil);
router.put('/actualizar/:id', authMiddleware, actualizarPerfil);
router.delete('/eliminar/:id', authMiddleware, eliminarPerfil);

export default router;