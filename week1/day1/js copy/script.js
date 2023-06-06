// Toggle Menu
$('#menu-icon').click(function () {
  $(this).toggleClass('bx-x');
  $('.navlist').toggleClass('open');
});

// ScrollReveal effect
ScrollReveal({
  distance: '65px',
  duration: 2600,
  delay: 450,
  reset: true,
}).reveal('.peter-text', { delay: 200, origin: 'top' })
  .reveal('.peter-img', { delay: 450, origin: 'top' })
  .reveal('.icons', { delay: 500, origin: 'left' })
  .reveal('.scroll-down', { delay: 500, origin: 'right' });
