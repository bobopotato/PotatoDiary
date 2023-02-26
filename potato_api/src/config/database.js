require('dotenv').config();

const { createPool } = require('mysql');

const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

const executeQuery = (query, parameters) => new Promise((resolve, reject) => {
  pool.query(
    query,
    parameters,
    (error, results, fileds) => {
      if (error) {
        console.log(error)
        return reject(error);
      }
      return resolve(results);
    },
  );
});

pool.on('connection', (connection) => {
  // console.log('Pool connecting to database server...');
  connection.query('SET SESSION auto_increment_increment=1');
});

pool.on('enqueue', () => {
  // console.log('Waiting for available connection slot');
});

pool.on('release', (connection) => {
  // console.log(`Connection ${connection} releasesd`);
});

module.exports = {
  executeQuery,
};
