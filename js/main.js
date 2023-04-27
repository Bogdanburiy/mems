$(document).ready(function () {
  function setProgress(index, $slider, $progressBar) {
    let infinite = $slider.slick("slickGetOption", "infinite");
    let calc;
    if (infinite == false) {
      let slidesToShow = $slider.slick("slickGetOption", "slidesToShow");
      calc =
        ((index + slidesToShow) / $slider.slick("getSlick").slideCount) * 100;
    } else {
      calc = ((index + 1) / $slider.slick("getSlick").slideCount) * 100;
    }

    $progressBar
      .css("background-size", `${calc}% 100%`)
      .attr("aria-valuenow", calc);
  }

  let initStatusSliderMems = false;
  $(".mems-carousel").each(function () {
    let sliderSlick = $(this),
      sliderNav = sliderSlick.next(".mems-carousel__nav"),
      progressBar = sliderNav.find(".progress-bar-mems");

    function initCallback() {
      initStatusSliderMems = true;

      setTimeout(function () {
        setProgress(0, sliderSlick, progressBar);
      }, 300);
    }

    sliderSlick.slick({
      initialize: initCallback(),
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      centerMode: true,
      prevArrow: $(".arrows-mems__prev"),
      nextArrow: $(".arrows-mems__next"),
      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    });

    // Project main page slick start
    sliderSlick.on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        setProgress(nextSlide, sliderSlick, progressBar);
      }
    );
  });

  $(".intro-carousel__slides").slick({
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    arrows: false,
    prevArrow: $(".intro-prev"),
    nextArrow: $(".intro-next"),
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
    ]
  });

  $(function () {
    $(".intro-carousel__nav .intro-prev").on("click", function () {
      $(".intro-carousel__slides").slick("slickPrev");
    });
    $(".intro-carousel__nav .intro-next").on("click", function () {
      $(".intro-carousel__slides").slick("slickNext");
    });
  });
  // Counter
  (function () {
    window.inputNumber = function (el) {
      var min = el.attr("min") || false;
      var max = el.attr("max") || false;

      var els = {};

      els.dec = el.prev();
      els.inc = el.next();

      el.each(function () {
        init($(this));
      });

      function init(el) {
        els.dec.on("click", decrement);
        els.inc.on("click", increment);

        function decrement() {
          var value = el[0].value;
          value--;
          if (!min || value >= min) {
            el[0].value = value;
          }
        }

        function increment() {
          var value = el[0].value;
          value++;
          if (!max || value <= max) {
            el[0].value = value++;
          }
        }
      }
    };
  })();

  inputNumber($(".input-number"));

  // Fixed header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 55) {
      $(".header-bottom").addClass("fixed");
    } else {
      $(".header-bottom").removeClass("fixed");
    }
  });
});
