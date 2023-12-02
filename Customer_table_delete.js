// Run - npm install mysql2
// Run the node filename.js this file
const mysql = require('mysql2');
const readline = require('readline');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'Customers' // replace with your MySQL database name
});

// Create an interface for reading user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');

  // Insert sample records into the "customers" table
  connection.query(`
    INSERT INTO customers (first_name, last_name, email, phone)
    VALUES
      ('John', 'Doe', 'john.doe@example.com', '123-456-7890'),
      ('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210'),
      ('Alice', 'Johnson', 'alice.johnson@example.com', '555-123-4567');
  `, (err, result) => {
    if (err) {
      console.error('Error executing INSERT query:', err);
    } else {
      console.log('Sample records inserted successfully');

      // Prompt the user for deletion confirmation
      rl.question('Do you want to delete a record? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
          // Specify the ID of the record to be deleted
          rl.question('Enter the ID of the record to delete: ', (recordIdToDelete) => {
            // Perform a DELETE query to delete the specified record
            connection.query('DELETE FROM customers WHERE id = ?', [recordIdToDelete], (err, result) => {
              if (err) {
                console.error('Error executing DELETE query:', err);
              } else {
                console.log('Record deleted successfully');
              }

              // Close the connection
              connection.end((err) => {
                if (err) {
                  console.error('Error closing connection:', err);
                } else {
                  console.log('Connection closed');
                }
                // Close the readline interface
                rl.close();
              });
            });
          });
        } else {
          console.log('Deletion canceled. Record remains in the database.');
          // Close the connection
          connection.end((err) => {
            if (err) {
              console.error('Error closing connection:', err);
            } else {
              console.log('Connection closed');
            }
            // Close the readline interface
            rl.close();
          });
        }
      });
    }
  });
});



 
/* Database name :-  Customers
  paste the below code in the sql section :- CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20)
); 

*/