import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/authController.mjs';

const router = express.Router();// Crear una instancia de Router

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

export default router;