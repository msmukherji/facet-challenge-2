// service code

const db = require('./dao')

const getNet = (req, res) => {
	console.log("HELLOW FROM THE SERVISSSS")
	results = db.getNet()
	console.log(results)
	console.log("bullshit!")
	// .then(queryResult =>
	// 	console.log("something happening here?  what it is aint exactly clear?"))
	// 	// console.log(queryResult))
	// .catch(err =>
	// 	console.log("BOOO HISS BAD SERVISSS "))
	// console.log(queryResult.rows);
	// res.status(200).json(queryResult.rows[0].total).send(`Net assets: ${queryResult.rows[0].total}`)	
}

module.exports = {
	getNet,
}