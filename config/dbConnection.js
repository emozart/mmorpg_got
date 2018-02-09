/* importar o mongodb */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb:localhost:27017';
const dbName = 'got';

var connMongoDB = function(){
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        
        return client;
    });
}

module.exports = function(){
    return connMongoDB;    
}