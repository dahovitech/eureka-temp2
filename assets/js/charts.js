/**
 * EUREKA CRM - CONFIGURATION GRAPHIQUES
 * Version: 1.0
 * Auteur: jprud67
 */

(function() {
  'use strict';

  // Configuration globale Chart.js
  if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = "'Poppins', sans-serif";
    Chart.defaults.color = '#64748b';
    Chart.defaults.plugins.legend.position = 'bottom';
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.padding = 15;
  }

  // Couleurs Eureka
  const colors = {
    primary: '#292A5F',
    secondary: '#F3E600',
    success: '#16a34a',
    warning: '#eab308',
    danger: '#dc2626',
    info: '#0ea5e9',
    gray: '#64748b'
  };

  // ===== GRAPHIQUE ÉVOLUTION CA =====
  window.initRevenueChart = function(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const defaultData = data || {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
      datasets: [
        {
          label: '2025',
          data: [45000, 52000, 48000, 61000, 58000, 65000, 72000, 68000, 75000, 82000, 78000, 85000],
          borderColor: colors.primary,
          backgroundColor: 'rgba(41, 42, 95, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3
        },
        {
          label: '2024',
          data: [38000, 42000, 41000, 48000, 51000, 54000, 58000, 55000, 62000, 68000, 65000, 70000],
          borderColor: colors.gray,
          backgroundColor: 'rgba(100, 116, 139, 0.05)',
          tension: 0.4,
          fill: true,
          borderWidth: 2,
          borderDash: [5, 5]
        }
      ]
    };

    new Chart(ctx, {
      type: 'line',
      data: defaultData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            backgroundColor: 'white',
            titleColor: colors.primary,
            bodyColor: colors.gray,
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += formatCurrency(context.parsed.y);
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            },
            grid: {
              color: '#f1f5f9'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  };

  // ===== GRAPHIQUE RÉPARTITION STATUTS =====
  window.initStatusChart = function(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const defaultData = data || {
      labels: ['Nouveau', 'En Négociation', 'Négocié', 'Signé', 'Reporté', 'Annulé'],
      datasets: [{
        data: [23, 45, 12, 67, 8, 15],
        backgroundColor: [
          colors.info,
          '#f59e0b',
          '#8b5cf6',
          colors.success,
          colors.gray,
          colors.danger
        ],
        borderWidth: 0,
        hoverOffset: 10
      }]
    };

    new Chart(ctx, {
      type: 'doughnut',
      data: defaultData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 15,
              font: {
                size: 13
              }
            }
          },
          tooltip: {
            backgroundColor: 'white',
            titleColor: colors.primary,
            bodyColor: colors.gray,
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        },
        cutout: '65%'
      }
    });
  };

  // ===== GRAPHIQUE EN BARRES =====
  window.initBarChart = function(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const defaultData = data || {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      datasets: [{
        label: 'Dossiers créés',
        data: [12, 19, 8, 15, 22, 5, 3],
        backgroundColor: colors.primary,
        borderRadius: 8
      }]
    };

    new Chart(ctx, {
      type: 'bar',
      data: defaultData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'white',
            titleColor: colors.primary,
            bodyColor: colors.gray,
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 12
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f1f5f9'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  };

  // ===== GRAPHIQUE REWARDS =====
  window.initRewardsChart = function(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const defaultData = data || {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      datasets: [{
        label: 'Points gagnés',
        data: [120, 150, 180, 210],
        borderColor: colors.secondary,
        backgroundColor: 'rgba(243, 230, 0, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: colors.secondary,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }]
    };

    new Chart(ctx, {
      type: 'line',
      data: defaultData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'white',
            titleColor: colors.primary,
            bodyColor: colors.gray,
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 12
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f1f5f9'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  };

  // Initialiser les graphiques au chargement de la page dashboard
  document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si on est sur la page dashboard
    if (document.getElementById('revenueChart')) {
      initRevenueChart('revenueChart');
    }
    
    if (document.getElementById('statusChart')) {
      initStatusChart('statusChart');
    }
    
    if (document.getElementById('barChart')) {
      initBarChart('barChart');
    }
    
    if (document.getElementById('rewardsChart')) {
      initRewardsChart('rewardsChart');
    }
  });

})();
