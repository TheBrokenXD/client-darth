function addToCart(event, productId) {
  event.preventDefault();
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = { items: [] };
    cart.items.push(String(productId));
    localStorage.setItem("cart", JSON.stringify(cart));
    return swal('Done', "Product added to Cart", 'success');
  }
  if (JSON.parse(localStorage.getItem("cart")).items.toString().includes(productId)) {
    return swal('Hey', "Product already exists in Cart", 'info');
  } else {
    cart.items.push(String(productId));
    swal('Done', "Product added to Cart", 'success');
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.addEventListener('load', async function(event) {
  event.preventDefault();
});