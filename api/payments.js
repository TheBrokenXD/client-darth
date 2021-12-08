const CoinPayments = require('coinpayments');
const users = require('../src/database/users');
const txs = require('../src/database/txs');
const botsInfo = require('../app/bots.json'); 
const { join, dirname } = require('path');
const cryptoPrice = require('crypto-price');
const fs = require('fs');

const client = new CoinPayments({
    key: process.env.apiKey,
    secret: process.env.apiSecret,
});

// works
async function createTransaction(req, res) {
    if (!req.body.login || !req.body.secret) {
        return res.send({ success: false, error: true, message: 'NOT_AUTHORIZED' });
    }
    await users.createTable();
    await txs.createTable();
    var dbQuery = await users.getWhereLoginIs(req.body.login);
    if (dbQuery.rowCount === 0) {
        return res.send({ seccess: false, error: true, message: 'NOT_AUTHORIZED' });
    }
    if (req.body.action == 'getTxs') {
        try {
            dbQuery = await users.getWhereLoginIs(req.body.login);
            if (dbQuery.rows[0].password !== req.body.secret) {
                return res.send({ success: false, error: true, message: 'NOT_AUTHORIZED' });
            }
        } catch (error) {
            return res.send({ success: false, error: true, message: 'LOGIN_PASSWORD_WRONG' });
        }
        transactionIds = await (await users.getWhereLoginIs(req.body.login)).rows[0].txs;
        return res.send({ success: true, error: false, message: 'SUCCESS', data: transactionIds, });
    }
    if (req.body.action == 'getTxInfo') {
        try {
            dbQuery = await users.getWhereLoginIs(req.body.login);
            if (dbQuery.rows[0].password !== req.body.secret) {
                return res.send({ success: false, error: true, message: 'NOT_AUTHORIZED' });
            }
        } catch(error) {
            return res.send({ success: false, error: true, message: 'LOGIN_PASSWORD_WRONG' });
        }
        const txInfo = await client.getTx({ txid: req.body.txId, full: 1, });
        res.send({ success: true, error: false, message: 'SUCCESS', data: txInfo, });
    }
    if (req.body.action == 'createPayment') {
        try {
            const { items, buyerEmail, buyerName } = req.body;
            let totalAmmount = 0;
            for (var item of items) {
                totalAmmount = botsInfo[item].ammount + totalAmmount;
            }
            totalAmmount = Number(totalAmmount);
            x = await cryptoPrice.getBasePrice('USD', 'USDT');
            totalAmmount = Number(totalAmmount) * x.price;
            console.log(`${x.price * totalAmmount} USDT`);
            transaction = await client.createTransaction({
                currency1: 'USDT',
                currency2: 'USDT',
                amount: totalAmmount,
                buyer_email: buyerEmail,
                buyer_name: buyerName,
                invoice: items.toString(),
            });
            console.log(transaction);
            await users.updateTxs(req.body.login, transaction.txn_id);
            await txs.insertToDatabase(req.ips || req.ip, transaction.txn_id);
            return res.send(transaction);
        } catch (error) {
            console.log(error.message);
            return res.send({ success: false, error: true, message: error.message });
        }
    }
    if (req.body.action == 'downloadAsset') {
        try {
            dbQuery = await users.getWhereLoginIs(req.body.login);
            if (dbQuery.rows[0].password !== req.body.secret) {
                return res.send({ success: false, error: true, message: 'NOT_AUTHORIZED' });
            }
            if (botsInfo[req.body.botId] == undefined) {
                return res.send({ success: false, error: true, message: 'INVALID_ASSET_ID' });
            } else {
                for (var i of (await (await users.getWhereLoginIs(req.body.login)).rows[0].txs).split(';')) {
                    if (i == '') return false;
                    let txInfo = await client.getTx({ txid: i, full: 1, });
                    if ((txInfo.amount == txInfo.recieved) && txInfo.checkout.invoice.includes(req.body.botId)) {
                        let asset = botsInfo[req.body.botId];
                        let fileLocalPath = join(dirname(__dirname), 'assets', asset.assetPathFile);
                        res.send({ bytes: fs.readFileSync(fileLocalPath) });
                    }
                }
            }
        } catch(error) {
            return res.send({ success: false, error: true, message: 'LOGIN_PASSWORD_WRONG' });
        }
    }
    res.send({ message: 'hmm' });
}

module.exports = {
    createTransaction,
};