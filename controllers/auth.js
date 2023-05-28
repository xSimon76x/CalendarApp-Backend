const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    
    try {
        
        let usuario = await Usuario.findOne({ email });
       
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo',
            });
        }
        
        usuario = new Usuario( req.body );

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );
        
        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador',
        });
    }
}

const loginUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });
       
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese correo',
            });
        }

        //confirmar las contraseñas
        const validarContraseñas = bcryptjs.compareSync( password, usuario.password )

        if ( !validarContraseñas ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida',
            });
        }

        //Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );


        res.json({
            ok: true,
            msg: 'login',
            uid: usuario.id,
            name: usuario.name,
            email, 
            password,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador',
        });
    }


}

const revalidarToken = async(req, res = response ) => {
    
    const { uid, name } = req;
    
    // Re generar nuevamente el token
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        uid, 
        name,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}