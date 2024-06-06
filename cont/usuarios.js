//Importamos los datos de la conexión
var conn=require('./connection');
//Importamos el paquete mysql
var mysql = require('mysql'),
//Creamos la conexión a nuestra base de datos con los datos almacenados en conn
connection = mysql.createConnection(
	conn
);
//Creamos un objeto al que llamaremos usuarios
var usuarios = {};

// Obtenemos todos los usuarios
usuarios.getUsuarios = function(callback){
    if(connection){
        connection.query('SELECT * FROM tblusuarios',function (error, rows) {
            if( error ){
                throw error;
            }else{
                callback(null,rows);
            }
        });
    }
}

// Obtenemos un usuario por su id
usuarios.getUsuarioById = function(id,callback){
    if(connection){
        var sql = 'SELECT * FROM tblusuarios WHERE iduser = ' + connection.escape(id);
        connection.query(sql,function (error, row) {
            if( error ){
                throw error;
            }else{
                callback(null,row);
            }
        });
    }
}

// Añadir un nuevo usuario
usuarios.insertUsuario = function(usuarioData,callback){
    if(connection){
        var sql = 'INSERT INTO tblusuarios SET ?';
        connection.query(sql,usuarioData,function (error, result) {
            if( error ){
                throw error;
            }else{
                callback(null,result.insertId);
            }
        });
    }
}

// Actualizar usuario
usuarios.updateUsuario = function(usuarioData,callback){
    if(connection){
        var sql = 'UPDATE tblusuarios SET username = '+connection.escape(usuarioData.username)+' WHERE iduser = '+usuarioData.iduser;
        connection.query(sql,usuarioData,function (error, result) {
            if( error ){
                throw error;
            }else{
                callback(null,{"mensaje":"Registro actualizado"});
            }
        });
    }
}

// Eliminar un usuario por su id
usuarios.deleteUsuario = function(id,callback){
    if(connection){
        var sql = 'DELETE FROM tblusuarios WHERE id = ' + connection.escape(id);
        connection.query(sql,function (error, result) {
            if( error ){
                throw error;
            }else{
                callback(null,{"mensaje":"Registro borrado"});
            }
        });
    }
}

module.exports = usuarios;
