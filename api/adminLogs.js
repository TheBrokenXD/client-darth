const logs = require('../src/database/logs');

// works !
async function adminLogs(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.send({ success: false, error: true, message: 'LOGIN_FIELD_EMPTY' });
    }
    if (req.body.username === 'admin' && req.body.password === 'admin') {
        await logs.createTable();
        return res.send({
            error: false,
            success: true,
            data: (await logs.getTable()).rows
        });
    }
    return res.send({ success: false, error: true, message: 'INVALID_USERNAME_OR_PASSWORD' });
}

module.exports = adminLogs;