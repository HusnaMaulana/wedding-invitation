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

(function () {
	const track = document.getElementById("galleryTrack");
	const prev = document.getElementById("galleryPrev");
	const next = document.getElementById("galleryNext");
	if (!track || !prev || !next) return;

	const originals = Array.from(track.querySelectorAll(".g-item"));
	const N = originals.length;
	if (N === 0) return;

	function makeClones() {
		return originals.map((el, i) => {
			const c = el.cloneNode(true);
			c.removeAttribute("data-fancybox");
			c.setAttribute("aria-hidden", "true");
			c.setAttribute("tabindex", "-1");
			c.dataset.clone = "true";
			c.addEventListener("click", (e) => {
				e.preventDefault();
				originals[i].click();
			});
			return c;
		});
	}
	makeClones().forEach((c) => track.insertBefore(c, originals[0]));
	makeClones().forEach((c) => track.appendChild(c));

	const step = () => originals[0].getBoundingClientRect().width;

	function jumpTo(left) {
		track.style.scrollSnapType = "none";
		track.scrollTo({ left, behavior: "instant" });
		requestAnimationFrame(() => (track.style.scrollSnapType = ""));
	}

	let index = N; 
	jumpTo(N * step());

	function go(delta) {
		index += delta;
		track.scrollTo({ left: index * step(), behavior: "smooth" });
	}
	next.addEventListener("click", () => go(1));
	prev.addEventListener("click", () => go(-1));

	let timer;
	track.addEventListener(
		"scroll",
		() => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				let i = Math.round(track.scrollLeft / step());
				if (i < N) i += N;
				else if (i >= 2 * N) i -= N;
				if (i !== Math.round(track.scrollLeft / step())) jumpTo(i * step());
				index = i;
			}, 120);
		},
		{ passive: true },
	);

	window.addEventListener("resize", () => {
		index = N + (((index % N) + N) % N);
		jumpTo(index * step());
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

	const guest = new URLSearchParams(location.search).get("to");
	if (guest) $("rsvpGuest").textContent = guest;

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
		const name = guest || "Tamu";
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
    li.className = 'wedding-wish-item';

    var n = document.createElement('strong');
    n.className = 'wedding-wish-item-name';
    n.textContent = name;

    var p = document.createElement('p');
    p.className = 'wedding-wish-item-text';
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
})()});