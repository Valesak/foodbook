// ============================================================
// FOODGRAM — Main Application
// ============================================================

// --- Helpers ---
function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function avatarHTML(user, size = 28) {
  const initial = user.name.charAt(0).toUpperCase();
  const bg = `linear-gradient(135deg, ${user.avatarColors[0]}, ${user.avatarColors[1]})`;
  return `<div style="width:${size}px;height:${size}px;min-width:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${bg};color:#fff;font-weight:800;font-size:${size*0.42}px;">${initial}</div>`;
}

function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 30) return diff + 'd ago';
  if (diff < 365) return Math.floor(diff/30) + 'mo ago';
  return Math.floor(diff/365) + 'y ago';
}

function showToast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function formatNumber(n) {
  if (n >= 1000) return (n/1000).toFixed(1) + 'k';
  return n;
}

// --- Router ---
let currentRoute = '';
let routeParams = {};

function navigate(hash) {
  window.location.hash = hash;
}

function parseRoute() {
  const hash = window.location.hash.slice(1) || '/';
  const parts = hash.split('/').filter(Boolean);
  routeParams = {};

  if (parts[0] === 'recipe' && parts[1]) { currentRoute = 'recipe'; routeParams.id = parts[1]; }
  else if (parts[0] === 'album' && parts[1]) { currentRoute = 'album'; routeParams.id = parts[1]; }
  else if (parts[0] === 'profile' && parts[1]) { currentRoute = 'profile'; routeParams.id = parts[1]; }
  else if (parts[0] === 'my-profile') { currentRoute = 'my-profile'; }
  else if (parts[0] === 'create-recipe') { currentRoute = 'create-recipe'; routeParams.albumId = parts[1]; }
  else if (parts[0] === 'create-album') { currentRoute = 'create-album'; }
  else if (parts[0] === 'edit-recipe' && parts[1]) { currentRoute = 'edit-recipe'; routeParams.id = parts[1]; }
  else if (parts[0] === 'edit-album' && parts[1]) { currentRoute = 'edit-album'; routeParams.id = parts[1]; }
  else { currentRoute = 'home'; }

  render();
}

// --- Main Render ---
function render() {
  const app = document.getElementById('app');

  if (!store.currentUser) {
    app.innerHTML = renderAuth();
    bindAuthEvents();
    return;
  }

  let content = '';
  switch (currentRoute) {
    case 'recipe': content = renderRecipeDetail(); break;
    case 'album': content = renderAlbumDetail(); break;
    case 'profile': content = renderProfile(); break;
    case 'my-profile': content = renderMyProfile(); break;
    case 'create-recipe': content = renderCreateRecipe(); break;
    case 'create-album': content = renderCreateAlbum(); break;
    case 'edit-recipe': content = renderCreateRecipe(true); break;
    case 'edit-album': content = renderCreateAlbum(true); break;
    default: content = renderHome();
  }

  app.innerHTML = renderNav() + `<main>${content}</main>`;
  bindGlobalEvents();

  switch (currentRoute) {
    case 'home': bindHomeEvents(); break;
    case 'recipe': bindRecipeDetailEvents(); break;
    case 'album': bindAlbumDetailEvents(); break;
    case 'profile': bindProfileEvents(); break;
    case 'my-profile': bindMyProfileEvents(); break;
    case 'create-recipe': case 'edit-recipe': bindCreateRecipeEvents(); break;
    case 'create-album': case 'edit-album': bindCreateAlbumEvents(); break;
  }

  window.scrollTo(0, 0);
}

// --- Navigation ---
function renderNav() {
  const u = store.currentUser;
  const bg = `linear-gradient(135deg, ${u.avatarColors[0]}, ${u.avatarColors[1]})`;
  return `
  <nav class="navbar">
    <div class="nav-inner">
      <a href="#/" class="nav-logo">foodgram</a>
      <div class="nav-search">
        <span class="nav-search-icon">&#128269;</span>
        <input type="text" id="nav-search-input" placeholder="Search recipes, albums, people..." />
      </div>
      <div class="nav-actions">
        <div class="dropdown">
          <button class="nav-btn primary" id="btn-create-toggle">+ <span class="hide-mobile">Create</span></button>
          <div class="dropdown-menu" id="create-dropdown">
            <button class="dropdown-item" onclick="navigate('/create-recipe')">New Recipe</button>
            <button class="dropdown-item" onclick="navigate('/create-album')">New Album</button>
          </div>
        </div>
        <div class="dropdown">
          <div class="nav-avatar" id="btn-profile-toggle" style="background:${bg}">${u.name.charAt(0)}</div>
          <div class="dropdown-menu" id="profile-dropdown">
            <button class="dropdown-item" onclick="navigate('/my-profile')">My Profile</button>
            <button class="dropdown-item danger" onclick="doLogout()">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  </nav>`;
}

function bindGlobalEvents() {
  // Dropdowns
  document.getElementById('btn-create-toggle')?.addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('create-dropdown').classList.toggle('open');
    document.getElementById('profile-dropdown').classList.remove('open');
  });
  document.getElementById('btn-profile-toggle')?.addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('profile-dropdown').classList.toggle('open');
    document.getElementById('create-dropdown').classList.remove('open');
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
  });

  // Search
  const searchInput = document.getElementById('nav-search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        if (q) {
          navigate('/');
          setTimeout(() => {
            const si = document.getElementById('nav-search-input');
            if (si) si.value = q;
            const hi = document.getElementById('home-search-input');
            if (hi) { hi.value = q; hi.dispatchEvent(new Event('input')); }
            doHomeSearch();
          }, 50);
        }
      }
    });
  }
}

function doLogout() {
  store.logout();
  navigate('/');
  render();
}

// --- Auth ---
function renderAuth() {
  return `
  <div class="auth-page">
    <div class="auth-card">
      <h1>foodgram</h1>
      <p id="auth-subtitle">Sign in to discover amazing recipes</p>
      <div id="auth-form-login">
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="login-email" placeholder="your@email.com" value="marco@food.com" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="login-password" placeholder="••••••••" value="pass123" />
        </div>
        <div class="auth-error" id="login-error"></div>
        <button class="btn-submit" id="btn-login">Sign In</button>
      </div>
      <div id="auth-form-register" class="hidden">
        <div class="form-group">
          <label>Name</label>
          <input type="text" id="register-name" placeholder="Your display name" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="register-email" placeholder="your@email.com" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="register-password" placeholder="Min. 6 characters" />
        </div>
        <div class="auth-error" id="register-error"></div>
        <button class="btn-submit" id="btn-register">Create Account</button>
      </div>
      <div class="auth-switch">
        <span id="auth-switch-text">Don't have an account?</span>
        <a id="auth-switch-link">Sign Up</a>
      </div>
    </div>
  </div>`;
}

function bindAuthEvents() {
  let isLogin = true;
  const switchLink = document.getElementById('auth-switch-link');
  const switchText = document.getElementById('auth-switch-text');
  const subtitle = document.getElementById('auth-subtitle');

  switchLink?.addEventListener('click', () => {
    isLogin = !isLogin;
    document.getElementById('auth-form-login').classList.toggle('hidden', !isLogin);
    document.getElementById('auth-form-register').classList.toggle('hidden', isLogin);
    switchLink.textContent = isLogin ? 'Sign Up' : 'Sign In';
    switchText.textContent = isLogin ? "Don't have an account?" : "Already have an account?";
    subtitle.textContent = isLogin ? 'Sign in to discover amazing recipes' : 'Create your foodgram account';
  });

  document.getElementById('btn-login')?.addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const pw = document.getElementById('login-password').value;
    const err = document.getElementById('login-error');
    if (!email || !pw) { err.textContent = 'Please fill in all fields.'; err.classList.add('show'); return; }
    const user = store.login(email, pw);
    if (!user) { err.textContent = 'Invalid email or password.'; err.classList.add('show'); return; }
    navigate('/');
    render();
  });

  document.getElementById('btn-register')?.addEventListener('click', () => {
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const pw = document.getElementById('register-password').value;
    const err = document.getElementById('register-error');
    if (!name || !email || !pw) { err.textContent = 'Please fill in all fields.'; err.classList.add('show'); return; }
    if (pw.length < 6) { err.textContent = 'Password must be at least 6 characters.'; err.classList.add('show'); return; }
    const user = store.register(name, email, pw);
    if (!user) { err.textContent = 'An account with this email already exists.'; err.classList.add('show'); return; }
    navigate('/');
    render();
  });
}

