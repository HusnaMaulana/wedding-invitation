document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn   = document.getElementById('mobileNavToggle');
  const sidebar     = document.getElementById('sidebarNav');
  const overlay     = document.getElementById('sidebarOverlay');
  const closeBtn    = document.getElementById('sidebarClose');
  const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

  function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('sidebar-open');
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
  if (closeBtn)  closeBtn.addEventListener('click', closeSidebar);
  if (overlay)   overlay.addEventListener('click', closeSidebar);

  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', closeSidebar);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }
});

(function () {
	const timer = document.getElementById("countdownTimer");
	if (!timer) return;

	const target = new Date(timer.dataset.target).getTime();
	const els = {
		days: timer.querySelector('[data-unit="days"]'),
		hours: timer.querySelector('[data-unit="hours"]'),
		minutes: timer.querySelector('[data-unit="minutes"]'),
		seconds: timer.querySelector('[data-unit="seconds"]'),
	};
	const pad = (n) => String(n).padStart(2, "0");

	function tick() {
		const diff = Math.max(0, target - Date.now());
		els.days.textContent = pad(Math.floor(diff / 86400000));
		els.hours.textContent = pad(Math.floor(diff / 3600000) % 24);
		els.minutes.textContent = pad(Math.floor(diff / 60000) % 60);
		els.seconds.textContent = pad(Math.floor(diff / 1000) % 60);
		if (diff === 0) clearInterval(id);
	}

	const id = setInterval(tick, 1000);
	tick();
})();

(function () {
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

	// Fancybox needs jQuery. Without it the links just open the photo.
	if (typeof jQuery === "undefined" || !jQuery.fancybox) return;
	const $ = jQuery;

	// Swiper tags every slide with its original position, so the lightbox list
	// stays in the right order even after loop mode moves or clones slides.
	const originalIndex = (slide) => {
		const i = slide.getAttribute("data-swiper-slide-index");
		return i === null ? $(slide).index() : Number(i);
	};
	const photos = [];
	$(el).find(".swiper-slide").each(function () {
		const i = originalIndex(this);
		if (!photos[i]) photos[i] = $(this).find("a")[0];
	});

	$(el).on("click", ".swiper-slide a", function (e) {
		e.preventDefault();
		const index = originalIndex($(this).closest(".swiper-slide")[0]);

		$.fancybox.open(
			photos,
			{
				loop: true,
				backFocus: false,
				buttons: ["zoom", "fullScreen", "close"],
				lang: "id",
				i18n: {
					id: {
						CLOSE: "Tutup",
						NEXT: "Berikutnya",
						PREV: "Sebelumnya",
						ERROR: "Foto tidak dapat dimuat.",
						ZOOM: "Perbesar",
						FULL_SCREEN: "Layar penuh",
					},
				},
				// Slider follows the lightbox, so you land where you left off
				afterClose: function (instance, current) {
					swiper.slideToLoop(current.index, 0);
				},
			},
			index,
		);
	});
})();

