var Livre = require('../model/livreModel')

var livreController = {
    //liste livres
    listeLivres : function(req,res) {
        Livre.find( {}, {_id:0})
            .then( (livres) => res.json(livres))
            .catch( (err) => res.json(err.message))
    },

    // Liste des titres des livres
    titreLivres : function(req,res) {
        Livre.find( {affichage: req.query = titre}, {_id:0})
            .then( (livres) => res.json(livres))
            .catch( (err) => res.json(err.message))
    },

    // Livre num ?
    numeroLivres : function(req,res) {
        Livre.findOne( {numero:req.params.num}, {_id:0})
            .then( (livres) => { 
                if(livres == null) res.json({status:0, message:"Le livre n'existe pas"})
                else res.json(livres)
            })
            .catch( (err) => res.json(err.message))
    },

    // liste des pages du livre ?
    pagesLivre : function(req,res) {
        Livre.findOne( {numero:req.params.num}, {_id:0 ,pages:1})
            .then( (livres) => { 
                if(livres == null) res.json({status:0, message:"Le livre n'existe pas"})
                else res.json(livres)
            })
            .catch( (err) => res.json(err.message))
    },

    // une page d'un livre
    pageLivre : function(req,res) {
        Livre.findOne( {numero:req.params.num}, {_id:0 ,pages:1})
            .then( (livres) => { 
                if(livres == null) res.json({status:0, message:"Le livre n'existe pas"})
                else if (livres.pages[req.params.page] == null) res.json({status:0, message:"La page n'existe pas"})
                else res.json({page: livres.pages[req.params.page]})
            })
            
            .catch( (err) => res.json(err.message))
    },

    // ajout livre
    ajout : function(req,res) {
        var livre = new Livre(req.body)
        livre.validate()
            .then( () => { console.log("validé")
                        return livre.save() } )
            .then( () => res.json({message: "livre ajouté"}) )
            .catch( (err) => res.json(err.message))
    },

    delete : function(req,res) {
        Livre.deleteOne( {numero:req.params.num})
        .then( (status) => {
            if(status.n == 0) res.json({message: "livre n'existe pas"})
            else res.json({message: "livre supprimé"})
        })
        .catch( (err) => console.error(err.message))
    },

    update : function(req ,res) {
        Livre.updateOne( {numero : req.body.numero}, req.body)
        .then( (status) => {
            if (status.n == 0) res.json({message: "livre n'existe pas"})
            else res.json({message: "livre modifié"})
        })
        .catch( (err ) => res.json({message: err.message}))
    }


}

module.exports = livreController

/*


// ajout livre
var livre1 = new Livre ( {
    numero : 12,
    titre : 'developper pour les nuls',
    pages :  ['javascript', ' mongoose']
})

livre1.save()
    .then( () => console.log("ajouté"))
    .catch( (err) => console.log(err.message))

livre1.validate()
    .then( () => console.log("validé"))
    .catch( (err) => console.log(err.message))

//Suppression livre
Livre.deleteOne( {numero:12})
    .then( (livres) => {
        if(livres.n == 0) console.log("livre n'existe pas")
        else console.log(livres.n + "livre supprimé")
    })
    .catch( (err) => console.error(err.message))


// modification livre  
Livre.updateOne( {numero:10}, {titre : 'le rouge et ...'}, {runValidators : true})
    .then( (status) => console.log(status.n + "livre modifié"))
    .catch( (err) => console.error(err.message))


/*app.get('/', function(req,res){
    res.send('API de gestion de livres')
})

app.get('/livres', function(req,res){
    res.send('Liste des livres')
})

app.get('/livres/:numLivre', function(req,res){
    res.send('Livre numero '+req.params.numLivre)
})

app.get('/livres/:numLivre/pages', function(req,res){
    res.send('Liste pages du livre numero '+req.params.numLivre)
})

app.get('/livres/:numLivre/pages/:numPage', function(req,res){
    res.send('Page '+ req.params.numPage +' du livre numero '+req.params.numLivre)
})

app.post('/livres', function(req,res) {
    res.send('Ajout d\'un livre '+req.body.titre+ ' et de numero '+ req.body.numero)
})

app.delete('/livres/:numLivre',function(req,res){
    res.send('suppression du livre '+ req.params.numLivre)
})

app.put('/livres', function(req,res) {
    res.send('modification du livre numero ' + req.body.numero)
})


app.get('/livres', function(req,res){
    res.json({status:0, message:biblio})
})

app.get('/livres/:numLivre', function(req,res){
    var index = biblio.findIndex((livre) => livre.numero == req.params.numLivre)
    if (index != -1) {
        res.json({status:0, message:biblio[index]})
    } else {
        res.json({status:0, message:'le livre n\'existe pas'})
    }
})

app.get('/livres/:numLivre/pages', function(req,res){
    var index = biblio.findIndex((livre) => livre.numero == req.params.numLivre)
    if (index != -1) {
        res.json({status:0, message:biblio[index].pages})
    } else {
        res.json({status:0, message:'le livre n\'existe pas'})
    }
})

app.get('/livres/:numLivre/pages/:numPage', function(req,res){
    var index = biblio.findIndex((livre) => livre.numero == req.params.numLivre)
    console.log("index : "+index)
    console.log(biblio[index].pages.length)
    if (index != -1) { 
        if ( req.params.numPage == 0 || req.params.numPage > biblio[index].pages.length) {
            res.json({status:0, message:'la page n\'existe pas'})
        }else {        
            res.json({status:0, message:(biblio[index].pages[req.params.numPage-1])})
        }
    } else  {
        res.json({status:0, message:'le livre n\'existe pas'})
    }
})

app.post('/livres', function(req,res) {
    res.send('Ajout d\'un livre '+req.body.titre+ ' et de numero '+ req.body.numero)
})

app.delete('/livres/:numLivre',function(req,res){
    res.send('suppression du livre '+ req.params.numLivre)
})

app.put('/livres', function(req,res) {
    res.send('modification du livre numero ' + req.body.numero)
})
 */
