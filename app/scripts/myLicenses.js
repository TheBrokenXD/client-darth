function noLicenses() {
  $(function() {
    $("#noLicensesDialog").dialog({
      resizable: false,
      height: "auto",
      width: "auto",
      modal: true,
      buttons: {
        "OK": function() {
          $( this ).dialog( "close" );
        },
      }
    });
  });
}

async function getBotInfo(id) {
  return await (await axios.get('/bots.json')).data[id];
}

async function downloadAsset(event, botId) {
  event.preventDefault();
  const req = await axios.post('/api/payments', {
    botId: botId,
    action: 'downloadAsset',
    login: localStorage.getItem('login'),
    secret: localStorage.getItem('secret'),
  });
  if (RegExp.data.error) {
    return window.alert('Plase Retry Later !');
  }
  var blob = new Blob([req.data.bytes.data], { type: 'application/zip' });
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = await (await getBotInfo(botId)).assetPathFile;
  link.click();
}

async function updateUI(event) {
  event.preventDefault();
  let hasALicense = false;
  const req = await axios.post('/api/payments', {
    action: 'getTxs',
    login: localStorage.getItem('login'),
    secret: localStorage.getItem('secret'),
  });
  for (var i of req.data.data.split(';')) {
    if (i == '') return false;
    txnInfo = await axios.post('/api/payments', {
      action: 'getTxInfo',
      login: localStorage.getItem('login'),
      secret: localStorage.getItem('secret'),
      txId: i,
    });
    if (txnInfo.data.data.amount == txnInfo.data.data.recieved) {
      hasALicense = true;
      for (var bot of txnInfo.data.data.checkout.invoice.split(',')) {
        document.getElementById('myLicensesList').innerHTML += `
          <div>    
            <div class="flex-licenses">
                <h4>${(await getBotInfo(bot)).name}</h4>
                <h3>${txnInfo.data.data.checkout.amountf} ${txnInfo.data.data.checkout.currency}</h3>
                <h5>Status : ${txnInfo.data.data.status_text}</h5>
                <h5 style="cursor: pointer;color: var(--color-secondary);" onclick="downloadAsset(event, '${bot}');">Download Asset</h5>
            </div>
        </div>`;
      }
    }
  }
  if (!hasALicense) {
      noLicenses();
  }
}

window.addEventListener('load', async function(event) {
  event.preventDefault();
  let login = localStorage.getItem('login');
  let secret = localStorage.getItem('secret');
  if (!login || !secret) {
    window.location.href = "/users/signin.html";
  }
  await updateUI(event);
});