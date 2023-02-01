//We require mssql package for this sample
var sqlcon = require('mssql');

// console.log({sqlcon});

// named pipe:  np:\\.\pipe\LOCALDB#DB8C2658\tsql\query

function GetSQLData(queryCallback){        //A callback function is taken as an argument. Once the operation is completed we will be calling this
   
    //SQL Configuration
    var config = {
        r:'localhost\\SQL2K14'
        ,server: '(localdb)\\TestDB1'
        /*
            Since my SQL is an instance I am using 'localhost\\Instance'.
            If you have SQL installed on the default instance, it should be server:'localhost'
        */
        ,database: 'olmsted_SAHD_MDB'        //You can use any database here
        ,options: {
            trustedConnection: true
        }
    };

    var connection = new sqlcon.ConnectionPool(config, function(err) {
        //In case of an error print the error to the console. You can have your customer error handling
        if (err) {
            console.log('---------- ERROR ----------');
            console.log(err.code);
            console.log('exitCode:', process.exitCode);
            throw new Error('This is a problem');
            // process.exit( process.exitCode );
        }

        //Query Database
        var dbQuery = new sqlcon.Request(connection);
        //Purposely we are delaying the results
        dbQuery.query("WAITFOR DELAY '00:00:05';SELECT * FROM INFORMATION_SCHEMA.TABLES",function(err,resultset){
            //In case of an error print the error to the console. You can have your customer error handling
            if (err) console.log(err);
           
            //Passing the resultset to the callback function
            queryCallback(resultset);
        })
    });
}
function callback (resultset){
    console.dir('Results returned and printed from the call back function');
    console.dir(resultset);
   
    //Exit the application
    console.dir('Exiting the Application');
    process.exit(0);
}
//Calling the function
console.dir('Calling GetSQLData');
GetSQLData(callback);
/*
    Once we call this function even there's a delay to return the results
    you will see the next line printing 'Waiting for callback function to get invoked...'
*/
console.dir('Waiting for callback function to get invoked...');
