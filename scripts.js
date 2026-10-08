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
