const localStorageUsername = localStorage.getItem('username');
const localStoragePassword = localStorage.getItem('password');

if (localStorageUsername && localStoragePassword) {
    window.location.href = '/admin/dashboard';
}

document.getElementById('adminLogin').addEventListener('click', async function(event) {
    event.preventDefault();
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    if (!username || !password) {
        document.getElementById('errorModalText').innerText = 'Please fill in all fields';
        document.getElementById('errorModal').classList.toggle('hide');
        setTimeout(function() {
            document.getElementById('errorModal').classList.toggle('hide');
        }, 5000);
        return false;
    }
    const req = await axios.post('/admin', { username: username, password: password });
    if (!req.data) {
        document.getElementById('errorModalText').innerText = 'Please refresh the page';
        document.getElementById('errorModal').classList.toggle('hide');
        setTimeout(function() {
            document.getElementById('errorModal').classList.toggle('hide');
        }, 5000);
        return false;
    }
    if (req.data.error) {
        document.getElementById('errorModalText').innerText = 'Invalid Username or Password';
        document.getElementById('errorModal').classList.toggle('hide');
        setTimeout(function() {
            document.getElementById('errorModal').classList.toggle('hide');
        }, 5000);
        return true;
    } else {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        document.getElementById('successModalText').innerText = 'Successfully logged in';
        document.getElementById('successModal').classList.toggle('hide');
        setTimeout(function() {
            document.getElementById('successModal').classList.toggle('hide');
            window.location.href = '/admin/dashboard';
        }, 5000);
        return true;
    }
});