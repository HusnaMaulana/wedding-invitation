// ============================================================
//  Mobile Sidebar Navigation
// ============================================================
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

  // Close sidebar when a nav link is tapped
  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', closeSidebar);
  });

  // Close sidebar on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });
});

// ============================================================
//  AOS Init (if present)
// ============================================================
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

	const id = setInterval(tick, 1000); // create the timer first...
	tick(); // ...then run the first update
})();

(function () {
	const track = document.getElementById("galleryTrack");
	const prev = document.getElementById("galleryPrev");
	const next = document.getElementById("galleryNext");
	if (!track || !prev || !next) return;

	const originals = Array.from(track.querySelectorAll(".g-item"));
	const N = originals.length;
	if (N === 0) return;

	/* ---- 1. Build 3 sets: [clones] [originals] [clones] ---- */
	function makeClones() {
		return originals.map((el, i) => {
			const c = el.cloneNode(true);
			c.removeAttribute("data-fancybox"); // keep the lightbox gallery free of duplicates
			c.setAttribute("aria-hidden", "true");
			c.setAttribute("tabindex", "-1");
			c.dataset.clone = "true";
			c.addEventListener("click", (e) => {
				// a clone opens its original in the lightbox
				e.preventDefault();
				originals[i].click();
			});
			return c;
		});
	}
	makeClones().forEach((c) => track.insertBefore(c, originals[0]));
	makeClones().forEach((c) => track.appendChild(c));

	const step = () => originals[0].getBoundingClientRect().width;

	/* instant scroll without snapping or smooth animation */
	function jumpTo(left) {
		track.style.scrollSnapType = "none";
		track.scrollTo({ left, behavior: "instant" });
		requestAnimationFrame(() => (track.style.scrollSnapType = ""));
	}

	let index = N; // position in the 3N list; N = first original
	jumpTo(N * step());

	/* ---- 2. Buttons: always one photo at a time ---- */
	function go(delta) {
		index += delta;
		track.scrollTo({ left: index * step(), behavior: "smooth" });
	}
	next.addEventListener("click", () => go(1));
	prev.addEventListener("click", () => go(-1));

	/* ---- 3. After scrolling stops, jump back to the middle set if we are in a clone ---- */
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

	/* ---- 4. Keep the position correct on resize ---- */
	window.addEventListener("resize", () => {
		index = N + (((index % N) + N) % N);
		jumpTo(index * step());
	});
})();