// --- HOME ---
let homeSearchQuery = '';
let homeSearchTab = 'all'; // all, recipes, albums, users
let homeFilters = {};
let homeShowFilters = false;
let homeSelectedIngredients = [];
let homeIngredientMode = 'any';

function renderHome() {
  return `
  <div class="container">
    <div class="page-header">
      <h1>Discover</h1>
    </div>
    <div class="tabs">
      <button class="tab ${homeSearchTab==='all'?'active':''}" data-tab="all">All</button>
      <button class="tab ${homeSearchTab==='recipes'?'active':''}" data-tab="recipes">Recipes</button>
      <button class="tab ${homeSearchTab==='albums'?'active':''}" data-tab="albums">Albums</button>
      <button class="tab ${homeSearchTab==='users'?'active':''}" data-tab="users">People</button>
    </div>

    <input type="text" id="home-search-input" placeholder="Search by title or description..." value="${esc(homeSearchQuery)}" style="margin-bottom:16px;border-radius:999px;padding:12px 20px;" />

    ${homeSearchTab !== 'users' ? `
    <button class="filter-toggle" id="btn-toggle-filters">${homeShowFilters ? 'Hide Filters' : 'Show Filters'}</button>
    ${homeShowFilters ? renderFilterPanel(homeSearchTab) : ''}
    ` : ''}

    <div id="home-results"></div>
  </div>`;
}

function renderFilterPanel(homeSearchTab) {

  const diffOptions = ['','easy','medium','hard'].map(v =>
      `<option value="${v}" ${homeFilters.difficulty===v?'selected':''}>${v?DIFFICULTY_LABELS[v]:'Any'}</option>`
  ).join('');

  const typeOptions = ['', ...Object.keys(TYPE_LABELS)].map(v =>
      `<option value="${v}" ${homeFilters.type===v?'selected':''}>${v?TYPE_LABELS[v]:'Any'}</option>`
  ).join('');

  const paidOptions = ['','free','paid'].map(v =>
      `<option value="${v}" ${homeFilters.paidFilter===v?'selected':''}>${v==='free'?'Free Only':v==='paid'?'Paid Only':'All'}</option>`
  ).join('');

  if(homeSearchTab === 'albums'){
    return `
  <div class="filter-panel">
    <h3>&#9881; Filters</h3>
    <div class="filter-row">
      <div class="filter-group">
        <label>Difficulty</label>
        <select id="filter-difficulty">${diffOptions}</select>
      </div>
      <div class="filter-group">
        <label>Type</label>
        <select id="filter-type">${typeOptions}</select>
      </div>
      <div class="filter-group">
        <label>Price</label>
        <select id="filter-paid">${paidOptions}</select>
      </div>
    </div>

    <div class="filter-actions">
      <button class="btn-filter primary" id="btn-apply-filters">Apply Filters</button>
      <button class="btn-filter secondary" id="btn-clear-filters">Clear</button>
    </div>
  </div>`;
  } else {
  return `
  <div class="filter-panel">
    <h3>&#9881; Filters</h3>
    <div class="filter-row">
      <div class="filter-group">
        <label>Difficulty</label>
        <select id="filter-difficulty">${diffOptions}</select>
      </div>
      <div class="filter-group">
        <label>Type</label>
        <select id="filter-type">${typeOptions}</select>
      </div>
      <div class="filter-group">
        <label>Price</label>
        <select id="filter-paid">${paidOptions}</select>
      </div>
      <div class="filter-group">
        <label>Duration (min)</label>
        <div class="duration-range">
          <input type="number" id="filter-min-dur" placeholder="0" min="0" value="${homeFilters.minDuration||''}" />
          <span>—</span>
          <input type="number" id="filter-max-dur" placeholder="∞" min="0" value="${homeFilters.maxDuration||''}" />
        </div>
      </div>
    </div>

    <div class="ingredients-picker">
      <h3 style="font-size:0.95rem;margin-bottom:10px">Search by Ingredients</h3>
      <input type="text" class="ing-search" id="ing-search" placeholder="Filter ingredients..." />
      <div class="ingredients-list" id="ingredients-list">
        ${ALL_INGREDIENTS.map(ing => `
          <span class="ing-chip ${homeSelectedIngredients.includes(ing)?'selected':''}" data-ing="${esc(ing)}">${esc(ing)}</span>
        `).join('')}
      </div>
      <div class="ing-mode-toggle">
        <label><input type="radio" name="ing-mode" value="any" ${homeIngredientMode==='any'?'checked':''} /> Contains any selected</label>
        <label><input type="radio" name="ing-mode" value="strict" ${homeIngredientMode==='strict'?'checked':''} /> Only these ingredients</label>
      </div>
    </div>

    <div class="filter-actions">
      <button class="btn-filter primary" id="btn-apply-filters">Apply Filters</button>
      <button class="btn-filter secondary" id="btn-clear-filters">Clear</button>
    </div>
  </div>`;
  }
}

function doHomeSearch() {
  const resultsDiv = document.getElementById('home-results');
  if (!resultsDiv) return;

  if (homeSearchTab === 'users') {
    const users = store.searchUsers(homeSearchQuery);
    if (!users.length) {
      resultsDiv.innerHTML = emptyState('No users found');
      return;
    }
    resultsDiv.innerHTML = `<div class="cards-grid">${users.map(u => renderUserCard(u)).join('')}</div>`;
    resultsDiv.querySelectorAll('.user-card').forEach(c => {
      c.addEventListener('click', () => navigate('/profile/' + c.dataset.userId));
    });
    return;
  }

  let html = '';

  if (homeSearchTab === 'all' || homeSearchTab === 'recipes') {
    const filters = {
      ...homeFilters,
      ingredients: homeSelectedIngredients.length ? homeSelectedIngredients : undefined,
      ingredientMode: homeIngredientMode
    };
    let recipes = homeSearchQuery || Object.keys(filters).length > 0
      ? store.searchRecipes(homeSearchQuery, filters)
      : store.getFeedRecipes();

    if (homeSearchTab === 'all' || homeSearchTab === 'recipes') {
      if (recipes.length) {
        if (homeSearchTab === 'all') html += '<h2 style="margin-bottom:16px;font-weight:800;">Recipes</h2>';
        html += `<div class="cards-grid">${recipes.map(r => renderRecipeCard(r)).join('')}</div>`;
      } else if (homeSearchTab === 'recipes') {
        html += emptyState('No recipes found');
      }
    }
  }

  if (homeSearchTab === 'all' || homeSearchTab === 'albums') {
    const filters = {
      ...homeFilters
    };
    const albums = store.searchAlbums(homeSearchQuery, filters);
    if (albums.length) {
      if (homeSearchTab === 'all') html += '<h2 style="margin:32px 0 16px;font-weight:800;">Albums</h2>';
      html += `<div class="cards-grid">${albums.map(a => renderAlbumCard(a)).join('')}</div>`;
    } else if (homeSearchTab === 'albums') {
      html += emptyState('No albums found');
    }
  }

  if (!html) html = emptyState('Nothing found. Try different search terms or filters.');
  resultsDiv.innerHTML = html;
  bindCardEvents(resultsDiv);
}

function bindHomeEvents() {
  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      homeSearchTab = tab.dataset.tab;
      render();
      setTimeout(doHomeSearch, 10);
    });
  });

  // Search input
  const searchInput = document.getElementById('home-search-input');
  let searchTimeout;
  searchInput?.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      homeSearchQuery = searchInput.value.trim();
      doHomeSearch();
    }, 300);
  });

  // Toggle filters
  document.getElementById('btn-toggle-filters')?.addEventListener('click', () => {
    homeShowFilters = !homeShowFilters;
    render();
    setTimeout(doHomeSearch, 10);
  });

  // Filters
  if (homeShowFilters) {
    // Ingredient search filter
    document.getElementById('ing-search')?.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#ingredients-list .ing-chip').forEach(chip => {
        chip.style.display = chip.dataset.ing.toLowerCase().includes(q) ? '' : 'none';
      });
    });

    // Ingredient chips
    document.querySelectorAll('#ingredients-list .ing-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const ing = chip.dataset.ing;
        const idx = homeSelectedIngredients.indexOf(ing);
        if (idx > -1) homeSelectedIngredients.splice(idx, 1);
        else homeSelectedIngredients.push(ing);
        chip.classList.toggle('selected');
      });
    });

    // Ingredient mode
    document.querySelectorAll('input[name="ing-mode"]').forEach(radio => {
      radio.addEventListener('change', () => { homeIngredientMode = radio.value; });
    });

    // Apply filters
    document.getElementById('btn-apply-filters')?.addEventListener('click', () => {
      const d = document.getElementById('filter-difficulty')?.value;
      const t = document.getElementById('filter-type')?.value;
      const p = document.getElementById('filter-paid')?.value;
      const minD = document.getElementById('filter-min-dur')?.value;
      const maxD = document.getElementById('filter-max-dur')?.value;

      homeFilters = {};
      if (d) homeFilters.difficulty = d;
      if (t) homeFilters.type = t;
      if (p) homeFilters.paidFilter = p;
      if (minD) homeFilters.minDuration = parseInt(minD);
      if (maxD) homeFilters.maxDuration = parseInt(maxD);

      doHomeSearch();
    });

    // Clear filters
    document.getElementById('btn-clear-filters')?.addEventListener('click', () => {
      homeFilters = {};
      homeSelectedIngredients = [];
      homeIngredientMode = 'any';
      homeSearchQuery = '';
      render();
      setTimeout(doHomeSearch, 10);
    });
  }

  doHomeSearch();
}

