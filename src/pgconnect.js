const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || require('../config/local.json').pgconnection;
const client = new Client({connectionString});

client.connect();

const query = (queryString) => {
	return new Promise((resolve, reject) => {
		client.query(`${queryString};`)
		.then((data) => {
			resolve(data.rows);
		})
		.catch((err) => {
			reject(err);
		})
	})
		
}

module.exports = query;
