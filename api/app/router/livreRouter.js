var express = require('express')
var routerLivre = express.Router()

var livreController = require('../controller/livreController')


var bodyParser = require('body-parser')
routerLivre.use(bodyParser.json())

routerLivre.get('/livres', livreController.listeLivres)
routerLivre.get('/livres?affichage=titre', livreController.titreLivres)
routerLivre.get('/livres/:num', livreController.numeroLivres)
routerLivre.get('/livres/:num/pages', livreController.pagesLivre)
routerLivre.get('/livres/:num/pages/:page', livreController.pageLivre)
routerLivre.post('/livres', livreController.ajout)
routerLivre.delete('/livres/:num', livreController.delete)
routerLivre.put('/livres', livreController.update)

module.exports = routerLivre
