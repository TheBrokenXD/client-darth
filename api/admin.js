const users = require('../src/database/users');
const txs = require('../src/database/txs');

// works !
async function admin(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.send({ success: false, error: true, message: 'LOGIN_FIELD_EMPTY' });
    }
    if (req.body.username === 'admin' && req.body.password === 'admin' && req.body.adminAction === 'users.getTable') {
        await users.createTable();
        return res.send({
            error: false,
            success: true,
            data: (await users.getTable()).rows
        });
    }
    if (req.body.username === 'admin' && req.body.password === 'admin' && req.body.adminAction === 'txs.getTable') {
        await txs.createTable();
        return res.send({
            error: false,
            success: true,
            data: (await txs.getTable()).rows
        });
    }
    return res.send({ success: false, error: true, message: 'INVALID_USERNAME_OR_PASSWORD' });
}

module.exports = admin;