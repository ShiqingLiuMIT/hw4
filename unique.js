var fetch    = require('node-fetch');
var low      = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter  = new FileSync('db.json');
var db       = low(adapter);

// Set some defaults
//db.defaults({ vehicles: [] }).write()


var unique= [];
var busIDs= db.get('busdata').map('id').value()

      busIDs.forEach(element => {
          if(!unique.includes(element)){
              unique.push(element)
          }
        
      });        

      console.log(unique);
