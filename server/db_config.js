
const mysql = require('mysql');
const db = mysql.createConnection({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_arsenaub',
    password        : '[your_db_password]',
    database        : 'cs340_arsenaub'
});

module.exports = db;