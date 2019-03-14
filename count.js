var fetch    = require('node-fetch');
var low      = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter  = new FileSync('db.json');
var db       = low(adapter);

// Set some defaults
db.defaults({ busdata: [] }).write()

var count = db.get('busdata')
			  .size()
			  .value()
console.log(count);
