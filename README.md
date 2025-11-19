# Eureka CRM - Template d'Administration

![Eureka CRM](assets/img/logo.png)

Template d'administration moderne et professionnel pour **Eureka CRM**, une plateforme de gestion de dossiers clients pour le secteur de l'énergie.

## 📋 Informations

- **Version:** 1.0
- **Date:** 19 Novembre 2025
- **Auteur:** Prudence Dieudonné ASSOGBA (jprud67)
- **Entreprise:** Eureka Energy Consulting

## 🎨 Identité Visuelle

### Couleurs Officielles

| Couleur | Code HEX | Usage |
|---------|----------|-------|
| **Bleu Royal (Primary)** | `#292A5F` | Navigation, headers, boutons principaux |
| **Jaune Vibrant (Secondary)** | `#F3E600` | Accents, badges, hover states |

### Typographie

- **Police:** Poppins (Google Fonts)
- **Poids:** 300, 400, 500, 600, 700

## 🚀 Stack Technique

### Frontend
- HTML5
- CSS3 (Variables custom, animations, responsive)
- Bootstrap 5.3+
- JavaScript ES6+
- jQuery 3.7+

### Librairies & Plugins
- **Font Awesome 6.4+** - Icônes
- **Chart.js 4.4+** - Graphiques dashboard
- **DataTables 1.13+** - Tableaux dynamiques
- **Select2** - Sélecteurs améliorés
- **TinyMCE** - Éditeur rich-text
- **FullCalendar** - Calendrier rappels
- **SweetAlert2** - Notifications et alertes

## 📁 Structure du Projet

```
eureka-temp2/
├── index.html                    # Dashboard principal
├── pages/
│   ├── files-list.html           # Liste des dossiers
│   ├── file-details.html         # Détail d'un dossier
│   ├── file-create.html          # Création dossier
│   ├── customers-list.html       # Liste des clients
│   ├── customer-details.html     # Détail client
│   ├── customer-create.html      # Création client
│   ├── documents.html            # Gestion documents
│   ├── notes.html                # Notes
│   ├── reminders.html            # Rappels
│   ├── rewards.html              # Système rewards
│   ├── reports.html              # Rapports
│   ├── settings.html             # Paramètres
│   └── auth/
│       ├── login.html            # Connexion
│       ├── forgot-password.html  # Mot de passe oublié
│       ├── reset-password.html   # Réinitialisation
│       └── profile.html          # Profil utilisateur
├── assets/
│   ├── css/
│   │   ├── variables.css         # Variables CSS
│   │   ├── style.css             # Styles principaux
│   │   └── components.css        # Composants réutilisables
│   ├── js/
│   │   ├── main.js               # Script principal
│   │   ├── sidebar.js            # Gestion sidebar
│   │   ├── charts.js             # Configuration Chart.js
│   │   ├── tables.js             # Configuration DataTables
│   │   └── components.js         # Composants interactifs
│   ├── img/
│   │   ├── logo.png              # Logo principal
│   │   ├── logo-light.png        # Logo fond sombre
│   │   └── favicon.png           # Favicon
│   └── vendors/                  # Librairies tierces
└── README.md                     # Documentation
```

## 🎯 Fonctionnalités

### Dashboard
- KPIs en temps réel (Dossiers actifs, CA prévisionnel, Taux conversion, Rappels urgents)
- Graphiques interactifs (Évolution CA, Répartition statuts)
- Dossiers récents
- Rappels du jour
- Leaderboard Rewards
- Points rewards personnels

### Gestion des Dossiers
- Liste avec DataTable (filtres, tri, pagination)
- Badges de statut colorés
- Actions rapides (Voir, Modifier, Supprimer)
- Modal création rapide
- Page détail avec onglets

### Gestion des Clients
- Vue tableau avec filtres
- Fiche client complète
- Liste des dossiers associés
- Historique interactions

### Documents
- Grille fichiers avec preview
- Upload drag & drop
- Filtres par type
- Actions de gestion

### Notes
- Éditeur rich-text
- Tags et catégories
- Types variés (Réunion, Appel, Email, Tâche, etc.)

### Rappels
- Vue calendrier
- Vue liste
- Filtres par priorité/statut
- Création rapide

### Système Rewards
- Dashboard gamification
- Badges visuels
- Points cumulés
- Leaderboard équipe
- Objectifs avec progress bars

## 🎨 Composants UI

### Cards KPI
```html
<div class="card-kpi">
  <div class="card-body">
    <!-- Contenu -->
  </div>
</div>
```

### Badges de Statut
- `.badge-nouveau` - Nouveau (bleu)
- `.badge-negociation` - En Négociation (orange)
- `.badge-negocie` - Négocié (violet)
- `.badge-signe` - Signé (vert)
- `.badge-reporte` - Reporté (gris)
- `.badge-annule` - Annulé (rouge)

### Boutons
- `.btn-eureka-primary` - Bouton primaire
- `.btn-eureka-secondary` - Bouton secondaire
- `.btn-eureka-outline` - Bouton outline

### Tableaux
- `.table-eureka` - Tableau avec styles Eureka

## 📱 Responsive Design

Le template est entièrement responsive avec des breakpoints Bootstrap 5 :

- **xs:** 0px (Mobile portrait)
- **sm:** 576px (Mobile landscape)
- **md:** 768px (Tablet portrait)
- **lg:** 992px (Tablet landscape / Desktop)
- **xl:** 1200px (Large desktop)
- **xxl:** 1400px (Extra large)

### Comportement Mobile
- Sidebar collapsible avec overlay
- Menu hamburger
- Touch-friendly (tap targets minimum 44px)
- Tableaux scrollables horizontalement

## 🚀 Installation & Utilisation

### Prérequis
- Serveur web (Apache, Nginx, ou serveur de développement)
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)

### Installation
1. Cloner le repository
```bash
git clone https://github.com/dahovitech/eureka-temp2.git
```

2. Ouvrir dans un serveur web
```bash
cd eureka-temp2
# Avec Python
python -m http.server 8000
# Avec PHP
php -S localhost:8000
```

3. Accéder à l'application
```
http://localhost:8000
```

## 🎯 Pages Disponibles

- ✅ Dashboard (`index.html`)
- ✅ Liste des Dossiers (`pages/files-list.html`)
- ✅ Connexion (`pages/auth/login.html`)
- ⏳ Détail Dossier (en développement)
- ⏳ Clients (en développement)
- ⏳ Documents (en développement)
- ⏳ Notes (en développement)
- ⏳ Rappels (en développement)
- ⏳ Rewards (en développement)
- ⏳ Rapports (en développement)
- ⏳ Paramètres (en développement)

## 📊 Compatibilité Navigateurs

| Navigateur | Version Minimum |
|------------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

**Note:** Pas de support IE11

## 🎨 Personnalisation

### Modifier les Couleurs
Éditer le fichier `assets/css/variables.css` :

```css
:root {
  --eureka-primary: #292A5F;
  --eureka-secondary: #F3E600;
  /* ... */
}
```

### Ajouter des Composants
Créer dans `assets/css/components.css` et `assets/js/components.js`

## 📞 Contact

**Eureka Energy Consulting**

- **Adresse:** 256 Avenue Jean Paul II, Cotonou, République du Bénin
- **Téléphone France:** +33 6 77087192 / +33 7 67815220
- **Téléphone Bénin:** +229 54 64 04 90
- **Email:** info@eurekaenergy.com / secretariat@azurcourtage.com

## 📝 Licence

© 2025 Eureka Energy Consulting. Tous droits réservés.

---

**Développé avec ❤️ par jprud67 (Prudence Dieudonné ASSOGBA)**