// --- Cards ---
function renderRecipeCard(r, showEdit = false) {
  const author = store.getUser(r.authorId);
  if (!author) return '';
  const isLiked = store.isLikedRecipe(r.id);
  const isReposted = store.isRepostedRecipe(r.id);
  const isPurchased = store.isPurchased('recipe', r.id);

  const photos = r.photos && r.photos.length ? r.photos : [''];
  const sliderHTML = photos.map(p => `<img src="${p}" alt="" loading="lazy" onerror="this.style.display='none'" />`).join('');
  const dots = photos.length > 1 ? `<div class="card-slider-dots">${photos.map((_, i) => `<div class="card-slider-dot ${i===0?'active':''}" data-idx="${i}"></div>`).join('')}</div>` : '';
  const arrows = photos.length > 1 ? `<button class="card-slider-arrow left" data-dir="-1">&#8249;</button><button class="card-slider-arrow right" data-dir="1">&#8250;</button>` : '';

  let badge = '';
  if (r.isPaid && isPurchased) badge = '<span class="card-badge purchased">Purchased</span>';
  else if (r.isPaid) badge = `<span class="card-badge paid">$${r.price.toFixed(2)}</span>`;

  return `
  <div class="recipe-card" data-recipe-id="${r.id}">
    <div class="card-image-wrap" data-slide-idx="0">
      <div class="card-slider">${sliderHTML}</div>
      ${dots}${arrows}
      ${r.hasVideo ? '<div class="card-video-badge">&#9654; Video</div>' : ''}
      ${badge}
    </div>
    <div class="card-body">
      <div class="card-author" data-user-id="${author.id}">
        <div class="card-author-avatar" style="background:linear-gradient(135deg,${author.avatarColors[0]},${author.avatarColors[1]})">${author.name.charAt(0)}</div>
        <span class="card-author-name">${esc(author.name)}</span>
      </div>
      <div class="card-title">${esc(r.title)}</div>
      <div class="card-desc">${esc(r.shortDesc)}</div>
      <div class="card-meta">
        <span class="card-tag">${DIFFICULTY_LABELS[r.difficulty]}</span>
        <span class="card-tag">${r.duration} min</span>
        <span class="card-tag">${TYPE_LABELS[r.type] || r.type}</span>
      </div>
      <div class="card-actions">
        <button class="card-action ${isLiked?'liked':''}" data-action="like-recipe" data-id="${r.id}">
          ${isLiked?'&#9829;':'&#9825;'} ${r.likes.length}
        </button>
        <button class="card-action ${isReposted?'reposted':''}" data-action="repost-recipe" data-id="${r.id}">
          &#8634; ${r.reposts.length}
        </button>
        <span class="card-action" style="cursor:default;margin-left:auto;">&#128172; ${r.comments.length}</span>
      </div>
      ${showEdit ? `<div style="margin-top:10px;display:flex;gap:8px;">
        <button class="btn-secondary" style="font-size:0.8rem;padding:6px 14px;" onclick="event.stopPropagation();navigate('/edit-recipe/${r.id}')">Edit</button>
        <button class="btn-danger" style="font-size:0.8rem;padding:6px 14px;" onclick="event.stopPropagation();if(confirm('Delete this recipe?')){store.deleteRecipe('${r.id}');render();}">Delete</button>
      </div>` : ''}
    </div>
  </div>`;
}

function renderAlbumCard(a, showEdit = false) {
  const author = store.getUser(a.authorId);
  if (!author) return '';
  const isLiked = store.isLikedAlbum(a.id);
  const isReposted = store.isRepostedAlbum(a.id);
  const isPurchased = store.isPurchased('album', a.id);

  let badge = '';
  if (a.isPaid && isPurchased) badge = '<span class="card-badge purchased">Purchased</span>';
  else if (a.isPaid) badge = `<span class="card-badge paid">$${a.price.toFixed(2)}</span>`;

  return `
  <div class="recipe-card" data-album-id="${a.id}">
    <div class="card-image-wrap">
      <img src="${a.coverPhoto}" alt="" loading="lazy" />
      <span class="card-badge album-badge">Album · ${a.recipeIds.length} recipes</span>
      ${badge}
    </div>
    <div class="card-body">
      <div class="card-author" data-user-id="${author.id}">
        <div class="card-author-avatar" style="background:linear-gradient(135deg,${author.avatarColors[0]},${author.avatarColors[1]})">${author.name.charAt(0)}</div>
        <span class="card-author-name">${esc(author.name)}</span>
      </div>
      <div class="card-title">${esc(a.title)}</div>
      <div class="card-desc">${esc(a.description)}</div>
      <div class="card-actions">
        <button class="card-action ${isLiked?'liked':''}" data-action="like-album" data-id="${a.id}">
          ${isLiked?'&#9829;':'&#9825;'} ${a.likes.length}
        </button>
        <button class="card-action ${isReposted?'reposted':''}" data-action="repost-album" data-id="${a.id}">
          &#8634; ${a.reposts.length}
        </button>
        <span class="card-action" style="cursor:default;margin-left:auto;">&#128172; ${a.comments.length}</span>
      </div>
      ${showEdit ? `<div style="margin-top:10px;display:flex;gap:8px;">
        <button class="btn-secondary" style="font-size:0.8rem;padding:6px 14px;" onclick="event.stopPropagation();navigate('/edit-album/${a.id}')">Edit</button>
        <button class="btn-danger" style="font-size:0.8rem;padding:6px 14px;" onclick="event.stopPropagation();if(confirm('Delete this album?')){store.deleteAlbum('${a.id}');render();}">Delete</button>
      </div>` : ''}
    </div>
  </div>`;
}

function renderUserCard(u) {
  const bg = `linear-gradient(135deg, ${u.avatarColors[0]}, ${u.avatarColors[1]})`;
  return `
  <div class="user-card" data-user-id="${u.id}">
    <div class="user-card-avatar" style="background:${bg}">${u.name.charAt(0)}</div>
    <div class="user-card-info">
      <div class="user-card-name">${esc(u.name)}</div>
      <div class="user-card-bio">${esc(u.bio)}</div>
      <div class="user-card-stats">${u.followers.length} followers · ${store.getTotalLikes(u.id)} total likes</div>
    </div>
  </div>`;
}

