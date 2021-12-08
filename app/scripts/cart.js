function removefromCart(event, id) {
  event.preventDefault();
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart.items = cart.items.filter(item => item != id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateUICart();
  return swal('Success', 'Removed That Item From Cart !', 'success');
}

async function updateCartTotal() {
  let botsInfo = await (await axios.get('/bots.json')).data;
  let cart = JSON.parse(localStorage.getItem('cart'));
  let totalAmount = 0;
  cart.items.forEach(item => {
    totalAmount += botsInfo[item].ammount;
  });
  document.getElementById('subtotalAmount').innerText = `${totalAmount} USD`;
  document.getElementById('totalAmount').innerText = `${totalAmount} USD`;
}

async function updateUICart() {
  let botsInfo = await (await axios.get('/bots.json')).data;
  let cart;
  try {
    cart = JSON.parse(localStorage.getItem('cart'));
    let _ = cart.items;
  } catch (error) {
    return swal('Hey Runner !@', 'Your Cart is Empty ! Why ?', 'info');
  }
  document.getElementById('cartItems').innerHTML = '';
  for (var i of cart.items) {
    document.getElementById('cartItems').innerHTML += `
    <tr class="table-body">
      <td><span style="cursor: pointer;" onclick="removefromCart(event, '${i}');">x</span></td>
      <td><span>${botsInfo[i].name}</span></td>
      <td><span>${botsInfo[i].ammount} USD</span></td>
      <td><span>1</span></td>
      <td><span>${botsInfo[i].ammount} USD</span></td>
    </tr>`;
  }
  await updateCartTotal();
}

window.addEventListener('load', async function(event) {
  event.preventDefault();
  let login = localStorage.getItem('login');
  let secret = localStorage.getItem('secret');
  if (!login || !secret) {
    window.location.href = "/users/signin.html";
  }
  await updateUICart();
});