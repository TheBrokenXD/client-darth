const users = require('../src/database/users');

// works !
async function accountInfo(req, res) {
    if (!req.body.login || !req.body.secret) {
        return res.send({ success: false, error: true, message: 'LOGIN_FIELD_EMPTY' });
    }
    try {
        const exists = await users.getWhereLoginIs(req.body.login);
        if (exists.rowCount === 0) {
            return res.send({ success: false, error: true, message: 'USER_NOT_EXISTS' });
        } else {
            if (exists.rows[0].password === req.body.secret) {
                return res.send({ success: true, error: false, message: 'SUCCESS', data: exists.rows[0] });
            } else {
                return res.send({  success: false, error: true, message: 'INVALID_PASSWORD' });
            }
        }
    } catch (error) {
        console.log('error', error);
    }
    return res.send({ success: false, error: true, message: 'INVALID_USERNAME_OR_PASSWORD' });
}

module.exports = accountInfo;