function bindCardEvents(container) {
  // Card clicks
  container.querySelectorAll('.recipe-card[data-recipe-id]').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.card-action') || e.target.closest('.card-slider-arrow') || e.target.closest('.card-slider-dot') || e.target.closest('.card-author')) return;
      navigate('/recipe/' + card.dataset.recipeId);
    });
  });

  container.querySelectorAll('.recipe-card[data-album-id]').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.card-action') || e.target.closest('.card-author')) return;
      navigate('/album/' + card.dataset.albumId);
    });
  });

  container.querySelectorAll('.user-card').forEach(card => {
    card.addEventListener('click', () => navigate('/profile/' + card.dataset.userId));
  });

  // Author clicks
  container.querySelectorAll('.card-author[data-user-id]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      navigate('/profile/' + el.dataset.userId);
    });
  });

  // Like/Repost
  container.querySelectorAll('.card-action[data-action]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === 'like-recipe') { store.toggleLikeRecipe(id); }
      else if (action === 'repost-recipe') { store.toggleRepostRecipe(id); }
      else if (action === 'like-album') { store.toggleLikeAlbum(id); }
      else if (action === 'repost-album') { store.toggleRepostAlbum(id); }
      // Re-render the results
      doHomeSearch();
      // Also handle profile / my-profile contexts
      if (currentRoute === 'profile') renderProfileContent();
      if (currentRoute === 'my-profile') renderMyProfileContent();
    });
  });

  // Card sliders
  container.querySelectorAll('.card-image-wrap').forEach(wrap => {
    const slider = wrap.querySelector('.card-slider');
    if (!slider) return;
    const images = slider.querySelectorAll('img');
    if (images.length <= 1) return;
    let idx = 0;

    const updateSlider = () => {
      slider.style.transform = `translateX(-${idx * 100}%)`;
      wrap.querySelectorAll('.card-slider-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    wrap.querySelectorAll('.card-slider-arrow').forEach(arrow => {
      arrow.addEventListener('click', e => {
        e.stopPropagation();
        idx = (idx + parseInt(arrow.dataset.dir) + images.length) % images.length;
        updateSlider();
      });
    });

    wrap.querySelectorAll('.card-slider-dot').forEach(dot => {
      dot.addEventListener('click', e => {
        e.stopPropagation();
        idx = parseInt(dot.dataset.idx);
        updateSlider();
      });
    });
  });
}

function emptyState(msg, emoji = '&#128373;') {
  return `<div class="empty-state"><div class="emoji">${emoji}</div><h3>${msg}</h3></div>`;
}

// --- RECIPE DETAIL ---
function renderRecipeDetail() {
  const r = store.getRecipe(routeParams.id);
  if (!r) return '<div class="container">' + emptyState('Recipe not found') + '</div>';

  const author = store.getUser(r.authorId);
  if (!author) return '<div class="container">' + emptyState('Recipe not found') + '</div>';

  const isOwn = store.currentUser && r.authorId === store.currentUser.id;
  const isLiked = store.isLikedRecipe(r.id);
  const isReposted = store.isRepostedRecipe(r.id);
  const isFollowing = store.isFollowing(r.authorId);
  const isPurchased = store.isPurchased('recipe', r.id);
  const canView = !r.isPaid || isPurchased || isOwn;

  // Slider
  const photos = r.photos && r.photos.length ? r.photos : [];
  let sliderHTML = '';
  if (photos.length) {
    sliderHTML = `
    <div class="detail-slider">
      <div class="detail-slider-track">${photos.map(p => `<img src="${p}" alt="" />`).join('')}</div>
      ${photos.length > 1 ? `
        <button class="detail-slider-arrow left">&#8249;</button>
        <button class="detail-slider-arrow right">&#8250;</button>
        <div class="detail-slider-dots">${photos.map((_, i) => `<div class="detail-slider-dot ${i===0?'active':''}" data-idx="${i}"></div>`).join('')}</div>
      ` : ''}
    </div>`;
  }

  let videoHTML = '';
  if (r.hasVideo && r.videoUrl && canView) {
    videoHTML = `<div class="detail-video"><video controls preload="metadata"><source src="${r.videoUrl}" type="video/mp4" /></video></div>`;
  }

  let contentHTML = '';
  if (canView) {
    contentHTML = `
      <div class="detail-ingredients">
        <h3>Ingredients</h3>
        <div class="detail-ing-list">${r.ingredients.map(ing => `<span class="detail-ing-chip">${esc(ing)}</span>`).join('')}</div>
      </div>
      <div class="detail-full-desc">
        <h3>How to Make It</h3>
        <div class="desc-content">${esc(r.fullDesc)}</div>
      </div>
      ${renderComments(r.comments, 'recipe', r.id)}
    `;
  } else {
    contentHTML = `
      <div class="paid-overlay">
        <h3>&#128274; Premium Recipe</h3>
        <p>This recipe is available for $${r.price.toFixed(2)}. Purchase to unlock the full recipe, ingredients, and video.</p>
        <button class="btn-purchase" data-action="purchase" data-type="recipe" data-id="${r.id}" data-price="${r.price}">Purchase for $${r.price.toFixed(2)}</button>
      </div>
    `;
  }

  const bg = `linear-gradient(135deg, ${author.avatarColors[0]}, ${author.avatarColors[1]})`;

  return `
  <div class="recipe-detail">
    <button class="back-btn" onclick="history.back()">&#8592; Back</button>
    ${sliderHTML}
    ${videoHTML}
    <div class="detail-header">
      <div class="detail-author">
        <div class="detail-author-avatar" style="background:${bg}" onclick="navigate('/profile/${author.id}')">${author.name.charAt(0)}</div>
        <div class="detail-author-info">
          <div class="detail-author-name" onclick="navigate('/profile/${author.id}')">${esc(author.name)}</div>
          <div class="detail-author-date">${timeAgo(r.createdAt)}</div>
        </div>
        ${!isOwn ? `<button class="btn-follow ${isFollowing?'following':''}" data-action="follow" data-user-id="${author.id}">${isFollowing?'Following':'Follow'}</button>` : ''}
      </div>
      <div class="detail-title">${esc(r.title)}</div>
      <div class="detail-short-desc">${esc(r.shortDesc)}</div>
      <div class="detail-tags">
        <span class="detail-tag">${DIFFICULTY_LABELS[r.difficulty]}</span>
        <span class="detail-tag">${r.duration} min</span>
        <span class="detail-tag">${TYPE_LABELS[r.type] || r.type}</span>
        ${r.isPaid ? (isPurchased ? '<span class="detail-tag" style="color:var(--green);border-color:var(--green);">Purchased</span>' : `<span class="detail-tag" style="color:var(--accent2);border-color:var(--accent2);">$${r.price.toFixed(2)}</span>`) : '<span class="detail-tag" style="color:var(--green);border-color:var(--green);">Free</span>'}
      </div>
      <div class="detail-actions">
        <button class="detail-action-btn ${isLiked?'liked':''}" data-action="like-recipe" data-id="${r.id}">
          ${isLiked?'&#9829;':'&#9825;'} ${r.likes.length} Like${r.likes.length!==1?'s':''}
        </button>
        <button class="detail-action-btn ${isReposted?'reposted':''}" data-action="repost-recipe" data-id="${r.id}">
          &#8634; ${r.reposts.length} Repost${r.reposts.length!==1?'s':''}
        </button>
      </div>
    </div>
    ${contentHTML}
  </div>`;
}

function bindRecipeDetailEvents() {
  bindDetailSlider();
  bindDetailActions('recipe');
  bindCommentEvents('recipe', routeParams.id);

  // Purchase
  document.querySelector('[data-action="purchase"]')?.addEventListener('click', function() {
    store.purchase(this.dataset.type, this.dataset.id);
    showToast('Purchased successfully!');
    render();
  });
}

