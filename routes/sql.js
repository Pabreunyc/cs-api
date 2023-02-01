const express = require('express');
const createError = require('http-errors');
const sql = require('mssql');
// const sql = require('mssql/msnodesqlv8');

const Connection = require('tedious').Connection;
const  Request = require('tedious').Request;

const router = express.Router();

let config;

config = {
    user: '',
    password: '' ,
    host: 'localhost',
    r: '(localdb)\MSSQLLocalDB',
    server: 'localhost',
    options: {
        database: 'olmsted_SAHD_MDB'
    }
};

// config = 'data source=ORION-II\LOCALDB#F8A9A27C;initial catalog=olmsted_SAHD_MDB;trusted_connection=true';
// config = 'Server=(localdb)\MSSQLLocalDB;Integrated Security=true';
// config = 'Server=localhost\MSSQLLocalDB;Database=olmsted_SAHD_MDB;trusted_connection=true';

router.all('/', function(req, res, next) {
    res.send('MS SQL, baby!');
});

router.get('/connect', (req, res, next) => {
    const connection = new Connection(config);
    // console.log('connection:', connection);

    connection.on('connect', (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Connected!');
        }
    });
    
    res.send('OK!');
});
module.exports = router;
