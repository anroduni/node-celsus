const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
var usuariosModel = require('./modelos/usuarios');

// Obtener todos los usuarios
app.get('/usuarios', function (request,response) {

      usuariosModel.getUsuarios(function (error, data) {
          response.status(200).json(data);
      });
  });
  
  // Obtenr usuario por su id
  app.get('/usuario',function (request,response) {
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
  app.post('/usuario',function (request,response) {
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
  app.put('/usuario',function (request,response) {
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
  app.delete('/usuario',function (request,response) {
      var id = request.query.id;
      usuariosModel.deleteUsuario(id,function (data) {
          if(data && data.mensaje == "Registro borrado" ){
              response.status(200).json(data);
          }else{
              response.status(500).json({"Mensaje":"Error"});
          }
      });         
  })
  
  module.exports = app;
app.listen(port)
console.log('Api listen in the port: ' + port);
