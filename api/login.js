const users = require('../src/database/users');

// works !
async function login(req, res) {
    if (!req.body.login || !req.body.secret) {
        return res.send({ success: false, error: true, message: 'LOGIN_FIELD_EMPTY' });
    }
    await users.createTable();
    var dbQuery = await users.getWhereLoginIs(req.body.login);
    if (dbQuery.rowCount === 0) {
        return res.send({ seccess: false, error: true, message: 'LOGIN_USER_NOT_FOUND' });
    }
    try {
        dbQuery = await users.getWhereLoginIs(req.body.login);
        if (dbQuery.rows[0].password !== req.body.secret) {
            return res.send({ success: false, error: true, message: 'LOGIN_PASSWORD_WRONG' });
        }
    } catch (error) {
        return res.send({ success: false, error: true, message: 'LOGIN_PASSWORD_WRONG' });
    }
    return res.send({ success: true, error: false, message: 'AUTHENTICATION_SUCCESSFULL' });
}

module.exports = login;