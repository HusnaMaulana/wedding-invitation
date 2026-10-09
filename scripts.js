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

	tick();
	const id = setInterval(tick, 1000);
})();