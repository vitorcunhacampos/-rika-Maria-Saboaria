function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}

$('.mobile-btn').click(function () {
  $(this).toggleClass('active');
  $('.menu-nav').toggleClass('mobile-menu');
});

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

// clicar no h1 volta ao inicio
$('.quemsomos h1').click(function (e) {
  e.preventDefault();
  $('html, body').animate(
    {
      scrollTop: 0,
    },
    1500,
  );
});

$('.qualidade h1').click(function (e) {
  e.preventDefault();
  $('html, body').animate(
    {
      scrollTop: 0,
    },
    1500,
  );
});

$('.produtos h1').click(function (e) {
  e.preventDefault();
  $('html, body').animate(
    {
      scrollTop: 0,
    },
    1500,
  );
});

// animações com scroll

(function () {
  var $esseAnimacomSroll = $('.anime');
  var animationClass = 'anime-init';
  var $esseAnimacomSroll_i = $('.anime-i');
  var animationClass_i = 'anime-i-init';
  var offset = ($(window).height() * 3.75) / 4;

  function animeScroll() {
    var documentTop = $(document).scrollTop();

    $($esseAnimacomSroll).each(function () {
      itemTop = $(this).offset().top;
      if (documentTop > itemTop - offset) {
        $(this).addClass(animationClass);
      } else {
        $(this).removeClass(animationClass);
      }
      if (this.classList.contains('tw')) {
      }
    });

    $($esseAnimacomSroll_i).each(function () {
      itemTop = $(this).offset().top;
      if (documentTop > itemTop - offset) {
        $(this).addClass(animationClass_i);
      } else {
        $(this).removeClass(animationClass_i);
      }
    });
  }

  animeScroll();
  $(document).scroll(
    debounce(function () {
      animeScroll();
    }, 15),
  );
})();

// Produtos mais informações

$('[data-group]').each(function () {
  var $allClick = $(this).find('[data-click]');
  $allTarget = $(this).find('[data-target]');
  activeClass = 'active';

  $allClick.click(function (e) {
    e.preventDefault();
    var id = $(this).data('click'),
      $target = '[data-target="' + id + '"]';

    $($target).toggleClass(activeClass);
    $(this).toggleClass(activeClass);
  });
});

// Scroll Suave

$('.menu-nav a').click(function (e) {
  e.preventDefault();
  var id = $(this).attr('href');
  var targetOffset = $(id).offset().top - 100;
  console.log(targetOffset);

  $('html, body').animate(
    {
      scrollTop: targetOffset,
    },
    1500,
  );
});

$('.logo').click(function () {
  $('html, body').animate(
    {
      scrollTop: 0,
    },
    1500,
  );
});

function animeScroll() {
  var scrollTop = $(window).scrollTop();

  $('.sessao').each(function () {
    var height = $(this).height();
    var offsetTop = $(this).offset().top;
    var id = $(this).attr('id');
    var $itemMenu = $('[href="#' + id + '"]');
    if (offsetTop < scrollTop + 200 && offsetTop + height > scrollTop + 200) {
      $itemMenu.addClass('active');
    } else {
      $itemMenu.removeClass('active');
    }
  });
}

$(window).scroll(
  debounce(function () {
    animeScroll();
  }, 200),
);

// Type Writer
function TypeWriter(elemento) {
  const textoArray = elemento.innerHTML.split('');
  elemento.innerHTML = '';
  textoArray.forEach((element, i) => {
    setTimeout(() => {
      elemento.innerHTML += element;
    }, 75 * (i + 1));
  });
}

const dados = document.querySelector('.qualidadeP');
TypeWriter(dados);
setInterval(() => {
  TypeWriter(dados);
}, 40000);

const slide = new Slide('.slide', '.slide-wrapper');

slide.init();

const slidei = new Slide('.beneficioss', '.container-beneficios');
slidei.init();
