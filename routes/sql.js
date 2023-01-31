const express = require('express');
const createError = require('http-errors');
// const sql = require('mssql');
const sql = require('mssql/msnodesqlv8');
const router = express.Router();

let config;

config = {
    user: '',
    password: '' ,
    server: '(localdb)\MSSQLLocalDB',
    database: 'olmsted_SAHD_MDB'
};

// config = 'data source=ORION-II\LOCALDB#F8A9A27C;initial catalog=olmsted_SAHD_MDB;trusted_connection=true';
// config = 'Server=(localdb)\MSSQLLocalDB;Integrated Security=true';

router.all('/', function(req, res, next) {
    res.send('MS SQL, baby!');
});

router.get('/connect', (req, res, next) => {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
            return next( createError(500, 'Problem!!') );
        }

        // create Request object
        // var request = new sql.Request();
           
        // query to the database and get the records
        /*
        request.query('select * from Student', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
        */

        res.send('OK!');
    });
});
module.exports = router;
