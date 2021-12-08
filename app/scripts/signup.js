window.addEventListener('load', async function(event) {
  event.preventDefault();
  let login = localStorage.getItem('login');
  let secret = localStorage.getItem('secret');
  if (login && secret) {
    window.location.href = "/users/user.html";
  }
});

async function signUp(event) {
  event.preventDefault();
  const login = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('con-password').value;
  if (password !== confirmPassword) {
    return swal('Woah !', 'The Password\'s Don\'t Match', 'error');
  }
  const req = await axios.post('/api/signup', {
    login: login,
    secret: password,
  });
  if (req.data.error) {
    if (req.data.message === 'LOGIN_USER_EXISTS') {
      return swal('Hey Kanger !', 'User With This Email Already Exists  !', 'warning');
    }
    if (req.data.message === 'INTERNAL_ERROR') {
      return swal('Internal Error', 'Please Refrsh The Page !', 'warning').then(() => {
        return window.location.reload();
      });
    }
  }
  if (req.data.message === 'SIGNUP_SUCCESS') {
    swal('Success !', 'You Have Successfully Signed Up !', 'success').then(() => {
      localStorage.setItem('login', login);
      localStorage.setItem('secret', secret);
      window.location.href = '/';
    });
  }
}
