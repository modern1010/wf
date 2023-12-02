// install -  npm install mysql2
// run by - node filename.js
const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'testdb' // replace with your desired database name
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');

  // Create a database
  connection.query('CREATE DATABASE IF NOT EXISTS testdb', (err, results) => {
    if (err) throw err;
    console.log('Database created or already exists');

    // Use the created database
    connection.query('USE testdb', (err) => {
      if (err) throw err;
      console.log('Using database: testdb');

      // Create a table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT PRIMARY KEY AUTO_INCREMENT,
          username VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL
        )
      `;
      connection.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log('Table "users" created or already exists');

        // Close the connection
        connection.end((err) => {
          if (err) {
            console.error('Error closing connection:', err);
          } else {
            console.log('Connection closed');
          }
        });
      });
    });
  });
});

// create database in mysql - database name :- testdb

/* paste the below code in the sql section :-CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL
);
*/
