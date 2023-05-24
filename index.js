const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// Variables de entorno
const port = process.env.PORT || 5000;

// Crear el servidor de express
const app = express();

// Conexion a la base de datos
dbConnection();

// Aplcicando CORS
app.use(cors());

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


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