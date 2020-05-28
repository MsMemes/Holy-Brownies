function onLoadCartNumbers(productosAgregados){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.itemNumberCart p').textContent = productNumbers;
    }
}
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
onLoadCartNumbers();