export function initNavbar() {
  const header          = document.querySelector('.header');
  const toggleBtn       = document.getElementById('mobileNavToggle');
  const sidebar         = document.getElementById('sidebarNav');
  const overlay         = document.getElementById('sidebarOverlay');
  const closeBtn        = document.getElementById('sidebarClose');
  const sidebarLinks    = document.querySelectorAll('.sidebar-menu a');
  const allNavLinks     = document.querySelectorAll('.wedding-nav .nav-link, .sidebar-menu a');
  const sections        = Array.from(document.querySelectorAll('section[id]'));

  // Active section detection (ScrollSpy)
  function updateActiveSection() {
    const scrollPos = window.scrollY + 120;
    let currentId = '';

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
        break;
      }
    }

    // If near bottom of the page, activate the last section
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) {
      if (sections.length > 0) {
        currentId = sections[sections.length - 1].getAttribute('id');
      }
    }

    // Default to the first section if near top
    if (!currentId && sections.length > 0 && window.scrollY < (sections[0].offsetTop + 200)) {
      currentId = sections[0].getAttribute('id');
    }

    if (currentId) {
      allNavLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  // Floating navbar on scroll
  function handleScroll() {
    if (header) {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    updateActiveSection();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', updateActiveSection, { passive: true });
  handleScroll();

  // Instant active link update on click
  allNavLinks.forEach((link) => {
    link.addEventListener('click', function () {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        allNavLinks.forEach((l) => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Mobile sidebar navigation
  if (sidebar) {
    function openSidebar() {
      sidebar.classList.add('active');
      overlay?.classList.add('active');
      document.body.classList.add('sidebar-open');
    }

    function closeSidebar() {
      sidebar.classList.remove('active');
      overlay?.classList.remove('active');
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
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar);
} else {
  initNavbar();
}
