async function sendContactMessage(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const message = document.getElementById('full-message').value;
    if (name == '') {
        alert('Please enter your name');
    } else if (address == '') { 
        alert('Please enter your email');
    } else if (message == '') {
        alert('Please enter an message');
    }
    const req = await axios.post('/api/contact', {
        name: name,
        address: address,
        message: message,
    });
    alert(req.data.message);
    window.location.href = '/';
}