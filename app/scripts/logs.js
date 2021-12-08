const username = localStorage.getItem('username');
const password = localStorage.getItem('password');

if (!username || !password) {
    window.location.href = '/admin';
}

async function getAdminLogs(event) {
    event.preventDefault();
    const adminLogsReq = await axios.post('/admin/logs', {
        username: username,
        password: password,
    });
    console.log(adminLogsReq.data);
    if (adminLogsReq.data.error) {
        window.location.href = '/admin';
        return false;
    }
    var table = document.createElement('table');
    document.getElementsByClassName('logs')[0].appendChild(table);
    adminLogsReq.data.data.reverse();
    adminLogsReq.data.data.unshift({ ips: "IP", log: "Log", timestamp: "Timestamp" });
    adminLogsReq.data.data.forEach((row) => {
        var tr = table.insertRow();
        for (var column in row) {
            var td = tr.insertCell();
            td.innerHTML = row[column];
        }
    });
    document.querySelector('.button').hidden = true;
}
