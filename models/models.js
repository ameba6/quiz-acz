var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
															{dialect: "sqlite", storage: "quiz.sqlite"}
															);

var quiz_path = path.join(__dirname,'quiz');

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; // exportar definicion de la tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function (){
	// then(...) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function (count){
		if (count === 0) { // la tabla se inicializa solo si esta vacía
			Quiz.create({pregunta: 'Capital de Italia',
									 respuesta: 'Roma'
									})
			.then(function(){console.log('Base de datos inicializada')});
		};
	});
});
