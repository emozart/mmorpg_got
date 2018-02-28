const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

function JogoDAO(){}

JogoDAO.prototype.gerarParamentros = function(usuario){
    MongoClient.connect('mongodb://localhost:27017', function(err, client) {
        assert.equal(null, err);
      
        const db = client.db('got');
      
        db.collection('jogo').insertOne({
            usuario: usuario,
            moeda: 15,
            suditos: 10,
            temor: Math.floor(Math.random()*1000),
            sabedoria: Math.floor(Math.random()*1000),
            comercio: Math.floor(Math.random()*1000),
            magia: Math.floor(Math.random()*1000)
        }, function(err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            client.close();
        });
    }); 
}

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg){
    MongoClient.connect('mongodb://localhost:27017', function(err, client) {
        assert.equal(null, err);
      
        const db = client.db('got');
      
        db.collection('jogo').find(usuario).toArray(function(err, result){
            res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg});
        });
        
        client.close();
    }); 
}

JogoDAO.prototype.acao = function(acao){
    MongoClient.connect('mongodb://localhost:27017', function(err, client) {
        assert.equal(null, err);
      
        const db = client.db('got');

        var date = new Date();

        var tempo = null;

        switch(acao.acao){
            case 1: tempo * 60 * 60000;
            case 2: tempo * 60 * 60000;
            case 3: tempo * 60 * 60000;
            case 4: tempo * 60 * 60000;
        }

        acao.acao_termina_em = date.getTime() + tempo;
      
        db.collection('acao').insertOne(acao, function(err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            client.close();
        });
        
        client.close();
    }); 
}

module.exports = function(){
    return JogoDAO;
}