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
  $('html, body').animate({
    scrollTop: 0 }, 1500);
});

$('.qualidade h1').click(function(e){
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0 }, 1500);
});


$('.produtos h1').click(function(e){
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0 }, 1500);
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
  
  };
 });


});


// Produtos mais informações 

$('[data-group]').each(function () {

  var $allClick = $(this).find('[data-click]');
  $allTarget = $(this).find('[data-target]');
  activeClass = 'active';


  $allClick.click(function (e) {
    e.preventDefault();
    var id = $(this).data('click'),
    $target = '[data-target="'+ id +'"]';


    $($target).toggleClass(activeClass);
    $(this).toggleClass(activeClass);


    });
  });

// Scroll Suave 

  $('.menu-nav a').click(function (e) {
  e.preventDefault();
  var id = $(this).attr('href');
  var targetOffset = $(id).offset().top -100;
  console.log(targetOffset);

  $('html, body').animate({
  scrollTop: targetOffset
 }, 1500);

});


$('.logo').click(function(){
$('html, body').animate({
 scrollTop: 0
}, 1500);
});

$('.sessao').each(function(){
var height = $(this).height();
var offsetTop = $(this).offset().top;
var id = $(this).attr('id');
var $itemMenu = $('a[href="#'+ id +'"]');

  $(window).scroll(function(){
   var scrollTop = $(window).scrollTop();
   console.log(scrollTop)
   if(offsetTop < scrollTop +200 && offsetTop + height > scrollTop + 200) {
     $itemMenu.addClass('active')
   }
   else{$itemMenu.removeClass('active')}
  });
  


});


$('.mobile-btn').click(function(){
  $(this).toggleClass('active');
  $('.menu-nav').toggleClass('mobile-menu')
});

