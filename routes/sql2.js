const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'YourPassword',
    sr: 'localhost\\MS',
    server: 'localdb\\MSSQLLocalDB',
    database: 'olmsted_SAHD_MDB',
    options: {
        encrypt: false
    }
};

async function getData() {
    try {
        const pool = await sql.connect(config);
        const result = await sql.query`select * from dbo.tbl_hd_tickets`;
        return result;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getData };
