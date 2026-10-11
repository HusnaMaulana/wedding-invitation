export function initGallery() {
  const el = document.getElementById("gallerySwiper");
  if (!el || typeof Swiper === "undefined") return;

  const swiper = new Swiper(el, {
    loop: true,
    speed: 600,
    grabCursor: true,
    keyboard: { enabled: true },
    slidesPerView: 2,
    breakpoints: {
      768: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    },
    navigation: { prevEl: "#galleryPrev", nextEl: "#galleryNext" },
    a11y: {
      prevSlideMessage: "Foto sebelumnya",
      nextSlideMessage: "Foto berikutnya",
    },
  });

  if (typeof jQuery === "undefined" || !jQuery.fancybox) return;
  const $ = jQuery;

  const originalIndex = (slide) => {
    const i = slide.getAttribute("data-swiper-slide-index");
    return i === null ? $(slide).index() : Number(i);
  };
  const photos = [];
  $(el).find(".swiper-slide").each(function () {
    const i = originalIndex(this);
    if (!photos[i]) photos[i] = $(this).find("a")[0];
  });

  const closeBtn =
    '<button type="button" data-fancybox-close ' +
    'class="fancybox-button fancybox-button--close gallery-lightbox-close" ' +
    'title="{{CLOSE}}" aria-label="{{CLOSE}}">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 10.6 6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/>' +
    "</svg></button>";

  $(el).on("click", ".swiper-slide a", function (e) {
    e.preventDefault();
    const index = originalIndex($(this).closest(".swiper-slide")[0]);

    $.fancybox.open(
      photos,
      {
        loop: true,
        backFocus: false,
        touch: { vertical: true, momentum: true },
        animationEffect: "zoom",
        transitionEffect: "slide",

        buttons: ["zoom", "close"],
        btnTpl: { close: closeBtn },
        idleTime: false,

        mobile: {
          idleTime: false,
          clickContent: false,
          clickSlide: "close",
          animationEffect: "fade", 
        },

        lang: "id",
        i18n: {
          id: {
            CLOSE: "Tutup",
            NEXT: "Berikutnya",
            PREV: "Sebelumnya",
            ERROR: "Foto tidak dapat dimuat.",
            ZOOM: "Perbesar",
          },
        },
        afterClose: function (instance) {
          swiper.slideToLoop(instance.currIndex, 0);
        },
      },
      index,
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGallery);
} else {
  initGallery();
}