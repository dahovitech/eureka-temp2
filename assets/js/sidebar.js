/**
 * EUREKA CRM - SIDEBAR MANAGEMENT
 * Version: 1.0
 * Auteur: jprud67
 */

(function() {
  'use strict';

  // Éléments DOM
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleSidebar');
  const closeBtn = document.getElementById('closeSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const navLinks = document.querySelectorAll('.sidebar-menu .nav-link');

  // Toggle sidebar sur mobile
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.add('show');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }

  // Fermer sidebar
  function closeSidebar() {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Fermer sidebar au clic sur un lien (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 992) {
        closeSidebar();
      }
    });
  });

  // Gestion de la navigation active
  function setActiveNav() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (href === fileName || href.endsWith('/' + fileName)) {
        link.classList.add('active');
      }
      
      // Cas spécial pour index.html et dashboard
      if (fileName === 'index.html' && (href === 'index.html' || href === '../index.html')) {
        link.classList.add('active');
      }
    });
  }

  // Initialiser l'état actif au chargement
  setActiveNav();

  // Gérer le resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth >= 992) {
        closeSidebar();
      }
    }, 250);
  });

})();
