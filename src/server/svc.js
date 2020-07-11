// service code - wrap the dao functions and perform 
// business logic (in a future iteration..)

const db = require('./dao')

const getNet = (req, res) => {
	// res.status(200).json(queryResult.rows[0].total).send(`Net assets: ${queryResult.rows[0].total}`)	
}

module.exports = {
	getNet,
}