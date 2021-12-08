const { Pool } = require('pg');

async function updateTxs(login, txId) {
    const pool = new Pool({
        connectionString: process.env.databaseUrl || 'postgresql://zddtqnqu:g5_M_m1EOyLlS4YOtkMlEeBeIInFvf7Z@chunee.db.elephantsql.com/zddtqnqu',
    });
    try {
        const existingTxs = await (await pool.query('SELECT * FROM DemoTestUsers WHERE login = $1', [login])).rows[0].txs;
        await pool.query(`
        UPDATE DemoTestUsers
        SET Txs = $2
        WHERE login = $1`, [login, `${existingTxs}${txId};`]);
    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

module.exports = updateTxs;