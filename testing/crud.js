// const sql = require('mssql');
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const async = require('async');

// Create connection to database
// host: '10.231.6.86',
let config = {
    server: 'VM-Windy10',
    host: '192.168.1.197',
    authentication: {
        type: 'default',
        options: {
          userName: 'sa', //Username 'sa' was added to server 'users'
          password: 'sql-123-sql', //Password set up during addition of 'sa' user. 
        }
    },
    options: {
        encrypt: false
    }
};
// server: '10.231.6.86' -- deprecated: Setting the TLS ServerName to an IP address is not permitted by RFC 6066. 
let connection = new Connection(config);

function Start(callback) {
    console.log('Starting...');
    callback(null, 'Jake', 'United States');
}

function Insert(name, location, callback) {
    console.log("Inserting '" + name + "' into Table...");

    request = new Request(
        'INSERT INTO TestSchema.Employees (Name, Location) OUTPUT INSERTED.Id VALUES (@Name, @Location);',
        function(err, rowCount, rows) {
        if (err) {
            callback(err);
        } else {
            console.log(rowCount + ' row(s) inserted');
            callback(null, 'Nikita', 'United States');
        }
        });
    request.addParameter('Name', TYPES.NVarChar, name);
    request.addParameter('Location', TYPES.NVarChar, location);

    // Execute SQL statement
    connection.execSql(request);
}

function Update(name, location, callback) {
    console.log("Updating Location to '" + location + "' for '" + name + "'...");

    // Update the employee record requested
    request = new Request(
    'UPDATE TestSchema.Employees SET Location=@Location WHERE Name = @Name;',
    function(err, rowCount, rows) {
        if (err) {
        callback(err);
        } else {
        console.log(rowCount + ' row(s) updated');
        callback(null, 'Jared');
        }
    });
    request.addParameter('Name', TYPES.NVarChar, name);
    request.addParameter('Location', TYPES.NVarChar, location);

    // Execute SQL statement
    connection.execSql(request);
}

function Delete(name, callback) {
    console.log("Deleting '" + name + "' from Table...");

    // Delete the employee record requested
    request = new Request(
        'DELETE FROM TestSchema.Employees WHERE Name = @Name;',
        function(err, rowCount, rows) {
        if (err) {
            callback(err);
        } else {
            console.log(rowCount + ' row(s) deleted');
            callback(null);
        }
        });
    request.addParameter('Name', TYPES.NVarChar, name);

    // Execute SQL statement
    connection.execSql(request);
}

function Read(callback) {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
        'SELECT Id, Name, Location FROM TestSchema.Employees;',
        function(err, rowCount, rows) {
            if (err) {
                callback(err);
            } else {
                console.log(rowCount + ' row(s) returned');
                callback(null);
            }
        }
    );

    // Print the rows read
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });

    // Execute SQL statement
    connection.execSql(request);
}

function Complete(err, result) {
    if (err) {
        callback(err);
    } else {
        console.log("Done!");
    }
}

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    console.log('Event: connect');
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');

    // Execute all functions in the array serially
    async.waterfall([
        Start
    ], (err, res) => {
        if(err) {
            console.error(err);
        } else {
            console.log('Done!');
            console.dir(res);
            connection.close();
        }
    });
/* 
    async.waterfall([
        Start,
        Insert,
        Update,
        Delete,
        Read
    ], Complete);
     */
  }
});
connection.on('end', () => {
    console.log('Event: end');
});
connection.on('done', (rowCount) => {
    console.log('Event: done');
})

connection.connect();