// --- ALBUM DETAIL ---
function renderAlbumDetail() {
  const a = store.getAlbum(routeParams.id);
  console.log(a);
  if (!a) return '<div class="container">' + emptyState('Album not found') + '</div>';

  const author = store.getUser(a.authorId);
  if (!author) return '<div class="container">' + emptyState('Album not found') + '</div>';

  const isOwn = store.currentUser && a.authorId === store.currentUser.id;
  const isLiked = store.isLikedAlbum(a.id);
  const isReposted = store.isRepostedAlbum(a.id);
  const isFollowing = store.isFollowing(a.authorId);
  const isPurchased = store.isPurchased('album', a.id);
  const canView = !a.isPaid || isPurchased || isOwn;

  const bg = `linear-gradient(135deg, ${author.avatarColors[0]}, ${author.avatarColors[1]})`;

  let recipesHTML = '';
  if (canView) {
    const recipes = a.recipeIds.map(rid => store.getRecipe(rid)).filter(Boolean);
    recipesHTML = `
      <h3 style="font-size:1.15rem;font-weight:800;margin:24px 0 16px;">Recipes in this Album</h3>
      <div class="cards-grid">${recipes.map(r => renderRecipeCard(r)).join('')}</div>
      ${renderComments(a.comments, 'album', a.id)}
    `;
  } else {
    recipesHTML = `
      <div class="paid-overlay">
        <h3>&#128274; Premium Album</h3>
        <p>This album is available for $${a.price.toFixed(2)}. Purchase to access all ${a.recipeIds.length} recipes inside.</p>
        <button class="btn-purchase" data-action="purchase" data-type="album" data-id="${a.id}" data-price="${a.price}">Purchase for $${a.price.toFixed(2)}</button>
      </div>
    `;
  }

  return `
  <div class="recipe-detail">
    <button class="back-btn" onclick="history.back()">&#8592; Back</button>
    <div class="detail-slider" style="aspect-ratio:16/7;">
      <img src="${a.coverPhoto}" alt="" style="width:100%;height:100%;object-fit:cover;" />
    </div>
    <div class="detail-header">
      <div class="detail-author">
        <div class="detail-author-avatar" style="background:${bg}" onclick="navigate('/profile/${author.id}')">${author.name.charAt(0)}</div>
        <div class="detail-author-info">
          <div class="detail-author-name" onclick="navigate('/profile/${author.id}')">${esc(author.name)}</div>
          <div class="detail-author-date">${timeAgo(a.createdAt)}</div>
        </div>
        ${!isOwn ? `<button class="btn-follow ${isFollowing?'following':''}" data-action="follow" data-user-id="${author.id}">${isFollowing?'Following':'Follow'}</button>` : ''}
      </div>
      <div class="detail-title">${esc(a.title)}</div>
      <div class="detail-short-desc">${esc(a.description)}</div>      
      <div class="detail-tags">
        <span class="detail-tag">Album · ${a.recipeIds.length} recipes</span>
        <span class="detail-tag">${DIFFICULTY_LABELS[a.difficulty]}</span>
        <span class="detail-tag">${TYPE_LABELS[a.type] || a.type}</span>
        ${a.isPaid ? (isPurchased ? '<span class="detail-tag" style="color:var(--green);border-color:var(--green);">Purchased</span>' : `<span class="detail-tag" style="color:var(--accent2);border-color:var(--accent2);">$${a.price.toFixed(2)}</span>`) : '<span class="detail-tag" style="color:var(--green);border-color:var(--green);">Free</span>'}
      </div>
      <div class="detail-actions">
        <button class="detail-action-btn ${isLiked?'liked':''}" data-action="like-album" data-id="${a.id}">
          ${isLiked?'&#9829;':'&#9825;'} ${a.likes.length} Like${a.likes.length!==1?'s':''}
        </button>
        <button class="detail-action-btn ${isReposted?'reposted':''}" data-action="repost-album" data-id="${a.id}">
          &#8634; ${a.reposts.length} Repost${a.reposts.length!==1?'s':''}
        </button>
      </div>
    </div>
    ${recipesHTML}
  </div>`;
}

function bindAlbumDetailEvents() {
  bindDetailActions('album');
  bindCommentEvents('album', routeParams.id);
  bindCardEvents(document.querySelector('.recipe-detail') || document);

  document.querySelector('[data-action="purchase"]')?.addEventListener('click', function() {
    store.purchase(this.dataset.type, this.dataset.id);
    showToast('Purchased successfully!');
    render();
  });
}

// --- Shared detail helpers ---
function bindDetailSlider() {
  const slider = document.querySelector('.detail-slider');
  if (!slider) return;
  const track = slider.querySelector('.detail-slider-track');
  if (!track) return;
  const images = track.querySelectorAll('img');
  if (images.length <= 1) return;
  let idx = 0;

  const update = () => {
    track.style.transform = `translateX(-${idx * 100}%)`;
    slider.querySelectorAll('.detail-slider-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  };

  slider.querySelector('.detail-slider-arrow.left')?.addEventListener('click', () => { idx = (idx - 1 + images.length) % images.length; update(); });
  slider.querySelector('.detail-slider-arrow.right')?.addEventListener('click', () => { idx = (idx + 1) % images.length; update(); });
  slider.querySelectorAll('.detail-slider-dot').forEach(dot => {
    dot.addEventListener('click', () => { idx = parseInt(dot.dataset.idx); update(); });
  });
}

function bindDetailActions(type) {
  // Like
  document.querySelectorAll(`[data-action="like-${type}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      if (type === 'recipe') store.toggleLikeRecipe(btn.dataset.id);
      else store.toggleLikeAlbum(btn.dataset.id);
      render();
    });
  });

  // Repost
  document.querySelectorAll(`[data-action="repost-${type}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      if (type === 'recipe') store.toggleRepostRecipe(btn.dataset.id);
      else store.toggleRepostAlbum(btn.dataset.id);
      render();
    });
  });

  // Follow
  document.querySelectorAll('[data-action="follow"]').forEach(btn => {
    btn.addEventListener('click', () => {
      store.toggleFollow(btn.dataset.userId);
      render();
    });
  });
}

// --- Comments ---
function renderComments(comments, type, parentId) {
  return `
  <div class="comments-section">
    <h3>Comments (${comments.length})</h3>
    <div class="comment-input-wrap">
      <textarea id="new-comment" placeholder="Write a comment..."></textarea>
      <button id="btn-add-comment">Post</button>
    </div>
    <div id="comments-list">
      ${comments.map(c => renderComment(c, type, parentId)).join('')}
    </div>
  </div>`;
}

function renderComment(c, type, parentId) {
  const author = store.getUser(c.authorId);
  if (!author) return '';
  const isLiked = store.currentUser && c.likes.includes(store.currentUser.id);
  const bg = `linear-gradient(135deg, ${author.avatarColors[0]}, ${author.avatarColors[1]})`;

  let repliesHTML = '';
  if (c.replies && c.replies.length) {
    repliesHTML = `<div class="comment-replies">${c.replies.map(r => {
      const ra = store.getUser(r.authorId);
      if (!ra) return '';
      const rLiked = store.currentUser && r.likes.includes(store.currentUser.id);
      const rBg = `linear-gradient(135deg, ${ra.avatarColors[0]}, ${ra.avatarColors[1]})`;
      return `
      <div class="comment" style="padding:8px 0;border:none;">
        <div class="comment-header">
          <div class="comment-avatar" style="background:${rBg};width:24px;height:24px;font-size:0.6rem;" onclick="navigate('/profile/${ra.id}')">${ra.name.charAt(0)}</div>
          <span class="comment-author-name" onclick="navigate('/profile/${ra.id}')">${esc(ra.name)}</span>
        </div>
        <div class="comment-text" style="padding-left:34px;">${esc(r.text)}</div>
        <div class="comment-actions" style="padding-left:34px;">
          <button class="comment-action-btn ${rLiked?'liked':''}" data-action="like-comment" data-comment-id="${c.id}" data-reply-id="${r.id}">
            ${rLiked?'&#9829;':'&#9825;'} ${r.likes.length}
          </button>
        </div>
      </div>`;
    }).join('')}</div>`;
  }

  return `
  <div class="comment" data-comment-id="${c.id}">
    <div class="comment-header">
      <div class="comment-avatar" style="background:${bg}" onclick="navigate('/profile/${author.id}')">${author.name.charAt(0)}</div>
      <span class="comment-author-name" onclick="navigate('/profile/${author.id}')">${esc(author.name)}</span>
    </div>
    <div class="comment-text">${esc(c.text)}</div>
    <div class="comment-actions">
      <button class="comment-action-btn ${isLiked?'liked':''}" data-action="like-comment" data-comment-id="${c.id}">
        ${isLiked?'&#9829;':'&#9825;'} ${c.likes.length}
      </button>
      <button class="comment-action-btn" data-action="reply" data-comment-id="${c.id}">Reply</button>
    </div>
    ${repliesHTML}
    <div class="reply-input-wrap hidden" id="reply-wrap-${c.id}">
      <input type="text" placeholder="Write a reply..." id="reply-input-${c.id}" />
      <button data-action="submit-reply" data-comment-id="${c.id}">Reply</button>
    </div>
  </div>`;
}

function bindCommentEvents(type, parentId) {
  // Add comment
  document.getElementById('btn-add-comment')?.addEventListener('click', () => {
    const textarea = document.getElementById('new-comment');
    const text = textarea.value.trim();
    if (!text) return;
    if (type === 'recipe') store.addCommentRecipe(parentId, text);
    else store.addCommentAlbum(parentId, text);
    render();
  });

  // Like comment
  document.querySelectorAll('[data-action="like-comment"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (type === 'recipe') store.toggleLikeComment(parentId, btn.dataset.commentId, btn.dataset.replyId);
      else store.toggleLikeAlbumComment(parentId, btn.dataset.commentId, btn.dataset.replyId);
      render();
    });
  });

  // Toggle reply
  document.querySelectorAll('[data-action="reply"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = document.getElementById('reply-wrap-' + btn.dataset.commentId);
      if (wrap) wrap.classList.toggle('hidden');
    });
  });

  // Submit reply
  document.querySelectorAll('[data-action="submit-reply"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById('reply-input-' + btn.dataset.commentId);
      const text = input.value.trim();
      if (!text) return;
      if (type === 'recipe') store.addReplyRecipe(parentId, btn.dataset.commentId, text);
      else store.addReplyAlbum(parentId, btn.dataset.commentId, text);
      render();
    });
  });
}

