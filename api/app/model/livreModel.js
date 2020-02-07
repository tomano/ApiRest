let mongoose = require('mongoose')

mongoose.Promise = global.Promise

let Schema = mongoose.Schema

let livreSchema = new Schema ({
    numero:{type: Number, index:true, unique:true},
    titre:{type: String, index:true},
    pages: [ {type: String, index:true} ]
})

var Livre = mongoose.model("livre",livreSchema)

module.exports = Livre