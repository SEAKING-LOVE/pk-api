const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || require('../config/local.json').pgconnection;
const client = new Client({connectionString});

module.exports = client;