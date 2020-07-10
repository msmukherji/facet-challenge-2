const Pool = require('pg').Pool
const pool = new Pool({
  // user: 'me',
  host: '127.0.0.1',
  database: 'moneyz',
  password: '',
  port: 5432,
})

//^these should go in a separate file with restrictive permissions, not in version control

const getBalanceItems = (req, res) => {
	pool.query('SELECT * FROM balance_item ORDER BY item_id DESC', (error, results) => {
		if (error) {
			throw error
		}

		res.status(200).json(results.rows);
	})
}

const createBalanceItem = (req, res) => {
	const name = req.body.itemName
	const balance = parseInt(req.body.itemBalance, 10) // this needs to use the right type of numeric!
	const balanceType = req.body.itemType
	
	const queryString = `INSERT INTO balance_item (item_name, item_balance, item_balance_type) VALUES ($1, $2, $3)`

	pool.query(queryString, [name, balance, balanceType], (error, results) => {
		if (error) {
			throw error
		}

		res.status(201).send(`Balance Item added with ID: ${results.insertId}`)
	})
}

const getAssetTotal = (req, res) => {
	pool.query("SELECT SUM(item_balance) FROM balance_item WHERE item_balance_type = 'asset'", (error, results) => {
		if (error) {
			throw error
		}

		res.status(200).json(results.rows[0].sum)
	})
}

const getLiabilityTotal = (req, res) => {
	 pool.query("SELECT SUM(item_balance) FROM balance_item WHERE item_balance_type = 'liability'", (error, results) => {
		if (error) {
			throw error
		}

		res.status(200).json(results.rows[0].sum)
	})
}

const getNet = (req, res) => {
	pool.query('SELECT (SELECT SUM(item_balance) FROM balance_item WHERE item_balance_type = \'asset\') - (SELECT SUM(item_balance) FROM balance_item WHERE item_balance_type = \'liability\') AS total', (error, results) => {
		if (error) {
			throw error
		}

		res.status(200).json(results.rows[0].total)
	})
}

const deleteBalanceItem = (req, res) => {
	const itemID = parseInt(req.params.id);

	pool.query('DELETE FROM balance_item WHERE item_id = $1', [itemID], (error, results) => {
		if (error) {
			throw error
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