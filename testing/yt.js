const sql = require('mssql/msnodesqlv8');

const config = {
    database: 'olmsted_SAHD_MDB',
    server: '(localdb)\\TestDB1',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

sql.connect(config, (err) => {
    if(err) {
        console.log('>>> Error <<<');
        console.log(err.code);
        console.log(err.name);
        throw new Error();
    }
    
    let req = new sql.Request();
    req.query("SELECT * FROM INFORMATION_SCHEMA.TABLES", (err, rs) => {
        if(err) {
            console.log('Query error:', err.code);
            throw new Error();
        }
        console.log(rs.recordset[0]);
    });
    console.log('Connected!!');
});

