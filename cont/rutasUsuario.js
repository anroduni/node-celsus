var express = require('express');
var router = express.Router();
var usuariosModel = require('../modelos/usuarios');
//const usuarios = require('../modelos/usuarios');

// Obtener todos los usuarios
router.get('/usuarios', function (request,response) {

    usuariosModel.getUsuarios(function (error, data) {
        response.status(200).json(data);
    });
});

// Obtenr usuario por su id
router.get('/usuario',function (request,response) {
    var id = request.query.id;
    usuariosModel.getUsuarioById(id,function (error,data) {
       if( typeof data != 'undefined' && data.length > 0 ){
        response.status(200).json(data);
       }else{
        response.status(404).json({"Mensaje":"No existe"});
       }
    });
});

// Insertar usuario
router.post('/usuario',function (request,response) {
    var datosUsuario = {
        id : null,
        nombre : request.body.nombre
    };
    usuariosModel.insertUsuario(datosUsuario,function (error,data) {
        if(data){
            response.status(200).json({"Mensaje":"Usuario Insertado"});
        }else{
            response.status(500).json({"Mensaje":"Error"});
        }
    });
});

// Modificar un usuario
router.put('/usuario',function (request,response) {
    var datosUsuario = {
        id : request.query.id,
        nombre : request.query.nombre
    };
    usuariosModel.updateUsuario(datosUsuario, function (error, data){
        if( data ){ //&& data.mensaje
            response.status(200).json(data);
        }else{
            response.status(500).json({"Mensaje":"Error"});
        }     
    });
});

// Borrar un usuario
router.delete('/usuario',function (request,response) {
    var id = request.query.id;
    usuariosModel.deleteUsuario(id,function (data) {
        if(data && data.mensaje == "Registro borrado" ){
            response.status(200).json(data);
        }else{
            response.status(500).json({"Mensaje":"Error"});
        }
    });         
})

module.exports = router;