const fastify = require('fastify')({ logger: false, });
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const api = require('./api');
const bots = require('./app/bots.json');
const adminLogs = require('./src/database/logs');

fastify.register(require('fastify-formbody'));
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'app'),
  prefix: '/',
});
(async () => {
  await adminLogs.createTable();
})();

// Admin
fastify.get('/admin', async (req, res) => {
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] GET \'/admin\'');
  console.log(chalk.magentaBright(`[ Request ] GET "${chalk.green('/admin')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return res.header('Content-Type', 'text/html;charset=utf-8;').send(fs.createReadStream(path.join(__dirname, 'app', 'admin', 'index.html')));
});
fastify.get('/admin/dashboard', async (req, res) => {
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] GET \'/admin/dashboard\'');
  console.log(chalk.magentaBright(`[ Request ] GET "${chalk.green('/admin/dashboard')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return res.header('Content-Type', 'text/html;charset=utf-8;').send(fs.createReadStream(path.join(__dirname, 'app', 'admin', 'dashboard.html')));
});
fastify.get('/admin/logs', async (req, res) => {
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] GET \'/admin/logs\'');
  console.log(chalk.magentaBright(`[ Request ] GET "${chalk.green('/admin/logs')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return res.header('Content-Type', 'text/html;charset=utf-8;').send(fs.createReadStream(path.join(__dirname, 'app', 'admin', 'logs.html')));
});
fastify.post('/admin', async (req, res) => {
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] POST \'/admin\'');
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/admin')}" IP "${chalk.green(req.ips || req.ip)}"`));
  const { username, password } = req.body;
  if (username === (process.env.adminUsername || 'admin') && password === (process.env.adminPassword || 'admin')) {
    await adminLogs.insertToDatabase(req.ips || req.ip, '[ Info ] Admin Login Successfull');
    console.log(chalk.magentaBright(`[ Info ] Admin Login Successfull`));
    return res.send({
      error: false,
      success: true,
      message: 'LOGIN_SUCCESSFUL',
    });
  }
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Info ] Admin Login Failed');
  console.log(chalk.magentaBright(`[ Info ] Admin Login Failed`));
  return res.send({
    error: true,
    success: false,
    message: 'INVALID_USERNAME_OR_PASSWORD',
  });
});
fastify.post('/admin/dashboard', async (req, res) => {
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] POST \'/admin/dashboard\'');
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/admin/dashboard')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.admin(req, res);
});
fastify.post('/admin/logs', async (req, res) => {
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] POST \'/admin/logs\'');
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/admin/logs')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.adminLogs(req, res);
});

// Login
fastify.post('/api/login', async (req, res) => {
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] POST \'/api/login\'');
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/login')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.login(req, res);
});

// SignUp
fastify.post('/api/signup', async (req, res) => {
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] POST \'/api/signup\'');
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/signup')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.signup(req, res);
});

// Payments
fastify.post('/api/payments', async (req, res) => {
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] POST \'/api/payments\'');
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/payments')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.payments.createTransaction(req, res);
});

// Account Info
fastify.post('/api/accountInfo', async (req, res) => {
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/accountInfo')}" IP "${chalk.green(req.ips || req.ip)}"`));
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] POST \'/api/accountInfo\'');
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/accountInfo')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.accountInfo(req, res);
});

// Bots
fastify.post('/api/bots.json', async (req, res) => {
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] POST \'/api/bots.json\'');
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/bots.json')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return res.send(bots);
});

// Contact
fastify.post('/api/contact', async (req, res) => {
  await adminLogs.insertToDatabase(req.ips || req.ip, '[ Request ] POST \'/api/contact\'');
  console.log(chalk.magentaBright(`[ Request ] POST "${chalk.green('/api/contact')}" IP "${chalk.green(req.ips || req.ip)}"`));
  return api.contact(req, res);
});

// Run the server !
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, '0.0.0.0');
    console.log(chalk.magentaBright(`[ Info ] Server Started At ${chalk.green('http://localhost:')}${process.env.PORT || 3000}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();