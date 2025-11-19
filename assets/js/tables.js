/**
 * EUREKA CRM - CONFIGURATION DATATABLES
 * Version: 1.0
 * Auteur: jprud67
 */

(function($) {
  'use strict';

  // Configuration globale DataTables
  $.extend(true, $.fn.dataTable.defaults, {
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/fr-FR.json'
    },
    pageLength: 10,
    lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Tous"]],
    responsive: true,
    dom: '<"row mb-3"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>rt<"row mt-3"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
    drawCallback: function() {
      // Appliquer les styles Eureka aux contrôles DataTables
      $('.dataTables_paginate .pagination').addClass('pagination-custom');
    }
  });

  // ===== TABLE DOSSIERS =====
  window.initFilesTable = function(tableId) {
    const table = $(tableId || '#filesTable');
    if (table.length === 0) return;

    return table.DataTable({
      columns: [
        { data: 'id', title: 'ID' },
        { data: 'reference', title: 'Référence' },
        { data: 'client', title: 'Client' },
        { data: 'status', title: 'Statut', render: renderStatus },
        { data: 'amount', title: 'Montant', render: renderAmount },
        { data: 'date', title: 'Date', render: renderDate },
        { data: 'commercial', title: 'Commercial' },
        { data: null, title: 'Actions', orderable: false, render: renderActions }
      ],
      order: [[0, 'desc']],
      columnDefs: [
        {
          targets: 0,
          width: '60px'
        },
        {
          targets: 3,
          className: 'text-center'
        },
        {
          targets: 4,
          className: 'text-end'
        },
        {
          targets: -1,
          className: 'text-center',
          width: '120px'
        }
      ]
    });
  };

  // ===== TABLE CLIENTS =====
  window.initCustomersTable = function(tableId) {
    const table = $(tableId || '#customersTable');
    if (table.length === 0) return;

    return table.DataTable({
      columns: [
        { data: 'id', title: 'ID' },
        { data: 'name', title: 'Nom' },
        { data: 'siret', title: 'SIRET' },
        { data: 'email', title: 'Email' },
        { data: 'phone', title: 'Téléphone' },
        { data: 'city', title: 'Ville' },
        { data: 'files_count', title: 'Dossiers', className: 'text-center' },
        { data: null, title: 'Actions', orderable: false, render: renderActions }
      ],
      order: [[1, 'asc']],
      columnDefs: [
        {
          targets: 0,
          width: '60px'
        },
        {
          targets: -1,
          className: 'text-center',
          width: '120px'
        }
      ]
    });
  };

  // ===== TABLE DOCUMENTS =====
  window.initDocumentsTable = function(tableId) {
    const table = $(tableId || '#documentsTable');
    if (table.length === 0) return;

    return table.DataTable({
      columns: [
        { data: 'id', title: 'ID' },
        { data: 'name', title: 'Nom du fichier' },
        { data: 'type', title: 'Type', render: renderFileType },
        { data: 'size', title: 'Taille', render: renderFileSize },
        { data: 'uploaded_by', title: 'Ajouté par' },
        { data: 'uploaded_at', title: 'Date', render: renderDate },
        { data: null, title: 'Actions', orderable: false, render: renderDocumentActions }
      ],
      order: [[5, 'desc']],
      columnDefs: [
        {
          targets: 0,
          width: '60px'
        },
        {
          targets: 2,
          className: 'text-center',
          width: '100px'
        },
        {
          targets: 3,
          className: 'text-end',
          width: '100px'
        },
        {
          targets: -1,
          className: 'text-center',
          width: '140px'
        }
      ]
    });
  };

  // ===== TABLE NOTES =====
  window.initNotesTable = function(tableId) {
    const table = $(tableId || '#notesTable');
    if (table.length === 0) return;

    return table.DataTable({
      columns: [
        { data: 'id', title: 'ID' },
        { data: 'title', title: 'Titre' },
        { data: 'type', title: 'Type', render: renderNoteType },
        { data: 'file', title: 'Dossier' },
        { data: 'author', title: 'Auteur' },
        { data: 'created_at', title: 'Date', render: renderDate },
        { data: null, title: 'Actions', orderable: false, render: renderActions }
      ],
      order: [[5, 'desc']],
      columnDefs: [
        {
          targets: 0,
          width: '60px'
        },
        {
          targets: 2,
          className: 'text-center'
        },
        {
          targets: -1,
          className: 'text-center',
          width: '120px'
        }
      ]
    });
  };

  // ===== TABLE RAPPELS =====
  window.initRemindersTable = function(tableId) {
    const table = $(tableId || '#remindersTable');
    if (table.length === 0) return;

    return table.DataTable({
      columns: [
        { data: 'id', title: 'ID' },
        { data: 'title', title: 'Titre' },
        { data: 'priority', title: 'Priorité', render: renderPriority },
        { data: 'date', title: 'Date', render: renderDate },
        { data: 'file', title: 'Dossier' },
        { data: 'status', title: 'Statut', render: renderReminderStatus },
        { data: null, title: 'Actions', orderable: false, render: renderActions }
      ],
      order: [[3, 'asc']],
      columnDefs: [
        {
          targets: 0,
          width: '60px'
        },
        {
          targets: [2, 5],
          className: 'text-center'
        },
        {
          targets: -1,
          className: 'text-center',
          width: '120px'
        }
      ]
    });
  };

  // ===== RENDERERS =====

  function renderStatus(data) {
    const statusMap = {
      'nouveau': '<span class="badge badge-nouveau">Nouveau</span>',
      'negociation': '<span class="badge badge-negociation">En Négociation</span>',
      'negocie': '<span class="badge badge-negocie">Négocié</span>',
      'signe': '<span class="badge badge-signe">Signé</span>',
      'reporte': '<span class="badge badge-reporte">Reporté</span>',
      'annule': '<span class="badge badge-annule">Annulé</span>'
    };
    return statusMap[data] || data;
  }

  function renderAmount(data) {
    return formatCurrency(data);
  }

  function renderDate(data) {
    if (!data) return '-';
    const date = new Date(data);
    return formatDate(date);
  }

  function renderFileType(data) {
    const icons = {
      'pdf': '<i class="fas fa-file-pdf text-danger"></i>',
      'doc': '<i class="fas fa-file-word text-primary"></i>',
      'docx': '<i class="fas fa-file-word text-primary"></i>',
      'xls': '<i class="fas fa-file-excel text-success"></i>',
      'xlsx': '<i class="fas fa-file-excel text-success"></i>',
      'jpg': '<i class="fas fa-file-image text-info"></i>',
      'jpeg': '<i class="fas fa-file-image text-info"></i>',
      'png': '<i class="fas fa-file-image text-info"></i>',
      'zip': '<i class="fas fa-file-archive text-warning"></i>'
    };
    const ext = data.toLowerCase();
    return icons[ext] || '<i class="fas fa-file"></i>';
  }

  function renderFileSize(data) {
    const kb = data / 1024;
    const mb = kb / 1024;
    
    if (mb >= 1) {
      return mb.toFixed(2) + ' MB';
    } else {
      return kb.toFixed(2) + ' KB';
    }
  }

  function renderNoteType(data) {
    const types = {
      'reunion': '<span class="badge bg-primary">Réunion</span>',
      'appel': '<span class="badge bg-success">Appel</span>',
      'email': '<span class="badge bg-info">Email</span>',
      'tache': '<span class="badge bg-warning">Tâche</span>',
      'decision': '<span class="badge bg-purple">Décision</span>',
      'probleme': '<span class="badge bg-danger">Problème</span>'
    };
    return types[data] || data;
  }

  function renderPriority(data) {
    const priorities = {
      'haute': '<span class="badge bg-danger">Haute</span>',
      'moyenne': '<span class="badge bg-warning">Moyenne</span>',
      'basse': '<span class="badge bg-secondary">Basse</span>'
    };
    return priorities[data] || data;
  }

  function renderReminderStatus(data) {
    const statuses = {
      'pending': '<span class="badge bg-warning">En attente</span>',
      'completed': '<span class="badge bg-success">Complété</span>',
      'cancelled': '<span class="badge bg-secondary">Annulé</span>'
    };
    return statuses[data] || data;
  }

  function renderActions(data, type, row) {
    return `
      <div class="action-buttons">
        <button class="btn-action btn-action-view" onclick="viewRecord(${row.id}, 'file')" title="Voir">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn-action btn-action-edit" onclick="editRecord(${row.id}, 'file')" title="Modifier">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-action btn-action-delete" onclick="deleteRecord(${row.id}, 'file')" title="Supprimer">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  }

  function renderDocumentActions(data, type, row) {
    return `
      <div class="action-buttons">
        <button class="btn-action btn-action-view" onclick="viewDocument(${row.id})" title="Voir">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn-action btn-action-edit" onclick="downloadDocument(${row.id})" title="Télécharger">
          <i class="fas fa-download"></i>
        </button>
        <button class="btn-action btn-action-delete" onclick="deleteRecord(${row.id}, 'document')" title="Supprimer">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  }

  // Fonctions globales pour les documents
  window.viewDocument = function(id) {
    console.log('Voir document #' + id);
    // TODO: Ouvrir le document dans un modal ou nouvel onglet
  };

  window.downloadDocument = function(id) {
    console.log('Télécharger document #' + id);
    // TODO: Déclencher le téléchargement
  };

})(jQuery);
