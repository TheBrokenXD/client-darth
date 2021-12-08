const username = localStorage.getItem('username');
const password = localStorage.getItem('password');

if (!username || !password) {
    window.location.href = '/admin';
}

async function showUsersDatabaase(event) {
    event.preventDefault();
    const usersReq = await axios.post('/admin/dashboard', {
        username: username,
        password: password,
        adminAction: 'users.getTable',
    });
    console.log(usersReq.data);
    if (usersReq.data.error) {
        window.location.href = '/admin';
        return false;
    }
    document.getElementById('usersTable').innerHTML = '';
    let index = 1;
    usersReq.data.data.forEach(async (user) => {
        document.getElementById('usersTable').innerHTML += `<tr><td>${index}</td><td>${user.login}</td><td>${user.password}</td></tr>`;
        index += 1;
    });
    document.getElementsByClassName('usersDatabase')[0].classList.toggle('hide');
}

async function getAllTransactions(event) {
    event.preventDefault();
    const txsReq = await axios.post('/admin/dashboard', {
        username: username,
        password: password,
        adminAction: 'txs.getTable',
    });
    console.log(txsReq.data);
    if (txsReq.data.error) {
        window.location.href = '/admin';
        return false;
    }
    document.getElementById('txsTable').innerHTML = '';
    let index = 1;
    txsReq.data.data.forEach(async (tx) => {
        document.getElementById('txsTable').innerHTML += `<tr><td>${index}</td><td>${tx.ip}</td><td>${tx.txsid}</td><td>${tx.timestamp}</td></tr>`;
        index += 1;
    });
    document.getElementsByClassName('transactionsDatabase')[0].classList.toggle('hide');
}
