const express = require('express');
require('dotenv').config();

// Variables de entorno
const port = process.env.PORT || 5000;

// Crear el servidor de express
const app = express();

// Directorio Público
app.use( express.static('public') );

// Rutas
app.use('/api/auth', require('./routes/auth'));


// Rutas
// req=request
// res=response
app.get('/', ( req, res ) => {
    res.json({
        ok: 'Hola mundo'
    });
})

//Escuchar las peticiones
app.listen( port, () => {
    console.log(`Servidor de Node.JS, corriendo por el puerto ${ port }`);
})