// Run - npm install mysql2
// Run the node filename.js this file

const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'Customers' // replace with your MySQL database name
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');

  // Perform an INSERT query to add a new customer
  const newCustomer = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890'
  };

  connection.query('INSERT INTO customers SET ?', newCustomer, (err, result) => {
    if (err) {
      console.error('Error executing INSERT query:', err);
    } else {
      console.log('Record inserted successfully');
      console.log('Inserted record ID:', result.insertId);

      // Perform a SELECT query to retrieve all customers after insertion
      connection.query('SELECT * FROM customers', (err, results) => {
        if (err) {
          console.error('Error executing SELECT query:', err);
        } else {
          console.log('All records after insertion:', results);
        }

        // Close the connection
        connection.end((err) => {
          if (err) {
            console.error('Error closing connection:', err);
          } else {
            console.log('Connection closed');
          }
        });
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
