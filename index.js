var fetch    = require('node-fetch');
var low      = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter  = new FileSync('db.json');
var db       = low(adapter);

// Set some defaults
db.defaults({busdata:[]}).write()

// Request bus data from MBTA
async function getBusLocations(){
	var url = 'https://api-v3.mbta.com/vehicles?api_key=1f32777cd1f14b9e8e5380221429af10&filter[route]=1&include=trip';	
	var response = await fetch(url);
	var json     = await response.json();
	return json.data;
}
async function run() {
	var busdata= await getBusLocations();
	busdata.forEach(bus=>{
		db.get('busdata')
		.push(bus)
		.write()
	})

}
var startTime = new Date().getTime();
var intervalID = setInterval(()=>{
	console.log("setInterval")
	if (new Date().getTime()-startTime>1000*60*60){
		console.log("stop time")
		clearInterval(intervalID);
		return;
	}
	run();
},15000);
