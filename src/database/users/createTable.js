const { Pool } = require('pg');

async function createTable() {
    const pool = new Pool({
        connectionString: process.env.databaseUrl || 'postgresql://zddtqnqu:g5_M_m1EOyLlS4YOtkMlEeBeIInFvf7Z@chunee.db.elephantsql.com/zddtqnqu',
    });
    try {
        // Max password.length == 21; Max login.email.length == 70; Max Txs TEXT.lenght == undefined; Max firstAppearDate.lenght == 57
        await pool.query('CREATE TABLE IF NOT EXISTS DemoTestUsers (login varchar(70), password varchar(32), Txs TEXT, firstAppearDate varchar(70))');
    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

module.exports = createTable;