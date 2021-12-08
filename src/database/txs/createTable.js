const { Pool } = require('pg');

async function createTable() {
    const pool = new Pool({
        connectionString: process.env.databaseUrl || 'postgresql://zddtqnqu:g5_M_m1EOyLlS4YOtkMlEeBeIInFvf7Z@chunee.db.elephantsql.com/zddtqnqu',
    });
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS DemoTxs (ip TEXT, txsId TEXT, timestamp TEXT)');
    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

module.exports = createTable;