const conection = require('./conexion');
var mysql = require('mysql');
var connection = mysql.createConnection(conection);

var usuarios={};

// Obtener todos los usuarios
usuarios.getUsuarios=function (callback) {
    if (connection) {
        connection.query('SELECT * FROM tblusuarios',function (error,rows) {
            if (error) {
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
}

// Obtener usuario por su id
usuarios.getUsuariosById=function (id, callback) {
    if (connection) {
        var sql='SELECT * FROM tblusuarios WHERE iduser =' + connection.escape(id);
        connection.query(sql,function (error,rows) {
            if (error) {
                throw error;
            }else{
                callback(null, rows);
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



//revisa rutas conf maquina a las usadas, idioma coincida en rutas 