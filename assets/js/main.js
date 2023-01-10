(function ($) {
  "use strict";

  /*------------------------------------------------------------------
  [Table of contents]
  
  FIXICAFE MEANMENU INIT JS
  FIXICAFE ACCORDION CUSTOM JS
  FIXICAFE BANNER SLIDER JS
  FIXICAFE FOOD SLIDER JS
  FIXICAFE SYNC SLIDER JS
  FIXICAFE MAGNIFIC POPUP JS
  FIXICAFE WOW ANIMATION JS
  FIXICAFE STICKY MENU JS
  FIXICAFE GOOGLE MAP JS
  
  
  -------------------------------------------------------------------*/

  /*--------------------------------------------------------------
  CUSTOM PRE DEFINE FUNCTION
  ------------------------------------------------------------*/
  /* is_exist() */
  jQuery.fn.is_exist = function () {
    return this.length;
  }


  $(function () {

    /*--------------------------------------------------------------
    FIXICAFE MEANMENU INIT JS
    --------------------------------------------------------------*/
    var fixicafe_menu = $('.fixicafe--manu');
    if (fixicafe_menu.is_exist()) {
      fixicafe_menu.meanmenu({
        meanMenuContainer: '.fixicafe--menu-wrap',
        meanScreenWidth: "1023"
      });
    }

    /*--------------------------------------------------------------
     FIXICAFE ACCORDION CUSTOM JS
    --------------------------------------------------------------*/
    $('#fixicafe--accordion').on('show.bs.collapse', function (e) {
      var closest = e.target.closest('.card');
      $(closest).addClass('card__active').siblings().removeClass('card__active');
    })

    /*--------------------------------------------------------------
    FIXICAFE BANNER SLIDER JS
    --------------------------------------------------------------*/
    var banner_slider = $('.fixicafe--banner-slider');
    if (banner_slider.is_exist()) {
      banner_slider.owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        center: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplay: false,
        autoplayTimeout: 5000,
        autoHeight: true,
        items: 1,
      });

    }

    /*--------------------------------------------------------------
    FIXICAFE FOOD SLIDER JS
    --------------------------------------------------------------*/
    var food_slider = $('.fixicafe--food-slider');
    if (food_slider.is_exist()) {
      food_slider.owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoHeight: false,
        items: 1,
        responsive: {
          0: {
            items: 2
          },
          600: {
            items: 2.5
          },
          768: {
            items: 2.5
          },
          1000: {
            items: 2.6
          }
        }

      });
      $('#fixicafe--testimonial-customNav .custom-nav-next').click(function () {
        food_slider.trigger('next.owl.carousel');
      })
      $('#fixicafe--testimonial-customNav .custom-nav-prev').click(function () {
        food_slider.trigger('prev.owl.carousel');
      })

    }

    /*--------------------------------------------------------------
    FIXICAFE SYNC SLIDER JS
    ------------------------------------------------------------*/

    var testimonila_sync = $('#slider1, #slider2');
    if (testimonila_sync.is_exist()) {
      var sync1 = $("#slider1");
      var sync2 = $("#slider2");
      var slidesPerPage = 5; //globaly define number of elements per page
      var syncedSecondary = true;
      sync1.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        autoplayTimeout: 3000,
        nav: true,
        autoplay: false,
        dots: false,
        loop: true,
        navText: [],
        responsiveRefreshRate: 200,
        autoplayHoverPause: true
      }).on('changed.owl.carousel', syncPosition);

      sync2
        .on('initialized.owl.carousel', function () {
          sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
          items: slidesPerPage,
          dots: false,
          margin: 0,
          nav: false,
          slideSpeed: 2000,
          autoplayTimeout: 3000,
          smartSpeed: 200,
          slideSpeed: 500,
          slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
          responsiveRefreshRate: 100,

          responsive: {
            0: {
              items: 3,
            },
            600: {
              items: 4,
            },
            768: {
              items: 4,
            },
            1000: {
              items: slidesPerPage
            }
          }
        }).on('changed.owl.carousel', syncPosition2);

      function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
          current = count;
        }
        if (current > count) {
          current = 0;
        }
        //end block
        sync2
          .find(".owl-item")
          .removeClass("current")
          .eq(current)
          .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
          sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
          sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
      }

      function syncPosition2(el) {
        if (syncedSecondary) {
          var number = el.item.index;
          sync1.data('owl.carousel').to(number, 100, true);
        }
      }

      sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
      });

    }

    /*--------------------------------------------------------------
    FIXICAFE MAGNIFIC POPUP JS
    ------------------------------------------------------------*/
    var gallery_popup = $('.fixicafe--gallery-popup');
    if (gallery_popup.is_exist()) {
      $(gallery_popup).magnificPopup({
        // delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
          verticalFit: true,
          titleSrc: function (item) {
            return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
          }
        },
        gallery: {
          enabled: true
        },
        zoom: {
          enabled: true,
          duration: 300, // don't foget to change the duration also in CSS
          opener: function (element) {
            return element.find('img');
          }
        }

      });
    }


  });/*End document ready*/


  $(window).on("resize", function () {

  }); // end window resize


  $(window).on("load", function () {

    /*--------------------------------------------------------------
    FIXICAFE WOW ANIMATION JS
    ------------------------------------------------------------*/
    var wow = new WOW({
      mobile: true,       // default
      tablet: true,
      callback: function (box) {
        if (box.classList.contains('fixicafe_animate')) {
          box.classList.add("fixicafe_img_loaded");
        }
      }
    });
    if ($(window).width() >= 768) {
      wow.init();
    }

    /*--------------------------------------------------------------
    FIXICAFE STICKY MENU JS
    ------------------------------------------------------------*/
    $(window).scroll(function () {
      if ($(window).scrollTop() > 50) {
        $('.fixicafe--header-section').addClass('sticky-menu');
      } else {
        $('.fixicafe--header-section').removeClass('sticky-menu');
      }
    }); // End Scroll Function

  }); // End window LODE

  /*--------------------------------------------------------------
  FIXICAFE GOOGLE MAP JS
  --------------------------------------------------------------*/
  var google_map = $('#map');
  if (google_map.is_exist()) {
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
      var mapOptions = {
        zoom: 11,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        disableDefaultUI: true,
        center: new google.maps.LatLng(40.6700, -73.9400),
        styles: [{ "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "hue": "#83cead" }, { "saturation": 1 }, { "lightness": -15 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "hue": "#f3f4f4" }, { "saturation": -84 }, { "lightness": 59 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "on" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "hue": "#bbbbbb" }, { "saturation": -100 }, { "lightness": 26 }, { "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -35 }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -22 }, { "visibility": "on" }] }, { "featureType": "poi.school", "elementType": "all", "stylers": [{ "hue": "#d7e4e4" }, { "saturation": -60 }, { "lightness": 23 }, { "visibility": "on" }] }]
      };
      var mapElement = document.getElementById('map');

      var map = new google.maps.Map(mapElement, mapOptions);

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6700, -73.9400),
        map: map,
        icon: 'img/map.png',
        title: 'fixicafe'
      });
      var contentString = '<div id="content">' +
        '<div id="tpw">' +
        '<h3>fixicafe' +
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 280
      });

      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () { marker.setAnimation(null); }, 750);  //time it takes for one bounce   

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
      });

    }

  }
})(jQuery);






