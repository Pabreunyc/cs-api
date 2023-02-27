const sql = require('mssql');

/**
 *  $connectionInfo = array("UID" => "CloudSAb1ea4703", "pwd" => "{your_password_here}",
 *  "Database" => "SA-Testing", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
 *  $serverName = "tcp:sa-testing.database.windows.net,1433";
 */
// MSSQLLocalDB
const config = {
    user: 'CloudSAb1ea4703',
    password: 's#k1z9a6',
    sr: 'localhost\\MS',
    server: 'sa-testing.database.windows.net',
    database: 'SA-Testing',
    options: {
        encrypt: true
    }
};

async function getData() {
    try {
        const pool = await sql.connect(config);
        console.log('Connection made');
        // const result = await sql.query`select * from dbo.tbl_hd_tickets`;
        // return result;
    } catch (err) {
        console.log(err);
    }
}

getData();
