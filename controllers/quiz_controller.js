var models = require('../models/models.js');

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz){
				req.quiz = quiz;
				next();
			} else { next (new Error('No existe quizId=' + quizId));}
		}
	).catch(function(error) { next(error);});
};

//GET /quizes
exports.index = function (req, res) {
	var noQuizes = '';
	var search = req.query.search || '';
	searchSQL = '%' + search.replace(/ /g, "%") + '%';
	console.log(search);
	var whereObj = {where:["pregunta like ?", searchSQL]};
	models.Quiz.findAll(whereObj).then(function(quizes) {
		if (quizes.length === 0) {noQuizes= 'No hay preguntas que contengan "' + search + '"' };
		res.render('quizes/index.ejs',{quizes: quizes,
																	 noQuizes: noQuizes});
	}).catch(function(error) { next(error);})
};


//GET /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show', { quiz: req.quiz});
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto'
	}
	res.render('quizes/answer', {quiz: req.quiz,
															 respuesta: resultado});
};

exports.author = function(req, res){
	res.render('author', {});
};
