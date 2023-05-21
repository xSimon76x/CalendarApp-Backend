/**
 * Rutas de Usuarios -> Auth
 * host + /api/auth
 */

const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

// Rutas
router.post(
    '/new', 
    [ // middleware
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        // check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe ser de 6 digitos').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);
router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('password', 'La contraseña debe ser de 6 digitos').isLength({ min: 6 })
    ],
    loginUsuario
);
router.get('/renew', revalidarToken);

module.exports = router;