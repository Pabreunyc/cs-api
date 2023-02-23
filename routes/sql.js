const express = require('express');
const createError = require('http-errors');
var debug = require('debug')('cs-api:sql');

const sql = require('mssql');
const { request } = require('../app');
// const sql = require('mssql/msnodesqlv8');

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

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
/* 
** linux/ms-sql
config = {
    user: 'sa',
    password: 'sql-123-sql',
    server: '10.231.6.86',
};
 */
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
            debug('Connected!');
            console.log('Connected!');

            let ret = executeStatement(connection);
            return res.json(ret);
        }
    });
    
    // res.send('OK!');
});

function executeStatement(connection) {
    let re = new Request("Select 42, 'Hello, World'", (err, rowCount, rows) => {
        if(err) {
            return createError(666, err);
        } else {
            console.log('Callback:', {rowCount});
            console.log('Callback:', {row});
        }
    });

    re.on('row', (cols) => {
        cols.forEach( (c) => console.log(c));
    });
    re.on('don')
    return {
        status: true
    };
}
module.exports = router;
