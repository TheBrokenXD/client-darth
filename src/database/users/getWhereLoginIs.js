const { Pool } = require('pg');

async function getWhereLoginIs(login) {
    const pool = new Pool({
        connectionString: process.env.databaseUrl || 'postgresql://zddtqnqu:g5_M_m1EOyLlS4YOtkMlEeBeIInFvf7Z@chunee.db.elephantsql.com/zddtqnqu',
    });
    try {
        var result = await pool.query('SELECT * FROM DemoTestUsers WHERE login = $1', [login]);
        pool.end();
        return result;
    } catch (err) {
        console.log(err);
        pool.end();
    }
}

module.exports = getWhereLoginIs;