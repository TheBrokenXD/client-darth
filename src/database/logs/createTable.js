const { Pool } = require('pg');

async function createTable() {
    const pool = new Pool({
        connectionString: process.env.databaseUrl || 'postgresql://zddtqnqu:g5_M_m1EOyLlS4YOtkMlEeBeIInFvf7Z@chunee.db.elephantsql.com/zddtqnqu',
    });
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS DemoAdminLogs (ips TEXT, log TEXT, timestamp varchar(70))');
    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

module.exports = createTable;