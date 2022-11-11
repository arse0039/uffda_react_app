const mysql = require('mysql')
const db = mysql.createConnection({
    connectionLimit : 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_claphand',
    password: '6780',
    database: 'cs340_claphand'
});

module.exports = db;