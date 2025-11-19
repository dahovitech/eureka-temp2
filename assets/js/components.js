/**
 * EUREKA CRM - COMPOSANTS INTERACTIFS
 * Version: 1.0
 * Auteur: jprud67
 */

(function($) {
  'use strict';

  // ===== FILE UPLOAD ZONE =====
  window.initUploadZone = function(selector) {
    const uploadZone = $(selector);
    if (uploadZone.length === 0) return;

    const fileInput = uploadZone.find('input[type="file"]');

    // Click to upload
    uploadZone.on('click', function() {
      fileInput.click();
    });

    // Drag and drop
    uploadZone.on('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).addClass('dragover');
    });

    uploadZone.on('dragleave', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).removeClass('dragover');
    });

    uploadZone.on('drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).removeClass('dragover');

      const files = e.originalEvent.dataTransfer.files;
      handleFiles(files);
    });

    fileInput.on('change', function() {
      handleFiles(this.files);
    });

    function handleFiles(files) {
      console.log('Fichiers sélectionnés:', files);
      // TODO: Upload des fichiers via AJAX
      
      Array.from(files).forEach(file => {
        console.log(`- ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
      });

      showToast(`${files.length} fichier(s) sélectionné(s)`, 'success');
    }
  };

  // ===== SELECT2 INITIALIZATION =====
  window.initSelect2 = function(selector) {
    if (typeof $.fn.select2 === 'undefined') return;

    $(selector || 'select.select2').select2({
      theme: 'bootstrap-5',
      width: '100%',
      language: 'fr',
      placeholder: 'Sélectionner...',
      allowClear: true
    });
  };

  // ===== DATE PICKER =====
  window.initDatePicker = function(selector) {
    if (typeof flatpickr === 'undefined') return;

    flatpickr(selector || '.datepicker', {
      locale: 'fr',
      dateFormat: 'd/m/Y',
      altInput: true,
      altFormat: 'd/m/Y'
    });
  };

  // ===== TIME PICKER =====
  window.initTimePicker = function(selector) {
    if (typeof flatpickr === 'undefined') return;

    flatpickr(selector || '.timepicker', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
      locale: 'fr'
    });
  };

  // ===== DATETIME PICKER =====
  window.initDateTimePicker = function(selector) {
    if (typeof flatpickr === 'undefined') return;

    flatpickr(selector || '.datetimepicker', {
      enableTime: true,
      dateFormat: 'd/m/Y H:i',
      time_24hr: true,
      locale: 'fr'
    });
  };

  // ===== RICH TEXT EDITOR =====
  window.initRichEditor = function(selector) {
    if (typeof tinymce === 'undefined') return;

    tinymce.init({
      selector: selector || '.rich-editor',
      height: 400,
      menubar: false,
      language: 'fr_FR',
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
      ],
      toolbar: 'undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help',
      content_style: 'body { font-family: Poppins, sans-serif; font-size: 14px }'
    });
  };

  // ===== TAGS INPUT =====
  window.initTagsInput = function(selector) {
    if (typeof Tagify === 'undefined') return;

    const input = document.querySelector(selector || '.tags-input');
    if (!input) return;

    new Tagify(input, {
      maxTags: 10,
      dropdown: {
        maxItems: 20,
        classname: 'tags-dropdown',
        enabled: 0,
        closeOnSelect: false
      }
    });
  };

  // ===== MODAL HELPERS =====
  window.openModal = function(modalId) {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
  };

  window.closeModal = function(modalId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    if (modal) {
      modal.hide();
    }
  };

  // ===== FILTRES DYNAMIQUES =====
  window.initFilters = function(options) {
    const {
      filterContainer = '.filters',
      tableSelector = 'table',
      filters = {}
    } = options;

    $(filterContainer).find('select, input').on('change', function() {
      applyFilters();
    });

    function applyFilters() {
      const filterValues = {};
      
      $(filterContainer).find('select, input').each(function() {
        const name = $(this).attr('name');
        const value = $(this).val();
        
        if (value) {
          filterValues[name] = value;
        }
      });

      console.log('Filtres appliqués:', filterValues);
      
      // TODO: Appliquer les filtres au tableau DataTables
      if ($.fn.DataTable.isDataTable(tableSelector)) {
        const table = $(tableSelector).DataTable();
        // Logique de filtrage personnalisée
      }
    }
  };

  // ===== PROGRESS BAR ANIMATION =====
  window.animateProgressBar = function(selector, targetValue, duration = 1000) {
    const $progressBar = $(selector);
    if ($progressBar.length === 0) return;

    let currentValue = 0;
    const increment = targetValue / (duration / 16);

    const interval = setInterval(() => {
      currentValue += increment;
      
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(interval);
      }

      $progressBar.css('width', currentValue + '%');
      $progressBar.attr('aria-valuenow', Math.round(currentValue));
      
      // Optionnel: afficher la valeur dans le texte
      if ($progressBar.find('.progress-text').length) {
        $progressBar.find('.progress-text').text(Math.round(currentValue) + '%');
      }
    }, 16);
  };

  // ===== COUNTER ANIMATION =====
  window.animateCounter = function(selector, targetValue, duration = 2000) {
    const $counter = $(selector);
    if ($counter.length === 0) return;

    let currentValue = 0;
    const increment = targetValue / (duration / 16);

    const interval = setInterval(() => {
      currentValue += increment;
      
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(interval);
      }

      $counter.text(Math.round(currentValue));
    }, 16);
  };

  // ===== INFINITE SCROLL =====
  window.initInfiniteScroll = function(options) {
    const {
      container = window,
      threshold = 200,
      callback
    } = options;

    let loading = false;

    $(container).on('scroll', function() {
      if (loading) return;

      const scrollTop = $(this).scrollTop();
      const scrollHeight = $(this).prop('scrollHeight');
      const clientHeight = $(this).height();

      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        loading = true;
        
        if (callback && typeof callback === 'function') {
          callback(() => {
            loading = false;
          });
        }
      }
    });
  };

  // ===== COPY TO CLIPBOARD BUTTON =====
  window.initCopyButtons = function(selector) {
    $(selector || '.btn-copy').on('click', function() {
      const target = $(this).data('target');
      const text = $(target).text() || $(target).val();
      
      copyToClipboard(text);
    });
  };

  // ===== SIDEBAR COLLAPSE =====
  window.initSidebarCollapse = function() {
    $('.sidebar-menu .nav-link[data-bs-toggle="collapse"]').on('click', function(e) {
      e.preventDefault();
      const target = $(this).data('bs-target');
      $(target).collapse('toggle');
      
      $(this).toggleClass('collapsed');
    });
  };

  // ===== AUTO-SAVE FORM =====
  window.initAutoSave = function(formSelector, options = {}) {
    const {
      interval = 30000, // 30 secondes par défaut
      callback
    } = options;

    const $form = $(formSelector);
    if ($form.length === 0) return;

    let autoSaveInterval = setInterval(() => {
      const formData = $form.serialize();
      
      console.log('Auto-sauvegarde...', formData);
      
      if (callback && typeof callback === 'function') {
        callback(formData);
      } else {
        // TODO: Sauvegarder via AJAX
        showToast('Brouillon sauvegardé', 'info');
      }
    }, interval);

    // Arrêter l'auto-save lors de la soumission
    $form.on('submit', function() {
      clearInterval(autoSaveInterval);
    });
  };

  // ===== INITIALISATION AU CHARGEMENT =====
  $(document).ready(function() {
    // Init Select2
    initSelect2();
    
    // Init upload zones
    initUploadZone('.upload-zone');
    
    // Init copy buttons
    initCopyButtons();
    
    // Init sidebar collapse
    initSidebarCollapse();
  });

})(jQuery);
