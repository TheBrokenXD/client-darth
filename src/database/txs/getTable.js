const { Pool } = require('pg');

async function getTable() {
    const pool = new Pool({
        connectionString: process.env.databaseUrl || 'postgresql://zddtqnqu:g5_M_m1EOyLlS4YOtkMlEeBeIInFvf7Z@chunee.db.elephantsql.com/zddtqnqu',
    });
    try {
        var result = await pool.query('SELECT * FROM DemoTxs');
        pool.end();
        return result;
    } catch (err) {
        console.log(err);
        pool.end();
    }
}

module.exports = getTable;