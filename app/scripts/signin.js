window.addEventListener('load', async function(event) {
  event.preventDefault();
  let login = localStorage.getItem('login');
  let secret = localStorage.getItem('secret');
  if (login && secret) {
    window.location.href = "/users/user.html";
  }
});

async function signIn(event) {
  event.preventDefault();
  const login = document.getElementById('email').value;
  const secret = document.getElementById('password').value;
  if (!login || !secret) {
    return swal('Sorry !', 'Your Email or Password is Invalid !', 'error');
  }
  const req = await axios.post('/api/login', {
    login: login,
    secret: secret,
  });
  if (req.data.error) {
    if (req.data.message === 'LOGIN_USER_NOT_FOUND') {
      return swal('User Not Found', 'No Such User Exists, Please Sign Up First !', 'info');
    }
    if (req.data.message === 'LOGIN_PASSWORD_WRONG') {
      swal('Invalid Password', 'Sorry, But Your Password Is Wrong !', 'error').then(() => {
        return window.location.reload();
      });
    }
  }
  if (req.data.message === 'AUTHENTICATION_SUCCESSFULL') {
    swal('Success', 'You Have Successfully Signed In !', 'success').then(() => {
      localStorage.setItem('login', login);
      localStorage.setItem('secret', secret);
      window.location.href = '/';
    });
  }
}
