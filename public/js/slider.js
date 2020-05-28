const menuSlide = ()=>{
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const menuLinks = document.querySelectorAll('.menu li');
  
  burger.addEventListener('click', ()=>{
      //Toggle Menu
      menu.classList.toggle('menu-active');
      //Animación del Menu 
      menuLinks.forEach((link, index) =>{
          if (link.style.animation){
              link.style.animation='';
          }else{
               link.style.animation = `menuLinkFade 0.5s ease forwards ${index / 7 + .5}s`;
          }
        
      });
  });
  }

menuSlide();
/*

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}*/