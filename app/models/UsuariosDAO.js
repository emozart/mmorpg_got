const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

function UsuariosDAO(){}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    
    MongoClient.connect('mongodb://localhost:27017', function(err, client) {
        assert.equal(null, err);
      
        const db = client.db('got');
      
        db.collection('usuarios').insertOne(usuario, function(err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            client.close();
        });
    });    
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    
    MongoClient.connect('mongodb://localhost:27017', function(err, client) {
        assert.equal(null, err);
      
        const db = client.db('got');
      
        db.collection('usuarios').find(usuario).toArray(function(err, result){
            console.log(usuario);
            if(result[0] != undefined){
                req.session.autorizado = true;
                req.session.usuario = result[0].usuario;
                req.session.casa = result[0].casa;
            }

            if(req.session.autorizado){
                res.redirect('jogo');
            }else{
                res.render('index', {validacao: {}});
            }
        });
        
        client.close();
    }); 
}

module.exports = function(){
    return UsuariosDAO;
}