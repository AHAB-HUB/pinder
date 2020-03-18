var mysql = require('mysql');

 const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'test1'
});

module.exports = connection;
