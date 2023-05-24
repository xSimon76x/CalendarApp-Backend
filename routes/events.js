
/**
 * Rutas de Eventos
 * host + /api/events
 */

const express = require('express');
const router = express.Router();
const {
    getEventos, 
    crearEvento, 
    actualizarEvento, 
    eliminarEvento 
} = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');

// Validar Token - Aplicando Middleware para todas las rutas de abajo
router.use(validarJWT);

// Rutas
router.get(
    '/', 
    getEventos
);

router.post(
    '/', 
    crearEvento
);

router.put(
    '/:id', 
    actualizarEvento
);

router.delete(
    '/:id', 
    eliminarEvento
);

module.exports = router;