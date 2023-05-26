
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
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

// Validar Token - Aplicando Middleware para todas las rutas de abajo
router.use(validarJWT);

// Rutas
router.get(
    '/', 
    getEventos
);

router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
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