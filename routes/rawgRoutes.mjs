import express from 'express';
import { obtenerJuegosPopulares } from '../controllers/rawgController.mjs';

const router = express.Router();

router.get('/populares', obtenerJuegosPopulares);

export default router;