(function () {
	const form = document.getElementById("rsvpForm");
	if (!form) return;

	const WA_NUMBER = "6281234567890"; 

	const $ = (id) => document.getElementById(id);
	const details = $("rsvpDetails");
	const countAkad = $("countAkad");
	const countResepsi = $("countResepsi");
	const status = $("rsvpStatus");

	const guestInput = $("rsvpGuest");
	const guestFromUrl = new URLSearchParams(location.search).get("to");
	if (guestFromUrl) guestInput.value = guestFromUrl; // ?to=Nama keeps working, still editable

	const val = (name) =>
		form.querySelector(`input[name="${name}"]:checked`)?.value;

	function refresh() {
		const attending = val("attend") === "Hadir";
		details.hidden = !attending;

		const ev = val("event");
		countAkad.hidden = ev === "Resepsi Pernikahan";
		countResepsi.hidden = ev === "Akad Nikah";
	}
	form.addEventListener("change", refresh);
	refresh();

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		const name = guestInput.value.trim();
		status.classList.toggle("text-danger", !name);
		if (!name) {
			status.textContent = "Mohon isi nama Anda terlebih dahulu.";
			guestInput.focus();
			return;
		}
		let msg;

		if (val("attend") === "Hadir") {
			const ev = val("event");
			const parts = [];
			if (ev !== "Resepsi Pernikahan")
				parts.push(`Akad Nikah: ${$("selAkad").value} orang`);
			if (ev !== "Akad Nikah")
				parts.push(`Resepsi Pernikahan: ${$("selResepsi").value} orang`);
			msg = `Assalamu'alaikum, saya ${name} mengkonfirmasi HADIR.\nAcara: ${ev}\n${parts.join("\n")}`;
		} else {
			msg = `Assalamu'alaikum, saya ${name} mohon maaf TIDAK DAPAT HADIR. Terima kasih atas undangannya.`;
		}

		window.open(
			`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
			"_blank",
			"noopener",
		);
		status.textContent = "Terima kasih, konfirmasi Anda sudah dikirim.";
	});
})();

(function () {
  'use strict';

  var form = document.getElementById('wishForm');
  if (!form) return;

  var nameInput = document.getElementById('wishName');
  var messageInput = document.getElementById('wishMessage');
  var fileInput = document.getElementById('wishFiles');
  var dropzone = document.getElementById('wishDropzone');
  var dropText = document.getElementById('wishDropzoneText');
  var sendBtn = document.getElementById('wishSend');
  var statusEl = document.getElementById('wishStatus');
  var list = document.getElementById('wishList');
  var moreBtn = document.getElementById('wishMore');
  var moreLabel = document.getElementById('wishMoreLabel');

  var DEFAULT_DROP_TEXT = dropText.textContent;
  var MAX_FILES = 5;
  var MAX_SIZE_MB = 25;

  function setStatus(text, isError) {
    statusEl.textContent = text || '';
    statusEl.classList.toggle('is-error', !!isError);
  }

  function resetFiles() {
    fileInput.value = '';
    dropText.textContent = DEFAULT_DROP_TEXT;
    dropzone.classList.remove('has-files');
  }

  function checkFiles() {
    var files = fileInput.files;
    if (!files || !files.length) { resetFiles(); return true; }

    if (files.length > MAX_FILES) {
      setStatus('You can upload up to ' + MAX_FILES + ' files.', true);
      resetFiles();
      return false;
    }
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      var okType = /^(image|video)\//.test(f.type);
      if (!okType || f.size > MAX_SIZE_MB * 1024 * 1024) {
        setStatus('Only photos or videos up to ' + MAX_SIZE_MB + ' MB are allowed.', true);
        resetFiles();
        return false;
      }
    }
    dropText.textContent = files.length === 1 ? files[0].name : files.length + ' files selected';
    dropzone.classList.add('has-files');
    setStatus('');
    return true;
  }

  fileInput.addEventListener('change', checkFiles);

  ['dragenter', 'dragover'].forEach(function (type) {
    dropzone.addEventListener(type, function (e) {
      e.preventDefault();
      dropzone.classList.add('is-dragover');
    });
  });
  ['dragleave', 'drop'].forEach(function (type) {
    dropzone.addEventListener(type, function () {
      dropzone.classList.remove('is-dragover');
    });
  });
  dropzone.addEventListener('drop', function (e) {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      checkFiles();
    }
  });


  function sendWish(data) {
    return new Promise(function (resolve) {
      setTimeout(resolve, 600);
    });
  }

  function addWishToList(name, message) {
    var li = document.createElement('li');
    li.className = 'wedding-wish-item py-1';

    var n = document.createElement('strong');
    n.className = 'd-block font-weight-normal';
    n.textContent = name;

    var p = document.createElement('p');
    p.className = 'mb-0 text-break';
    p.textContent = message;

    li.appendChild(n);
    li.appendChild(p);
    list.insertBefore(li, list.firstChild);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = nameInput.value.trim();
    var message = messageInput.value.trim();

    if (!name) { setStatus('Please enter your name.', true); nameInput.focus(); return; }
    if (!message) { setStatus('Please write your wish.', true); messageInput.focus(); return; }
    if (!checkFiles()) return;

    sendBtn.disabled = true;
    setStatus('Sending...');

    sendWish(new FormData(form))
      .then(function () {
        addWishToList(name, message);
        form.reset();
        resetFiles();
        setStatus('Thank you! Your wish has been sent.');
      })
      .catch(function () {
        setStatus('Sorry, something went wrong. Please try again.', true);
      })
      .then(function () {
        sendBtn.disabled = false;
      });
  });

  moreBtn.addEventListener('click', function () {
    var open = list.classList.toggle('is-expanded');
    moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    moreLabel.textContent = open ? 'Show less' : 'See all messages';
  });
})();

// Add inside scripts.js (jQuery is loaded before it). Gift section: copy account number.
(function ($) {
  var $status = $('#giftStatus');
  var resetTimer;

  // Old-browser / plain-HTTP fallback (Clipboard API needs HTTPS)
  function fallbackCopy(text) {
    var $tmp = $('<textarea readonly>')
      .val(text)
      .css({ position: 'fixed', top: 0, left: 0, opacity: 0 })
      .appendTo('body');
    $tmp[0].select();
    $tmp[0].setSelectionRange(0, text.length); // iOS
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    $tmp.remove();
    return ok ? $.Deferred().resolve().promise() : $.Deferred().reject().promise();
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      var d = $.Deferred();
      navigator.clipboard.writeText(text).then(d.resolve, function () {
        fallbackCopy(text).then(d.resolve, d.reject);
      });
      return d.promise();
    }
    return fallbackCopy(text);
  }

  // Delegated, so extra .gift-copy buttons work without more JS
  $(document).on('click', '.gift-copy', function () {
    var $btn = $(this);
    var number = $.trim($($btn.data('copy')).text()).replace(/\s+/g, '');
    if (!number) return;

    if (!$btn.data('label')) $btn.data('label', $btn.text());

    copyText(number)
      .done(function () {
        $btn.text('Copied').addClass('is-copied');
      })
      .always(function () {
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          $btn.text($btn.data('label')).removeClass('is-copied');
          $status.text('');
        }, 2000);
      });
  });
})(jQuery);

(function ($) {
  var $letter = $('#openingLetter');
  if (!$letter.length) return;

  var $html = $('html');
  var $btn = $('#openInvitation');

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  window.scrollTo(0, 0);
  $html.addClass('letter-locked');
  $letter.find('.letter-card').trigger('focus');

  $btn.one('click', function () {
    $html.removeClass('letter-locked');
    $letter.addClass('is-leaving');
    window.scrollTo(0, 0);

    setTimeout(function () {
      $letter.remove();
      if (window.AOS) AOS.refresh();
      $('#home').attr('tabindex', '-1')[0].focus({ preventScroll: true });
    }, 850);
  });
})(jQuery);