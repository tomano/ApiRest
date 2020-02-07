var express = require('express')
var app = express()
let cors = require('cors')
let mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/bibliotheque", {userNewUrlParser : true })

let db = mongoose.connection
db.on('error', console.error.bind(console, 'erreur connexion :'))
db.once('open', function() {
    console.log('connecté')
})

var routerLivre = require("./app/router/livreRouter")
app.use(routerLivre)

app.use((req,res,next) => {
    res.setHeander("Access-controle-Allow-Origin", "*")
    res.setHeander(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    )
})

app.listen(5000)