// --- PROFILE ---
let profileTab = 'posts';
let profileFilter = 'all'; // all, free, paid, albums

function renderProfile() {
  const user = store.getUser(routeParams.id);
  if (!user) return '<div class="container">' + emptyState('User not found') + '</div>';

  const isOwn = store.currentUser && user.id === store.currentUser.id;
  if (isOwn) { navigate('/my-profile'); return ''; }

  const isFollowing = store.isFollowing(user.id);
  const totalLikes = store.getTotalLikes(user.id);
  const bg = `linear-gradient(135deg, ${user.avatarColors[0]}, ${user.avatarColors[1]})`;

  return `
  <div class="container">
    <div class="profile-header">
      <div class="profile-top">
        <div class="profile-avatar" style="background:${bg}">${user.name.charAt(0)}</div>
        <div class="profile-info">
          <div class="profile-name">${esc(user.name)}</div>
          <div class="profile-bio">${esc(user.bio)}</div>
          <div class="profile-stats">
            <span class="profile-stat"><strong>${user.followers.length}</strong> followers</span>
            <span class="profile-stat"><strong>${user.following.length}</strong> following</span>
            <span class="profile-stat"><strong>${formatNumber(totalLikes)}</strong> likes</span>
          </div>
        </div>
        <button class="btn-follow ${isFollowing?'following':''}" data-action="follow" data-user-id="${user.id}">${isFollowing?'Following':'Follow'}</button>
      </div>
    </div>

    <div class="tabs">
      <button class="tab ${profileTab==='posts'?'active':''}" data-tab="posts">Posts</button>
      ${user.showReposts ? `<button class="tab ${profileTab==='shared'?'active':''}" data-tab="shared">Shared</button>` : ''}
    </div>

    ${profileTab === 'posts' ? `
    <div class="tabs" style="margin-bottom:20px;">
      <button class="tab ${profileFilter==='all'?'active':''}" data-filter="all">All</button>
      <button class="tab ${profileFilter==='free'?'active':''}" data-filter="free">Free</button>
      <button class="tab ${profileFilter==='paid'?'active':''}" data-filter="paid">Paid</button>
      <button class="tab ${profileFilter==='albums'?'active':''}" data-filter="albums">Albums</button>
    </div>` : ''}

    ${profileTab === 'shared' ? `
    <div class="tabs" style="margin-bottom:20px;">
      <button class="tab ${profileFilter==='all'?'active':''}" data-filter="all">All</button>
      <button class="tab ${profileFilter==='recipes'?'active':''}" data-filter="recipes">Recipes</button>
      <button class="tab ${profileFilter==='albums'?'active':''}" data-filter="albums">Albums</button>
    </div>` : ''}

    <div id="profile-content"></div>
  </div>`;
}

function renderProfileContent() {
  const user = store.getUser(routeParams.id);
  if (!user) return;
  const container = document.getElementById('profile-content');
  if (!container) return;

  let html = '';

  if (profileTab === 'posts') {
    if (profileFilter !== 'albums') {
      let recipes = store.getUserRecipes(user.id);
      if (profileFilter === 'free') recipes = recipes.filter(r => !r.isPaid);
      if (profileFilter === 'paid') recipes = recipes.filter(r => r.isPaid);
      if (recipes.length) html += `<div class="cards-grid">${recipes.map(r => renderRecipeCard(r)).join('')}</div>`;
    }
    if (profileFilter === 'all' || profileFilter === 'albums') {
      const albums = store.getUserAlbums(user.id);
      if (albums.length) {
        if (profileFilter === 'all' && html) html += '<div style="height:24px;"></div>';
        html += `<div class="cards-grid">${albums.map(a => renderAlbumCard(a)).join('')}</div>`;
      }
    }
  } else if (profileTab === 'shared') {
    if (profileFilter !== 'albums') {
      const recipes = store.getUserRepostedRecipes(user.id);
      if (recipes.length) html += `<div class="cards-grid">${recipes.map(r => renderRecipeCard(r)).join('')}</div>`;
    }
    if (profileFilter === 'all' || profileFilter === 'albums') {
      const albums = store.getUserRepostedAlbums(user.id);
      if (albums.length) {
        if (profileFilter !== 'albums' && html) html += '<div style="height:24px;"></div>';
        html += `<div class="cards-grid">${albums.map(a => renderAlbumCard(a)).join('')}</div>`;
      }
    }
  }

  container.innerHTML = html || emptyState('Nothing here yet');
  bindCardEvents(container);
}

function bindProfileEvents() {
  document.querySelectorAll('[data-action="follow"]').forEach(btn => {
    btn.addEventListener('click', () => { store.toggleFollow(btn.dataset.userId); render(); });
  });

  document.querySelectorAll('.tab[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => { profileTab = tab.dataset.tab; profileFilter = 'all'; render(); setTimeout(renderProfileContent, 10); });
  });

  document.querySelectorAll('.tab[data-filter]').forEach(tab => {
    tab.addEventListener('click', () => { profileFilter = tab.dataset.filter; renderProfileContent(); });
  });

  setTimeout(renderProfileContent, 10);
}

// --- MY PROFILE ---
let myProfileTab = 'posts';
let myProfileFilter = 'all';

function renderMyProfile() {
  const user = store.currentUser;
  if (!user) return '';

  const totalLikes = store.getTotalLikes(user.id);
  const bg = `linear-gradient(135deg, ${user.avatarColors[0]}, ${user.avatarColors[1]})`;

  return `
  <div class="container">
    <div class="profile-header">
      <div class="profile-top">
        <div class="profile-avatar" style="background:${bg}">${user.name.charAt(0)}</div>
        <div class="profile-info">
          <div class="profile-name">${esc(user.name)}</div>
          <div class="profile-bio">${esc(user.bio)}</div>
          <div class="profile-stats">
            <span class="profile-stat"><strong>${user.followers.length}</strong> followers</span>
            <span class="profile-stat"><strong>${user.following.length}</strong> following</span>
            <span class="profile-stat"><strong>${formatNumber(totalLikes)}</strong> likes</span>
          </div>
        </div>
      </div>
      <div style="margin-top:16px;">
        <div class="settings-row">
          <label>Show my reposts to others</label>
          <label class="toggle-switch">
            <input type="checkbox" id="toggle-show-reposts" ${user.showReposts?'checked':''} />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>

    <div class="tabs">
      <button class="tab ${myProfileTab==='posts'?'active':''}" data-tab="posts">My Posts</button>
      <button class="tab ${myProfileTab==='liked'?'active':''}" data-tab="liked">Liked</button>
      <button class="tab ${myProfileTab==='shared'?'active':''}" data-tab="shared">Shared</button>
      <button class="tab ${myProfileTab==='purchased'?'active':''}" data-tab="purchased">Purchased</button>
    </div>

    ${myProfileTab === 'posts' ? `
    <div class="tabs" style="margin-bottom:20px;">
      <button class="tab ${myProfileFilter==='all'?'active':''}" data-filter="all">All</button>
      <button class="tab ${myProfileFilter==='free'?'active':''}" data-filter="free">Free</button>
      <button class="tab ${myProfileFilter==='paid'?'active':''}" data-filter="paid">Paid</button>
      <button class="tab ${myProfileFilter==='albums'?'active':''}" data-filter="albums">Albums</button>
    </div>` : ''}

    ${(myProfileTab === 'liked' || myProfileTab === 'shared') ? `
    <div class="tabs" style="margin-bottom:20px;">
      <button class="tab ${myProfileFilter==='all'?'active':''}" data-filter="all">All</button>
      <button class="tab ${myProfileFilter==='recipes'?'active':''}" data-filter="recipes">Recipes</button>
      <button class="tab ${myProfileFilter==='albums'?'active':''}" data-filter="albums">Albums</button>
    </div>` : ''}

    <div id="my-profile-content"></div>
  </div>`;
}

