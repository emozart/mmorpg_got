const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

function UsuariosDAO(url, dbName){
    this._url = url;
    this._dbName = dbName;
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    
    MongoClient.connect(this._url, function(err, client) {
        assert.equal(null, err);
      
        const db = client.db(this._dbName);
      
        db.collection('usuarios').insertOne(usuario, function(err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            client.close();
        });
    });    
}

module.exports = function(){
    return UsuariosDAO;
}