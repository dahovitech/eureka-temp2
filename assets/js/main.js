/**
 * EUREKA CRM - SCRIPT PRINCIPAL
 * Version: 1.0
 * Auteur: jprud67
 */

(function($) {
  'use strict';

  // ===== INITIALISATION =====
  $(document).ready(function() {
    initTooltips();
    initPopovers();
    initSearchBox();
    initNotifications();
    initDropdowns();
    initFormValidation();
    initAnimations();
  });

  // ===== TOOLTIPS =====
  function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // ===== POPOVERS =====
  function initPopovers() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }

  // ===== SEARCH BOX =====
  function initSearchBox() {
    const searchInput = $('.search-box .form-control');
    
    searchInput.on('focus', function() {
      $(this).parent().addClass('focused');
    });
    
    searchInput.on('blur', function() {
      $(this).parent().removeClass('focused');
    });

    // Recherche globale (placeholder pour AJAX)
    searchInput.on('input', function() {
      const query = $(this).val();
      if (query.length >= 3) {
        // TODO: Implémenter la recherche AJAX
        console.log('Recherche:', query);
      }
    });
  }

  // ===== NOTIFICATIONS =====
  function initNotifications() {
    $('#notificationsBtn').on('click', function(e) {
      e.preventDefault();
      showNotificationsDropdown();
    });

    $('#messagesBtn').on('click', function(e) {
      e.preventDefault();
      showMessagesDropdown();
    });
  }

  function showNotificationsDropdown() {
    // TODO: Charger et afficher les notifications
    console.log('Afficher les notifications');
  }

  function showMessagesDropdown() {
    // TODO: Charger et afficher les messages
    console.log('Afficher les messages');
  }

  // ===== DROPDOWNS =====
  function initDropdowns() {
    $('.dropdown-toggle').dropdown();
  }

  // ===== VALIDATION FORMULAIRES =====
  function initFormValidation() {
    // Validation Bootstrap
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  // ===== ANIMATIONS =====
  function initAnimations() {
    // Fade in des cards au chargement
    $('.card, .stat-card').each(function(index) {
      $(this).css({
        'opacity': '0',
        'transform': 'translateY(20px)'
      });
      
      setTimeout(() => {
        $(this).css({
          'opacity': '1',
          'transform': 'translateY(0)',
          'transition': 'all 0.4s ease'
        });
      }, index * 50);
    });
  }

  // ===== UTILITAIRES =====

  // Formater les nombres
  window.formatNumber = function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Formater la monnaie
  window.formatCurrency = function(amount, currency = '€') {
    return formatNumber(amount) + ' ' + currency;
  };

  // Formater les dates
  window.formatDate = function(date, format = 'DD/MM/YYYY') {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', year);
  };

  // Afficher un toast de notification
  window.showToast = function(message, type = 'info') {
    // Utilisation de SweetAlert2 ou Bootstrap Toast
    console.log(`Toast ${type}:`, message);
    
    // TODO: Implémenter avec SweetAlert2
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  // Afficher une confirmation
  window.showConfirm = function(title, text, callback) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#292A5F',
        cancelButtonColor: '#dc2626',
        confirmButtonText: 'Oui, confirmer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed && callback) {
          callback();
        }
      });
    } else {
      if (confirm(text)) {
        callback();
      }
    }
  };

  // Copier dans le presse-papier
  window.copyToClipboard = function(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copié dans le presse-papier', 'success');
      });
    } else {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Copié dans le presse-papier', 'success');
    }
  };

  // Débounce pour les inputs
  window.debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Gestion des actions de tableau
  window.deleteRecord = function(id, type) {
    showConfirm(
      'Confirmer la suppression',
      `Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.`,
      function() {
        // TODO: Appel AJAX pour supprimer
        console.log(`Suppression de ${type} #${id}`);
        showToast('Élément supprimé avec succès', 'success');
        
        // Recharger le tableau ou supprimer la ligne
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    );
  };

  window.editRecord = function(id, type) {
    console.log(`Édition de ${type} #${id}`);
    // TODO: Rediriger vers la page d'édition ou ouvrir un modal
  };

  window.viewRecord = function(id, type) {
    console.log(`Affichage de ${type} #${id}`);
    // TODO: Rediriger vers la page de détail
  };

})(jQuery);