function renderMyProfileContent() {
  const user = store.currentUser;
  if (!user) return;
  const container = document.getElementById('my-profile-content');
  if (!container) return;

  let html = '';

  if (myProfileTab === 'posts') {
    if (myProfileFilter !== 'albums') {
      let recipes = store.getUserRecipes(user.id);
      if (myProfileFilter === 'free') recipes = recipes.filter(r => !r.isPaid);
      if (myProfileFilter === 'paid') recipes = recipes.filter(r => r.isPaid);
      if (recipes.length) {
        html += `<div class="cards-grid">${recipes.map(r => renderRecipeCard(r, true)).join('')}</div>`;
      }
    }
    if (myProfileFilter === 'all' || myProfileFilter === 'albums') {
      const albums = store.getUserAlbums(user.id);
      if (albums.length) {
        if (myProfileFilter === 'all' && html) html += '<div style="height:24px;"></div>';
        html += `<div class="cards-grid">${albums.map(a => renderAlbumCard(a, true)).join('')}</div>`;
      }
    }
  } else if (myProfileTab === 'liked') {
    if (myProfileFilter !== 'albums') {
      const recipes = store.getLikedRecipes();
      if (recipes.length) html += `<div class="cards-grid">${recipes.map(r => renderRecipeCard(r)).join('')}</div>`;
    }
    if (myProfileFilter === 'all' || myProfileFilter === 'albums') {
      const albums = store.getLikedAlbums();
      if (albums.length) {
        if (myProfileFilter !== 'albums' && html) html += '<div style="height:24px;"></div>';
        html += `<div class="cards-grid">${albums.map(a => renderAlbumCard(a)).join('')}</div>`;
      }
    }
  } else if (myProfileTab === 'shared') {
    if (myProfileFilter !== 'albums') {
      const recipes = store.getRepostedRecipes();
      if (recipes.length) html += `<div class="cards-grid">${recipes.map(r => renderRecipeCard(r)).join('')}</div>`;
    }
    if (myProfileFilter === 'all' || myProfileFilter === 'albums') {
      const albums = store.getRepostedAlbums();
      if (albums.length) {
        if (myProfileFilter !== 'albums' && html) html += '<div style="height:24px;"></div>';
        html += `<div class="cards-grid">${albums.map(a => renderAlbumCard(a)).join('')}</div>`;
      }
    }
  } else if (myProfileTab === 'purchased') {
    const purchases = store.getPurchased();
    if (purchases.length) {
      const items = purchases.map(p => {
        if (p.type === 'recipe') return { type: 'recipe', item: store.getRecipe(p.id) };
        return { type: 'album', item: store.getAlbum(p.id) };
      }).filter(x => x.item);
      html += `<div class="cards-grid">${items.map(x => x.type === 'recipe' ? renderRecipeCard(x.item) : renderAlbumCard(x.item)).join('')}</div>`;
    }
  }

  container.innerHTML = html || emptyState('Nothing here yet');
  bindCardEvents(container);
}

function bindMyProfileEvents() {
  document.getElementById('toggle-show-reposts')?.addEventListener('change', function() {
    store.updateProfile({ showReposts: this.checked });
    showToast(this.checked ? 'Reposts visible to others' : 'Reposts hidden from others');
  });

  document.querySelectorAll('.tab[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => { myProfileTab = tab.dataset.tab; myProfileFilter = 'all'; render(); setTimeout(renderMyProfileContent, 10); });
  });

  document.querySelectorAll('.tab[data-filter]').forEach(tab => {
    tab.addEventListener('click', () => { myProfileFilter = tab.dataset.filter; renderMyProfileContent(); });
  });

  setTimeout(renderMyProfileContent, 10);
}

// --- CREATE / EDIT RECIPE ---
let createRecipePhotos = [''];
let createRecipeIngredients = [];

function renderCreateRecipe(isEdit = false) {
  let recipe = null;
  if (isEdit) {
    recipe = store.getRecipe(routeParams.id);
    if (!recipe || recipe.authorId !== store.currentUser?.id) return '<div class="container">' + emptyState('Not found') + '</div>';
    createRecipePhotos = recipe.photos.length ? [...recipe.photos] : [''];
    createRecipeIngredients = [...recipe.ingredients];
  } else if (createRecipePhotos.length === 0) {
    createRecipePhotos = [''];
    createRecipeIngredients = [];
  }

  const r = recipe || {};

  const diffOptions = Object.entries(DIFFICULTY_LABELS).map(([k,v]) =>
    `<option value="${k}" ${r.difficulty===k?'selected':''}>${v}</option>`
  ).join('');

  const typeOptions = Object.entries(TYPE_LABELS).map(([k,v]) =>
    `<option value="${k}" ${r.type===k?'selected':''}>${v}</option>`
  ).join('');

  return `
  <div class="create-page">
    <button class="back-btn" onclick="history.back()" style="color:var(--text-secondary);background:none;border:none;cursor:pointer;font-size:0.88rem;font-weight:600;margin-bottom:20px;">&#8592; Back</button>
    <h1>${isEdit ? 'Edit Recipe' : 'Create Recipe'}</h1>

    <div class="form-group">
      <label>Title</label>
      <input type="text" id="cr-title" value="${esc(r.title||'')}" placeholder="Give your recipe a catchy name" />
    </div>

    <div class="form-group">
      <label>Short Description</label>
      <input type="text" id="cr-short-desc" value="${esc(r.shortDesc||'')}" placeholder="Brief description for the feed" />
    </div>

    <div class="form-group">
      <label>Full Instructions</label>
      <textarea id="cr-full-desc" placeholder="Step-by-step cooking instructions..." style="min-height:200px;">${esc(r.fullDesc||'')}</textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Difficulty</label>
        <select id="cr-difficulty">${diffOptions}</select>
      </div>
      <div class="form-group">
        <label>Duration (minutes)</label>
        <input type="number" id="cr-duration" value="${r.duration||''}" min="1" placeholder="e.g. 30" />
      </div>
    </div>

    <div class="form-group">
      <label>Type / Category</label>
      <select id="cr-type">${typeOptions}</select>
    </div>

    <div class="form-group">
      <label>Photo URLs</label>
      <p class="hint">Add image URLs for your recipe photos</p>
      <div class="photo-urls-list" id="cr-photos">
        ${createRecipePhotos.map((url, i) => `
          <div class="photo-url-row">
            <input type="text" value="${esc(url)}" placeholder="https://images.unsplash.com/..." data-photo-idx="${i}" />
            <button onclick="removePhotoUrl(${i})">&#10005;</button>
          </div>
        `).join('')}
      </div>
      <button class="btn-add-photo" onclick="addPhotoUrl()">+ Add Photo</button>
    </div>

    <div class="form-group">
      <label>Video URL (optional)</label>
      <input type="text" id="cr-video" value="${esc(r.videoUrl||'')}" placeholder="https://..." />
    </div>

    <div class="form-group">
      <label>Ingredients</label>
      <input type="text" class="ing-search" id="cr-ing-search" placeholder="Search ingredients..." style="margin-bottom:8px;border-radius:999px;" />
      <div class="ingredients-list" id="cr-ingredients">
        ${ALL_INGREDIENTS.map(ing => `
          <span class="ing-chip ${createRecipeIngredients.includes(ing)?'selected':''}" data-ing="${esc(ing)}">${esc(ing)}</span>
        `).join('')}
      </div>
    </div>

    <div class="form-group">
      <label class="checkbox-wrap">
        <input type="checkbox" id="cr-paid" ${r.isPaid?'checked':''} />
        <span>This is a paid recipe</span>
      </label>
    </div>

    <div class="form-group ${r.isPaid ? '' : 'hidden'}" id="cr-price-group">
      <label>Price ($)</label>
      <input type="number" id="cr-price" value="${r.price||''}" min="0.99" step="0.01" placeholder="4.99" />
    </div>

    <button class="btn-create" id="btn-save-recipe">${isEdit ? 'Save Changes' : 'Create Recipe'}</button>
  </div>`;
}

function addPhotoUrl() {
  createRecipePhotos.push('');
  render();
}

function removePhotoUrl(idx) {
  createRecipePhotos.splice(idx, 1);
  if (!createRecipePhotos.length) createRecipePhotos.push('');
  render();
}

