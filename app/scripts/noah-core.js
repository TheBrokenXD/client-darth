var animation = lottie.loadAnimation({
    container: document.getElementById('loader'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data.json'
});

setTimeout(function() {
    $('#loader').fadeToggle();
}, 1200);

anime({
  targets: ['div.info-abt' , 'div.ser-footer'],
  translateY: [30, 0],
  delay: 800,
  easing: 'easeInOutExpo'
});
