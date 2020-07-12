const config = require('./config')

const getBalanceItems = (req, res) => {
	config.pool.query('SELECT * FROM balance_item ORDER BY id DESC', (error, results) => {
		if (error) {
			res.status(500).send(`server error: ${error}`)
			return
		}

		res.status(200).json(results.rows);
	})
}

const createBalanceItem = (req, res) => {
	// there should be some more input validation here!
	// ideally the input could be accepted as a whole number
	// or a 2-place decimal, and the database would save it with
	// the decimal removed (i.e., in cents) - less chance of weird math
	const name = req.body.itemName
	const balance = parseFloat(req.body.itemBalance).toFixed(2)
	const balanceType = req.body.itemType
	
	const queryString = `INSERT INTO balance_item (name, amount, balance_type) VALUES ($1, $2, $3)`

	config.pool.query(queryString, [name, balance, balanceType], (error, results) => {
		if (error) {
			res.status(500).send(`server error: ${error}`)
			return
		}

		res.status(201).send(`Balance Item added with ID: ${results.insertId}`)
	})
}

const getAssetTotal = (req, res) => {
	config.pool.query("SELECT SUM(amount) FROM balance_item WHERE balance_type = 'asset'", (error, results) => {
		if (error) {
			res.status(500).send(`server error: ${error}`)
			return
		}

		res.status(200).json(results.rows[0].sum)
	})
}

const getLiabilityTotal = (req, res) => {
	 config.pool.query("SELECT SUM(amount) FROM balance_item WHERE balance_type = 'liability'", (error, results) => {
		if (error) {
			res.status(500).send(`server error: ${error}`)
			return
		}

		res.status(200).json(results.rows[0].sum)
	})
}

const getNet = (req, res) => {
	config.pool.query("SELECT COALESCE ((SELECT SUM(amount) FROM balance_item WHERE balance_type = 'asset'), 0) - (SELECT COALESCE ((SELECT SUM(amount) FROM balance_item WHERE balance_type = 'liability'), 0)) AS total", (error, results) => {
		if (error) {
			res.status(500).send(`server error: ${error}`)
			return
		}

		res.status(200).json(results.rows[0].total)
	})
}

const deleteBalanceItem = (req, res) => {
	const itemID = parseInt(req.params.id);

	config.pool.query('DELETE FROM balance_item WHERE id = $1', [itemID], (error, results) => {
		if (error) {
			res.status(500).send(`server error: ${error}`)
			return
		}

		res.status(204).send(`Balance Item ${itemID} deleted`)
	})
}

module.exports = {
	getBalanceItems,
	createBalanceItem,
	getAssetTotal,
	getLiabilityTotal,
	getNet,
	deleteBalanceItem,
}