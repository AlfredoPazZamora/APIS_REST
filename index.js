import express from "express";
import { urlencoded, json } from 'body-parser';
const app = express(); //INICIALIZAMOS EXPRESS Y body-parser
//para manejar los datos en formato JSON en los POST y PUT
app.use(urlencoded({ extended: false }));
app.use(json());

/*const express = require("express");
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());*/

let usuario = { //tener las propiedades
    nombre:'',
    apellido: ''
};
let respuesta = { //respuesta al cliente
    error: false,
    codigo: 200,
    mensaje: ''
};
app.get('/', function(req, res) { //ruta raiz para mostrar una base de nuestra api
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
});

app.get('/usuario', function (req, res) { //metodo get del usuario
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ''
    };
    if(usuario.nombre === '' || usuario.apellido === '') { //validacion de existencias 
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El usuario no ha sido creado'
        };
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'respuesta del usuario',
            respuesta: usuario
        };
    }
    res.send(respuesta);
});

app.post('/usuario', function (req, res) { //metodo post del usuario
    if(!req.body.nombre || !req.body.apellido) { //validacion para ingresar los datos
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre y apellido son requeridos'
        };
    } else if(usuario.nombre !== '' || usuario.apellido !== '') { //validacion para saber si fue creado
        respuesta = {
            error: true,
            codigo: 503,
            mensaje: 'El usuario ya fue creado previamente'
        };
    } else { //ingresa al usuario
        usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido
        };

        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Usuario creado',
            respuesta: usuario
        };
    }
    res.send(respuesta);
});

app.put('/usuario', function (req, res) { //metodo de modificación del usuario
    if(!req.body.nombre || !req.body.apellido) { //validar para ingresar todos los datos
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo nombre y apellido son requeridos'
        };
    } else if(usuario.nombre === '' || usuario.apellido === '') { //no existe el usuario
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El usuario no ha sido creado'
        };
    } else { //actualizamos la información
        usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido
        };

        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Usuario actualizado',
            respuesta: usuario
        };
    }
    
    res.send(respuesta);
});

app.delete('/usuario', function (req, res) { //metodo de eliminación
    if(usuario.nombre === '' || usuario.apellido === '') { //usuario no existe
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'El usuario no ha sido creado'
        };
    } else { //eliminamos los valores
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Usuario eliminado'
        };
        
        usuario = { 
            nombre: '', 
            apellido: '' 
        };
    }
    res.send(respuesta);
});

app.use(function(req, res, next) {
    respuesta = {
        error: true, 
        codigo: 404, 
        mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
