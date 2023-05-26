const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async(req, res = response ) => {
    
    res.json({
        ok: true,
        msg: 'getEventos'
    });

};

const crearEvento = async(req, res = response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
        
        await evento.save();

        
        return res.status(200).json({
            ok: false,
            evento
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador',
        });
    }

};

const actualizarEvento = async(req, res = response ) => {
    
    res.json({
        ok: true,
        msg: 'actualizarEvento'
    });

};

const eliminarEvento = async(req, res = response ) => {
    
    res.json({
        ok: true,
        msg: 'eliminarEv ento'
    });

};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}