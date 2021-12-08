const { Pool } = require('pg');

async function insertToDatabase(ips, log) {
    const pool = new Pool({
        connectionString: process.env.databaseUrl || 'postgresql://zddtqnqu:g5_M_m1EOyLlS4YOtkMlEeBeIInFvf7Z@chunee.db.elephantsql.com/zddtqnqu',
    });
    try {
        await pool.query(`
        INSERT INTO DemoAdminLogs (ips, log, timestamp) VALUES ($1, $2, $3)
        `, [ips, log, new Date().toString()]);
    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

module.exports = insertToDatabase;