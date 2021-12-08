function logout(event) {
  event.preventDefault();
  localStorage.removeItem('login');
  localStorage.removeItem('secret');
  window.location.reload();
}

async function getBotInfo(id) {
  return await (await axios.get('/bots.json')).data[id];
}

async function getMyTxs(event) {
  event.preventDefault();
  const req = await axios.post('/api/payments', {
    action: 'getTxs',
    login: localStorage.getItem('login'),
    secret: localStorage.getItem('secret'),
  });
  console.log(req.data);
  var tabledata = [];
  var index = 1;
  for (var i of req.data.data.split(';')) {
    tabledata.push({ index: index, transactionId: i, });
  }
  new Tabulator(".txsTable", {
    height: 205,
    data: tabledata,
    layout: "fitColumns",
    columns: [
      { title: "Index", field: "index", },
      { title: "Transaction Id", field: "transactionId", hozAlign: "left", },
    ],
  });
  document.querySelector('.txsTable').classList.toggle('hide');
  document.querySelector('.accountInfo').classList.toggle('hide');
}

async function getMePayments(event) {
  event.preventDefault();
  const req = await axios.post('/api/payments', {
    action: 'getTxs',
    login: localStorage.getItem('login'),
    secret: localStorage.getItem('secret'),
  });
  let index = 1;
  for (var i of req.data.data.split(';')) {
    if (i == '') return false;
    txnInfo = await axios.post('/api/payments', {
      action: 'getTxInfo',
      login: localStorage.getItem('login'),
      secret: localStorage.getItem('secret'),
      txId: i,
    });
    document.getElementById('mePayments').innerHTML += `
      <div class="Upayments-card">
          <h4>${(await getBotInfo(txnInfo.data.data.checkout.invoice.split(',')[0])).name} ...</h4>
          <h3>${txnInfo.data.data.checkout.amountf} ${txnInfo.data.data.checkout.currency}</h3>
          <h5>Status : ${txnInfo.data.data.status_text}</h5>
      </div>`;
    if (txnInfo.data.data.amount == txnInfo.data.data.recieved) {
      document.getElementById('successfulTxs').innerHTML += `
        <div class="transaction-${index}">
          <p>${(await getBotInfo(txnInfo.data.data.checkout.invoice.split(',')[0])).name}</p>
          <p>${txnInfo.data.data.checkout.amountf} ${txnInfo.data.data.checkout.currency}</p>
          <a style="cursor: pointer;" onclick="getLicenses(event);">Get License</a>
        </div>`;
    }
    index++;
  }
  if (req.data.data.split(';').length == 2 && req.data.data.split(';')[0] == '' && req.data.data.split(';')[1] == '') {
    document.getElementById('mePayments').innerHTML += `
      <div class="Upayments-card">
        <h4>No Payments</h4>
        <h3>No Recent Payments</h3>
        <h5>Status : Empty</h5>
      </div>`;
    return false;
  }
}

function getLicenses(event) {
  event.preventDefault();
  window.location.href = '/users/myLicenses.html';
}

window.addEventListener('load', async function(event) {
  event.preventDefault();
  let login = localStorage.getItem('login');
  let secret = localStorage.getItem('secret');
  if (!login || !secret) {
    window.location.href = "/users/signin.html";
  }
  await getMePayments(event);
});