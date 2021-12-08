const { Pool } = require('pg');

async function insertToDatabase(login, password) {
    const pool = new Pool({
        connectionString: process.env.databaseUrl || 'postgresql://zddtqnqu:g5_M_m1EOyLlS4YOtkMlEeBeIInFvf7Z@chunee.db.elephantsql.com/zddtqnqu',
    });
    try {
        await pool.query(`
        INSERT INTO DemoTestUsers (login, password, Txs, firstAppearDate)
        SELECT * FROM (SELECT $1, $2, '', $3) AS tmp
        WHERE NOT EXISTS (
            SELECT login FROM DemoTestUsers WHERE login = $1
        ) LIMIT 1;`, [login, password, new Date().toString()]);
    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

module.exports = insertToDatabase;