const users = require('../src/database/users');

// works !
async function signup(req, res)  {
    if (!req.body.login || !req.body.secret) {
        return res.send({ success: false, error: true, message: 'LOGIN_PASSWORD_FIELDS_EMPTY' });
    }
    await users.createTable();
    var dbQuery = await users.getWhereLoginIs(req.body.login);
    if (dbQuery.rowCount != 0) {
        return res.send({ seccess: false, error: true, message: 'LOGIN_USER_EXISTS' });
    }
    await users.insertToDatabase(req.body.login, req.body.secret);
    dbQuery = await users.getWhereLoginIs(req.body.login);
    if (dbQuery.rowCount === 0) {
        return res.send({ success: false, error: true, message: 'INTERNAL_ERROR' });
    }
    return res.send({ success: true, error: false, message: 'SIGNUP_SUCCESS' });
}

module.exports = signup;