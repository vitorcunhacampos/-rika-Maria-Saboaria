// slide
if (window.SimpleSlide) {

new SimpleSlide({
  slide: 'bg-menu', // nome do atributo data-slide="principal"
  nav: true, // se deve ou não mostrar a navegação
  auto: true, // se o slide deve passar automaticamente
  time: 8000, // tempo de transição dos slides
  pauseOnHover: true, // pausa a transição automática
});
}

if (window.SimpleAnime) {
new SimpleAnime();
}
// clicar no h1 volta ao inicio
$('.quemsomos h1').click(function(e){
  e.preventDefault();
  $(window).scrollTop(0);
});

$('.qualidade h1').click(function(e){
  e.preventDefault();
  $(window).scrollTop(0);
});

$('.produtos h1').click(function(e){
  e.preventDefault();
  $(window).scrollTop(0);
});

// animações com scroll

$(window).scroll( function(){

  var windowTop = $(this).scrollTop();

$('.anime').each(function (){
  if(windowTop > $(this).offset().top - 600) {
    $(this).addClass('anime-init');
  }
  else {
    $(this).removeClass('anime-init')
  }
});

$('.anime-i').each(function (){
  if(windowTop > $(this).offset().top - 600) {
    $(this).addClass('anime-i-init');
  }
  else {
    $(this).removeClass('anime-i-init')
  }
});
  
});
