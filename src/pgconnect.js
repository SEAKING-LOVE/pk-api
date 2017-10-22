const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pkapi';
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
