const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {
    //x-token headers

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay un token en la petición',
        });
    }

    try {
        
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

        
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'token no válido',
        });
    }

    next();

};

module.exports = {
    validarJWT
}