function bindCreateRecipeEvents() {
  // Paid toggle
  document.getElementById('cr-paid')?.addEventListener('change', function() {
    document.getElementById('cr-price-group').classList.toggle('hidden', !this.checked);
  });

  // Ingredient search
  document.getElementById('cr-ing-search')?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('#cr-ingredients .ing-chip').forEach(chip => {
      chip.style.display = chip.dataset.ing.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  // Ingredient selection
  document.querySelectorAll('#cr-ingredients .ing-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const ing = chip.dataset.ing;
      const idx = createRecipeIngredients.indexOf(ing);
      if (idx > -1) createRecipeIngredients.splice(idx, 1);
      else createRecipeIngredients.push(ing);
      chip.classList.toggle('selected');
    });
  });

  // Save
  document.getElementById('btn-save-recipe')?.addEventListener('click', () => {
    const title = document.getElementById('cr-title').value.trim();
    const shortDesc = document.getElementById('cr-short-desc').value.trim();
    const fullDesc = document.getElementById('cr-full-desc').value.trim();
    const difficulty = document.getElementById('cr-difficulty').value;
    const duration = document.getElementById('cr-duration').value;
    const type = document.getElementById('cr-type').value;
    const videoUrl = document.getElementById('cr-video').value.trim();
    const isPaid = document.getElementById('cr-paid').checked;
    const price = document.getElementById('cr-price')?.value;

    // Gather photo URLs
    const photos = [];
    document.querySelectorAll('#cr-photos input').forEach(input => {
      const url = input.value.trim();
      if (url) photos.push(url);
    });

    if (!title) { showToast('Please enter a title'); return; }
    if (!shortDesc) { showToast('Please enter a short description'); return; }
    if (!fullDesc) { showToast('Please enter cooking instructions'); return; }
    if (!duration) { showToast('Please enter duration'); return; }

    const data = {
      title, shortDesc, fullDesc, difficulty, duration: parseInt(duration),
      type, photos, videoUrl, hasVideo: !!videoUrl,
      isPaid, price: isPaid ? parseFloat(price) || 0 : 0,
      ingredients: createRecipeIngredients
    };

    if (currentRoute === 'edit-recipe') {
      store.updateRecipe(routeParams.id, data);
      showToast('Recipe updated!');
      navigate('/my-profile');
    } else {
      const recipe = store.createRecipe(data);
      showToast('Recipe created!');

      // If creating for an album, return to album edit
      const albumId = routeParams.albumId;
      if (albumId) {
        const album = store.getAlbum(albumId);
        if (album) {
          album.recipeIds.push(recipe.id);
          store.save();
          navigate('/edit-album/' + albumId);
        } else {
          navigate('/recipe/' + recipe.id);
        }
      } else {
        navigate('/recipe/' + recipe.id);
      }
    }

    createRecipePhotos = [''];
    createRecipeIngredients = [];
  });
}

// --- CREATE / EDIT ALBUM ---
function renderCreateAlbum(isEdit = false) {
  let album = null;
  if (isEdit) {
    album = store.getAlbum(routeParams.id);
    if (!album || album.authorId !== store.currentUser?.id) return '<div class="container">' + emptyState('Not found') + '</div>';
  }

  const a = album || {};
  const recipeIds = a.recipeIds || [];
  const recipes = recipeIds.map(rid => store.getRecipe(rid)).filter(Boolean);

  const diffOptions = Object.entries(DIFFICULTY_LABELS).map(([k,v]) =>
      `<option value="${k}" ${a.difficulty===k?'selected':''}>${v}</option>`
  ).join('');

  const typeOptions = Object.entries(TYPE_LABELS).map(([k,v]) =>
      `<option value="${k}" ${a.type===k?'selected':''}>${v}</option>`
  ).join('');


  return `
  <div class="create-page">
    <button class="back-btn" onclick="history.back()" style="color:var(--text-secondary);background:none;border:none;cursor:pointer;font-size:0.88rem;font-weight:600;margin-bottom:20px;">&#8592; Back</button>
    <h1>${isEdit ? 'Edit Album' : 'Create Album'}</h1>

    <div class="form-group">
      <label>Title</label>
      <input type="text" id="ca-title" value="${esc(a.title||'')}" placeholder="Album title" />
    </div>

    <div class="form-group">
      <label>Description</label>
      <textarea id="ca-desc" placeholder="What is this album about...">${esc(a.description||'')}</textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Difficulty</label>
        <select id="cr-difficulty">${diffOptions}</select>
      </div>
    </div>

    <div class="form-group">
      <label>Type / Category</label>
      <select id="cr-type">${typeOptions}</select>
    </div>

    <div class="form-group">
      <label>Cover Image URL</label>
      <input type="text" id="ca-cover" value="${esc(a.coverPhoto||'')}" placeholder="https://images.unsplash.com/..." />
    </div>

    <div class="form-group">
      <label class="checkbox-wrap">
        <input type="checkbox" id="ca-paid" ${a.isPaid?'checked':''} />
        <span>This is a paid album</span>
      </label>
    </div>

    <div class="form-group ${a.isPaid ? '' : 'hidden'}" id="ca-price-group">
      <label>Price ($)</label>
      <input type="number" id="ca-price" value="${a.price||''}" min="0.99" step="0.01" placeholder="12.99" />
    </div>

    <div class="form-group">
      <label>Recipes in Album</label>
      <div class="album-recipe-list" id="album-recipes">
        ${recipes.map(r => `
          <div class="album-recipe-item" data-recipe-id="${r.id}">
            <span>${esc(r.title)}</span>
            <button onclick="removeFromAlbum('${r.id}')">Remove</button>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:12px;">
        <label style="font-size:0.85rem;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:8px;">Add existing recipe:</label>
        <select id="ca-add-existing" style="margin-bottom:8px;">
          <option value="">Select a recipe...</option>
          ${store.getUserRecipes(store.currentUser.id).filter(r => !recipeIds.includes(r.id)).map(r =>
            `<option value="${r.id}">${esc(r.title)}</option>`
          ).join('')}
        </select>
        <button class="btn-secondary" id="btn-add-existing" style="margin-bottom:8px;">Add Selected</button>
      </div>

      <button class="btn-secondary" id="btn-create-recipe-for-album">+ Create New Recipe for Album</button>
    </div>

    <button class="btn-create" id="btn-save-album">${isEdit ? 'Save Changes' : 'Create Album'}</button>
  </div>`;
}

function removeFromAlbum(recipeId) {
  if (currentRoute === 'edit-album') {
    const album = store.getAlbum(routeParams.id);
    if (album) {
      album.recipeIds = album.recipeIds.filter(id => id !== recipeId);
      store.save();
      render();
    }
  }
}

function bindCreateAlbumEvents() {
  document.getElementById('ca-paid')?.addEventListener('change', function() {
    document.getElementById('ca-price-group').classList.toggle('hidden', !this.checked);
  });

  document.getElementById('btn-add-existing')?.addEventListener('click', () => {
    const select = document.getElementById('ca-add-existing');
    const recipeId = select.value;
    if (!recipeId) return;

    if (currentRoute === 'edit-album') {
      const album = store.getAlbum(routeParams.id);
      if (album && !album.recipeIds.includes(recipeId)) {
        album.recipeIds.push(recipeId);
        store.save();
        render();
      }
    } else {
      // For new album, we store temporarily
      showToast('Save the album first, then add recipes');
    }
  });

  document.getElementById('btn-create-recipe-for-album')?.addEventListener('click', () => {
    if (currentRoute === 'edit-album') {
      navigate('/create-recipe/' + routeParams.id);
    } else {
      showToast('Save the album first, then add recipes');
    }
  });

  document.getElementById('btn-save-album')?.addEventListener('click', () => {
    const title = document.getElementById('ca-title').value.trim();
    const description = document.getElementById('ca-desc').value.trim();
    const coverPhoto = document.getElementById('ca-cover').value.trim();
    const isPaid = document.getElementById('ca-paid').checked;
    const price = document.getElementById('ca-price')?.value;

    if (!title) { showToast('Please enter a title'); return; }
    if (!description) { showToast('Please enter a description'); return; }

    const data = {
      title, description,
      coverPhoto: coverPhoto || ALBUM_COVERS.weekly,
      isPaid, price: isPaid ? parseFloat(price) || 0 : 0
    };

    if (currentRoute === 'edit-album') {
      const album = store.getAlbum(routeParams.id);
      store.updateAlbum(routeParams.id, { ...data, recipeIds: album.recipeIds });
      showToast('Album updated!');
      navigate('/my-profile');
    } else {
      const album = store.createAlbum(data);
      showToast('Album created! You can now add recipes by editing it.');
      navigate('/edit-album/' + album.id);
    }
  });
}

// --- Init ---
window.addEventListener('hashchange', parseRoute);
window.addEventListener('load', () => {
  parseRoute();
});
