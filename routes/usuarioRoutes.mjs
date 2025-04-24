import express from 'express';
import { obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario } from '../controllers/usuarioController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/', authMiddleware, obtenerUsuarios);
router.get('/:id', authMiddleware, obtenerUsuarioPorId);
router.put('/actualizar/:id', authMiddleware, actualizarUsuario);
router.delete('eliminar/:id', authMiddleware, eliminarUsuario);

export default router;