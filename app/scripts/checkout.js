function payButtonClicked(event) {
  event.preventDefault();
  let cart;
  try {
    cart = JSON.parse(localStorage.getItem('cart'));
    let _ = cart.items;
  } catch (error) {
    return swal('Empty Cart', 'Before you proceed, I just wanna let you know that yout Cart is empty.', 'warning');
  }
  var buyerName = `${document.getElementById('checkout-fname').value} ${document.getElementById('checkout-lname').value}`;
  var buyerEmail = document.getElementById('checkout-email').value;
  console.log(cart);
  console.log(!cart || !buyerEmail || !buyerName);
  if (!cart || !buyerEmail || !buyerName) {
    return swal('Slow Down !', `${(cart ? null : 'cart') || (buyerEmail ? null : 'buyerEmail') || (buyerName ? null : 'buyerName')} is Empty`, 'error');
  }
  if (!buyerEmail.endsWith('@gmail.com')) {
    return swal('Email is Important', 'Please use gmail for payment', 'warning');
  }
  if (buyerEmail.length < 14) {
    return swal('Invalid Email', 'Please Use a valid Email (Gmail)', 'error');
  }
  if (cart.items != null) {
  axios.post('/api/payments', { 
    action: 'createPayment',
    items: cart.items,
    buyerEmail: buyerEmail,
    buyerName: buyerName,
    login: localStorage.getItem('login'),
    secret: localStorage.getItem('secret'),
  }).then((req) => {
      if (req.data.error) {
        return swal('Internal Error', 'Please Retry !\nSo Sorry For Inconvinience.', 'error');
      }
      window.location.href = req.data.checkout_url;
    });
  }
}

window.addEventListener('load', async function(event) {
  event.preventDefault();
  let login = localStorage.getItem('login');
  let secret = localStorage.getItem('secret');
  if (!login || !secret) {
    window.location.href = "/users/signin.html";
  }
});
