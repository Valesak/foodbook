// ============== FOODGRAM APP ==============

let currentSearchMode = 'recipes'; // recipes | albums | accounts
let selectedIngredients = [];
let createAlbumRecipes = [];

// ============ ROUTER ============
function navigate(hash) {
  window.location.hash = hash;
}

function getRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  const parts = hash.split('/');
  return { page: parts[0], id: parts[1] ? parseInt(parts[1]) : null, sub: parts[2] };
}

window.addEventListener('hashchange', render);

// ============ INIT ============
function init() {
  loadState();
  if (appState.currentUser) {
    showApp();
  } else {
    showAuth();
  }
}

function showAuth() {
  document.getElementById('auth-screen').style.display = 'flex';
  document.getElementById('app').classList.remove('active');
  renderAuthForm('login');
}

function showApp() {
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('app').classList.add('active');
  render();
}

// ============ AUTH ============
function renderAuthForm(mode) {
  const card = document.getElementById('auth-card-body');
  if (mode === 'login') {
    card.innerHTML = `
      <div class="auth-form">
        <div class="auth-error" id="auth-error"></div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="auth-email" placeholder="demo@foodgram.com" value="demo@foodgram.com">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="auth-password" placeholder="password123" value="password123">
        </div>
        <button class="btn btn-primary btn-full" onclick="doLogin()">Sign In</button>
      </div>
      <div class="auth-switch">
        Don't have an account? <a onclick="renderAuthForm('register')">Sign Up</a>
      </div>`;
  } else {
    card.innerHTML = `
      <div class="auth-form">
        <div class="auth-error" id="auth-error"></div>
        <div class="form-group">
          <label>Name</label>
          <input type="text" id="auth-name" placeholder="Your name">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="auth-email" placeholder="your@email.com">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="auth-password" placeholder="Choose a password">
        </div>
        <button class="btn btn-primary btn-full" onclick="doRegister()">Create Account</button>
      </div>
      <div class="auth-switch">
        Already have an account? <a onclick="renderAuthForm('login')">Sign In</a>
      </div>`;
  }
}

function doLogin() {
  const email = document.getElementById('auth-email').value;
  const pass = document.getElementById('auth-password').value;
  const user = USERS.find(u => u.email === email && u.password === pass);
  if (user) {
    appState.currentUser = user.id;
    saveState();
    showApp();
  } else {
    const err = document.getElementById('auth-error');
    err.textContent = 'Invalid email or password. Try demo@foodgram.com / password123';
    err.style.display = 'block';
  }
}

function doRegister() {
  const name = document.getElementById('auth-name').value;
  const email = document.getElementById('auth-email').value;
  const pass = document.getElementById('auth-password').value;
  if (!name || !email || !pass) {
    const err = document.getElementById('auth-error');
    err.textContent = 'Please fill in all fields.';
    err.style.display = 'block';
    return;
  }
  if (USERS.find(u => u.email === email)) {
    const err = document.getElementById('auth-error');
    err.textContent = 'Email already in use.';
    err.style.display = 'block';
    return;
  }
  const newUser = {
    id: USERS.length + 1, name, username: name.toLowerCase().replace(/\s+/g, '_'),
    email, password: pass, avatar: '🧑‍🍳', bio: 'New Foodgram member!',
    followers: 0, following: [], totalLikes: 0, joinDate: new Date().toISOString().split('T')[0],
    showReposts: true
  };
  USERS.push(newUser);
  appState.currentUser = newUser.id;
  saveState();
  showApp();
}

function doLogout() {
  appState.currentUser = null;
  saveState();
  showAuth();
}

// ============ MAIN RENDER ============
function render() {
  const route = getRoute();
  const content = document.getElementById('main-content');
  const user = USERS.find(u => u.id === appState.currentUser);
  
  // Update nav
  document.getElementById('nav-user-btn').textContent = user ? user.avatar : '👤';
  
  switch(route.page) {
    case 'recipe': renderRecipeDetail(content, route.id); break;
    case 'album': renderAlbumDetail(content, route.id); break;
    case 'profile': renderProfile(content, route.id); break;
    case 'myprofile': renderMyProfile(content); break;
    case 'create-recipe': renderCreateRecipe(content); break;
    case 'create-album': renderCreateAlbum(content); break;
    case 'edit-recipe': renderCreateRecipe(content, route.id); break;
    default: renderHome(content);
  }
}

// ============ HOME PAGE ============
function renderHome(container) {
  const user = USERS.find(u => u.id === appState.currentUser);
  container.innerHTML = `
    <div class="filter-bar">
      <div class="search-mode-tabs" id="search-tabs">
        <button class="${currentSearchMode === 'recipes' ? 'active' : ''}" onclick="setSearchMode('recipes')">Recipes</button>
        <button class="${currentSearchMode === 'albums' ? 'active' : ''}" onclick="setSearchMode('albums')">Albums</button>
        <button class="${currentSearchMode === 'accounts' ? 'active' : ''}" onclick="setSearchMode('accounts')">Accounts</button>
      </div>
      <div id="filters-area"></div>
    </div>
    <div class="cards-grid" id="results-grid"></div>`;
  renderFilters();
  applyFilters();
}

function setSearchMode(mode) {
  currentSearchMode = mode;
  renderHome(document.getElementById('main-content'));
}

function renderFilters() {
  const area = document.getElementById('filters-area');
  if (currentSearchMode === 'accounts') {
    area.innerHTML = `<div class="filter-row">
      <div class="filter-group" style="flex:1">
        <label>Search accounts</label>
        <input type="text" id="filter-account-name" placeholder="Search by name..." 
          oninput="applyFilters()" style="padding:8px 12px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-family:var(--font-body);font-size:0.85rem;background:var(--bg);width:100%;outline:none">
      </div>
    </div>`;
    return;
  }
  
  if (currentSearchMode === 'albums') {
    area.innerHTML = `<div class="filter-row">
      <div class="filter-group" style="flex:1">
        <label>Search albums</label>
        <input type="text" id="filter-name" placeholder="Search by title..." 
          oninput="applyFilters()" style="padding:8px 12px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-family:var(--font-body);font-size:0.85rem;background:var(--bg);width:100%;outline:none">
      </div>
      <div class="filter-group">
        <label>Price</label>
        <select id="filter-paid" onchange="applyFilters()">
          <option value="all">All</option>
          <option value="free">Free only</option>
          <option value="paid">Paid only</option>
        </select>
      </div>
    </div>`;
    return;
  }

  area.innerHTML = `
    <div class="filter-row">
      <div class="filter-group">
        <label>Difficulty</label>
        <select id="filter-difficulty" onchange="applyFilters()">
          <option value="all">All levels</option>
          ${DIFFICULTY_LEVELS.map(d => `<option value="${d}">${d}</option>`).join('')}
        </select>
      </div>
      <div class="filter-group">
        <label>Duration (max <span id="dur-val">120</span> min)</label>
        <input type="range" id="filter-duration" min="5" max="120" value="120" oninput="document.getElementById('dur-val').textContent=this.value;applyFilters()">
      </div>
      <div class="filter-group">
        <label>Type</label>
        <select id="filter-type" onchange="applyFilters()">
          <option value="all">All types</option>
          ${RECIPE_TYPES.map(t => `<option value="${t}">${t}</option>`).join('')}
        </select>
      </div>
      <div class="filter-group">
        <label>Price</label>
        <select id="filter-paid" onchange="applyFilters()">
          <option value="all">All</option>
          <option value="free">Free only</option>
          <option value="paid">Paid only</option>
        </select>
      </div>
    </div>
    <div class="filter-row" style="margin-top:12px">
      <button class="btn btn-sm ${selectedIngredients.length ? 'btn-green' : 'btn-outline'}" onclick="toggleIngredientPicker()">
        🥕 Filter by Ingredients ${selectedIngredients.length ? '(' + selectedIngredients.length + ')' : ''}
      </button>
    </div>
    <div class="ingredient-picker ${selectedIngredients.length ? 'show' : ''}" id="ingredient-picker">
      ${ALL_INGREDIENTS.map(i => `<span class="ingredient-chip ${selectedIngredients.includes(i) ? 'selected' : ''}" onclick="toggleIngredient('${i}')">${i}</span>`).join('')}
    </div>`;
}

function toggleIngredientPicker() {
  document.getElementById('ingredient-picker').classList.toggle('show');
}

function toggleIngredient(name) {
  const idx = selectedIngredients.indexOf(name);
  if (idx >= 0) selectedIngredients.splice(idx, 1);
  else selectedIngredients.push(name);
  renderFilters();
  applyFilters();
}

function applyFilters() {
  const grid = document.getElementById('results-grid');
  if (!grid) return;

  if (currentSearchMode === 'accounts') {
    const q = (document.getElementById('filter-account-name')?.value || '').toLowerCase();
    const users = USERS.filter(u => u.id !== appState.currentUser && u.name.toLowerCase().includes(q));
    grid.innerHTML = users.map(u => renderUserCard(u)).join('');
    if (!users.length) grid.innerHTML = emptyState('No accounts found');
    return;
  }

  if (currentSearchMode === 'albums') {
    const q = (document.getElementById('filter-name')?.value || '').toLowerCase();
    const paid = document.getElementById('filter-paid')?.value || 'all';
    let albums = [...ALBUMS];
    if (q) albums = albums.filter(a => a.title.toLowerCase().includes(q));
    if (paid === 'free') albums = albums.filter(a => !a.isPaid);
    if (paid === 'paid') albums = albums.filter(a => a.isPaid);
    grid.innerHTML = albums.map(a => renderAlbumCard(a)).join('');
    if (!albums.length) grid.innerHTML = emptyState('No albums found');
    return;
  }

  // Recipes
  const difficulty = document.getElementById('filter-difficulty')?.value || 'all';
  const maxDur = parseInt(document.getElementById('filter-duration')?.value || '120');
  const type = document.getElementById('filter-type')?.value || 'all';
  const paid = document.getElementById('filter-paid')?.value || 'all';
  const searchQ = document.querySelector('.nav-search input')?.value?.toLowerCase() || '';

  let recipes = [...RECIPES, ...appState.userCreatedRecipes];
  if (searchQ) recipes = recipes.filter(r => r.title.toLowerCase().includes(searchQ));
  if (difficulty !== 'all') recipes = recipes.filter(r => r.difficulty === difficulty);
  recipes = recipes.filter(r => r.duration <= maxDur);
  if (type !== 'all') recipes = recipes.filter(r => r.type === type);
  if (paid === 'free') recipes = recipes.filter(r => !r.isPaid);
  if (paid === 'paid') recipes = recipes.filter(r => r.isPaid);
  if (selectedIngredients.length) {
    recipes = recipes.filter(r => selectedIngredients.every(ing => r.ingredients.includes(ing)));
  }

  grid.innerHTML = recipes.map(r => renderRecipeCard(r)).join('');
  if (!recipes.length) grid.innerHTML = emptyState('No recipes match your filters');
}

// ============ CARDS ============
function renderRecipeCard(r) {
  const author = USERS.find(u => u.id === r.authorId);
  const isLiked = appState.likedRecipes.includes(r.id);
  const isReposted = appState.repostedRecipes.includes(r.id);
  return `
    <div class="recipe-card" onclick="navigate('recipe/${r.id}')">
      <div class="card-image" style="background:${r.gradient}">
        ${r.photos[0]}
        ${r.isPaid ? `<span class="paid-badge">💰 $${r.price.toFixed(2)}</span>` : ''}
      </div>
      <div class="card-body">
        <h3>${r.title}</h3>
        <p class="card-desc">${r.shortDesc}</p>
        <div class="card-tags">
          <span class="tag tag-difficulty">${r.difficulty}</span>
          <span class="tag tag-type">${r.type}</span>
          <span class="tag tag-duration">${r.duration} min</span>
        </div>
        <div class="card-actions" onclick="event.stopPropagation()">
          <button class="${isLiked ? 'liked' : ''}" onclick="toggleLike('recipe',${r.id})">
            ${isLiked ? '❤️' : '🤍'} ${formatNum(r.likes + (isLiked ? 1 : 0))}
          </button>
          <button class="${isReposted ? 'reposted' : ''}" onclick="toggleRepost('recipe',${r.id})">
            🔄 ${formatNum(r.reposts + (isReposted ? 1 : 0))}
          </button>
        </div>
        <div class="card-author" onclick="event.stopPropagation()">
          <div class="author-avatar">${author?.avatar || '👤'}</div>
          <span class="author-name" onclick="navigate('profile/${r.authorId}')">${author?.name || 'Unknown'}</span>
        </div>
      </div>
    </div>`;
}

function renderAlbumCard(a) {
  const author = USERS.find(u => u.id === a.authorId);
  const isLiked = appState.likedAlbums.includes(a.id);
  const isReposted = appState.repostedAlbums.includes(a.id);
  return `
    <div class="album-card" onclick="navigate('album/${a.id}')">
      <div class="card-image" style="background:${a.gradient}">
        ${a.icon}
        <span class="album-count">📚 ${a.recipeIds.length} recipes</span>
        ${a.isPaid ? `<span class="paid-badge">💰 $${a.price.toFixed(2)}</span>` : ''}
      </div>
      <div class="card-body">
        <h3>${a.title}</h3>
        <p class="card-desc">${a.description}</p>
        <div class="card-actions" onclick="event.stopPropagation()">
          <button class="${isLiked ? 'liked' : ''}" onclick="toggleLike('album',${a.id})">
            ${isLiked ? '❤️' : '🤍'} ${formatNum(a.likes + (isLiked ? 1 : 0))}
          </button>
          <button class="${isReposted ? 'reposted' : ''}" onclick="toggleRepost('album',${a.id})">
            🔄 ${formatNum(a.reposts + (isReposted ? 1 : 0))}
          </button>
        </div>
        <div class="card-author" onclick="event.stopPropagation()">
          <div class="author-avatar">${author?.avatar || '👤'}</div>
          <span class="author-name" onclick="navigate('profile/${a.authorId}')">${author?.name || 'Unknown'}</span>
        </div>
      </div>
    </div>`;
}

function renderUserCard(u) {
  return `
    <div class="user-card" onclick="navigate('profile/${u.id}')">
      <div class="user-avatar">${u.avatar}</div>
      <h3>${u.name}</h3>
      <div class="user-handle">@${u.username}</div>
      <div class="user-stats">
        <span><strong>${formatNum(u.followers)}</strong> followers</span>
        <span><strong>${formatNum(u.totalLikes)}</strong> likes</span>
      </div>
    </div>`;
}

// ============ RECIPE DETAIL ============
function renderRecipeDetail(container, id) {
  const allRecipes = [...RECIPES, ...appState.userCreatedRecipes];
  const r = allRecipes.find(r => r.id === id);
  if (!r) { container.innerHTML = emptyState('Recipe not found'); return; }
  const author = USERS.find(u => u.id === r.authorId);
  const isLiked = appState.likedRecipes.includes(r.id);
  const isReposted = appState.repostedRecipes.includes(r.id);
  const isPurchased = appState.purchasedRecipes.includes(r.id) || r.authorId === appState.currentUser;
  const isFollowing = USERS.find(u => u.id === appState.currentUser)?.following?.includes(r.authorId);

  const locked = r.isPaid && !isPurchased;

  container.innerHTML = `
    <div class="page-detail fade-in">
      <button class="back-btn" onclick="history.back()">← Back</button>
      <div class="detail-hero" style="background:${r.gradient}">
        ${r.photos[0]}
        ${locked ? `
          <div class="paid-overlay">
            <div class="lock-icon">🔒</div>
            <p>Premium Recipe — $${r.price.toFixed(2)}</p>
            <button class="btn btn-primary" onclick="purchaseRecipe(${r.id})">Purchase to Unlock</button>
          </div>` : ''}
      </div>
      <h1 class="detail-title">${r.title}</h1>
      <div class="detail-author">
        <div class="author-avatar" onclick="navigate('profile/${r.authorId}')">${author?.avatar || '👤'}</div>
        <div class="author-info">
          <div class="name" onclick="navigate('profile/${r.authorId}')">${author?.name || 'Unknown'}</div>
          <div class="date">${r.type} · ${r.difficulty} · ${r.duration} min</div>
        </div>
        ${r.authorId !== appState.currentUser ? `
          <button class="btn btn-sm ${isFollowing ? 'btn-outline' : 'btn-primary'}" onclick="toggleFollow(${r.authorId})">
            ${isFollowing ? 'Following' : 'Follow'}
          </button>` : ''}
      </div>
      <div class="detail-stats">
        <button class="${isLiked ? 'liked' : ''}" onclick="toggleLike('recipe',${r.id});render()">
          ${isLiked ? '❤️' : '🤍'} ${formatNum(r.likes + (isLiked ? 1 : 0))} likes
        </button>
        <button class="${isReposted ? 'reposted' : ''}" onclick="toggleRepost('recipe',${r.id});render()">
          🔄 ${formatNum(r.reposts + (isReposted ? 1 : 0))} reposts
        </button>
      </div>
      ${!locked ? `
        <div class="detail-section">
          <h2>Ingredients</h2>
          <div class="ingredient-list">
            ${r.ingredients.map(i => `<span class="ing-item">${i}</span>`).join('')}
          </div>
        </div>
        <div class="detail-section">
          <h2>Instructions</h2>
          <div class="detail-description">${formatDescription(r.description)}</div>
        </div>` : ''}
      <div class="comments-section detail-section">
        <h2>Comments (${r.comments?.length || 0})</h2>
        <div class="comment-form">
          <input type="text" placeholder="Write a comment..." id="comment-input-${r.id}">
          <button class="btn btn-primary btn-sm" onclick="addComment('recipe',${r.id})">Post</button>
        </div>
        <div id="comments-list">
          ${(r.comments || []).map(c => renderComment(c)).join('')}
        </div>
      </div>
    </div>`;
}

// ============ ALBUM DETAIL ============
function renderAlbumDetail(container, id) {
  const allAlbums = [...ALBUMS, ...appState.userCreatedAlbums];
  const a = allAlbums.find(a => a.id === id);
  if (!a) { container.innerHTML = emptyState('Album not found'); return; }
  const author = USERS.find(u => u.id === a.authorId);
  const isLiked = appState.likedAlbums.includes(a.id);
  const isReposted = appState.repostedAlbums.includes(a.id);
  const isPurchased = appState.purchasedAlbums.includes(a.id) || a.authorId === appState.currentUser;
  const locked = a.isPaid && !isPurchased;

  const allRecipes = [...RECIPES, ...appState.userCreatedRecipes];
  const albumRecipes = a.recipeIds.map(rid => allRecipes.find(r => r.id === rid)).filter(Boolean);

  container.innerHTML = `
    <div class="page-detail fade-in">
      <button class="back-btn" onclick="history.back()">← Back</button>
      <div class="detail-hero" style="background:${a.gradient}">
        ${a.icon}
        ${locked ? `
          <div class="paid-overlay">
            <div class="lock-icon">🔒</div>
            <p>Premium Album — $${a.price.toFixed(2)}</p>
            <button class="btn btn-primary" onclick="purchaseAlbum(${a.id})">Purchase to Unlock</button>
          </div>` : ''}
      </div>
      <h1 class="detail-title">${a.title}</h1>
      <div class="detail-author">
        <div class="author-avatar" onclick="navigate('profile/${a.authorId}')">${author?.avatar || '👤'}</div>
        <div class="author-info">
          <div class="name" onclick="navigate('profile/${a.authorId}')">${author?.name || 'Unknown'}</div>
          <div class="date">${albumRecipes.length} recipes</div>
        </div>
      </div>
      <div class="detail-stats">
        <button class="${isLiked ? 'liked' : ''}" onclick="toggleLike('album',${a.id});render()">
          ${isLiked ? '❤️' : '🤍'} ${formatNum(a.likes + (isLiked ? 1 : 0))} likes
        </button>
        <button class="${isReposted ? 'reposted' : ''}" onclick="toggleRepost('album',${a.id});render()">
          🔄 ${formatNum(a.reposts + (isReposted ? 1 : 0))} reposts
        </button>
      </div>
      <div class="detail-section">
        <h2>Description</h2>
        <p class="detail-description">${a.description}</p>
      </div>
      ${!locked ? `
        <div class="detail-section">
          <h2>Recipes in this Album</h2>
          <div class="album-recipes-list">
            ${albumRecipes.map(r => `
              <div class="album-recipe-item" onclick="navigate('recipe/${r.id}')">
                <div class="item-thumb" style="background:${r.gradient}">${r.photos[0]}</div>
                <div class="item-info">
                  <h4>${r.title}</h4>
                  <p>${r.difficulty} · ${r.duration} min · ${r.type}</p>
                </div>
              </div>`).join('')}
          </div>
        </div>` : ''}
      <div class="comments-section detail-section">
        <h2>Comments (${a.comments?.length || 0})</h2>
        <div class="comment-form">
          <input type="text" placeholder="Write a comment..." id="comment-input-album-${a.id}">
          <button class="btn btn-primary btn-sm" onclick="addComment('album',${a.id})">Post</button>
        </div>
        <div id="comments-list">
          ${(a.comments || []).map(c => renderComment(c)).join('')}
        </div>
      </div>
    </div>`;
}

// ============ PROFILE ============
function renderProfile(container, userId) {
  const user = USERS.find(u => u.id === userId);
  if (!user) { container.innerHTML = emptyState('User not found'); return; }
  const isOwn = userId === appState.currentUser;
  if (isOwn) { renderMyProfile(container); return; }
  
  const isFollowing = USERS.find(u => u.id === appState.currentUser)?.following?.includes(userId);
  const allRecipes = [...RECIPES, ...appState.userCreatedRecipes];
  const userRecipes = allRecipes.filter(r => r.authorId === userId);
  const userAlbums = [...ALBUMS, ...appState.userCreatedAlbums].filter(a => a.authorId === userId);

  // Shared/reposted items (simplified: show some recipes the user might have reposted)
  const sharedRecipes = allRecipes.filter(r => r.authorId !== userId).slice(0, 2);

  container.innerHTML = `
    <div class="fade-in">
      <button class="back-btn" onclick="history.back()">← Back</button>
      <div class="profile-header">
        <div class="profile-avatar">${user.avatar}</div>
        <div class="profile-name">${user.name}</div>
        <div class="profile-handle">@${user.username}</div>
        <p class="profile-bio">${user.bio}</p>
        <div class="profile-stats">
          <div class="stat"><span class="stat-number">${formatNum(user.followers)}</span><span class="stat-label">Followers</span></div>
          <div class="stat"><span class="stat-number">${formatNum(user.totalLikes)}</span><span class="stat-label">Likes</span></div>
          <div class="stat"><span class="stat-number">${userRecipes.length + userAlbums.length}</span><span class="stat-label">Posts</span></div>
        </div>
        <div style="margin-top:16px">
          <button class="btn ${isFollowing ? 'btn-outline' : 'btn-primary'}" onclick="toggleFollow(${userId});render()">
            ${isFollowing ? '✓ Following' : 'Follow'}
          </button>
        </div>
        <div class="profile-tabs" id="profile-tabs">
          <button class="active" onclick="filterProfile('all',${userId})">All</button>
          <button onclick="filterProfile('free',${userId})">Free</button>
          <button onclick="filterProfile('paid',${userId})">Paid</button>
          <button onclick="filterProfile('albums',${userId})">Albums</button>
          ${user.showReposts ? `<button onclick="filterProfile('shared',${userId})">Shared</button>` : ''}
        </div>
      </div>
      <div class="cards-grid" id="profile-grid">
        ${userRecipes.map(r => renderRecipeCard(r)).join('')}
        ${userAlbums.map(a => renderAlbumCard(a)).join('')}
      </div>
    </div>`;
}

function filterProfile(filter, userId) {
  const allRecipes = [...RECIPES, ...appState.userCreatedRecipes];
  const allAlbums = [...ALBUMS, ...appState.userCreatedAlbums];
  const grid = document.getElementById('profile-grid');
  const tabs = document.querySelectorAll('#profile-tabs button');
  tabs.forEach((t, i) => {
    const filters = ['all', 'free', 'paid', 'albums', 'shared'];
    t.classList.toggle('active', filters[i] === filter);
  });

  const userRecipes = allRecipes.filter(r => r.authorId === userId);
  const userAlbums = allAlbums.filter(a => a.authorId === userId);

  let html = '';
  switch(filter) {
    case 'free': html = userRecipes.filter(r => !r.isPaid).map(r => renderRecipeCard(r)).join(''); break;
    case 'paid': html = userRecipes.filter(r => r.isPaid).map(r => renderRecipeCard(r)).join(''); break;
    case 'albums': html = userAlbums.map(a => renderAlbumCard(a)).join(''); break;
    case 'shared':
      const shared = allRecipes.filter(r => r.authorId !== userId).slice(0, 3);
      html = shared.map(r => renderRecipeCard(r)).join('');
      break;
    default:
      html = userRecipes.map(r => renderRecipeCard(r)).join('') + userAlbums.map(a => renderAlbumCard(a)).join('');
  }
  grid.innerHTML = html || emptyState('Nothing here yet');
}

// ============ MY PROFILE ============
function renderMyProfile(container) {
  const user = USERS.find(u => u.id === appState.currentUser);
  if (!user) return;
  const allRecipes = [...RECIPES, ...appState.userCreatedRecipes];
  const allAlbums = [...ALBUMS, ...appState.userCreatedAlbums];
  const myRecipes = allRecipes.filter(r => r.authorId === user.id);
  const myAlbums = allAlbums.filter(a => a.authorId === user.id);
  const likedRecipes = allRecipes.filter(r => appState.likedRecipes.includes(r.id));
  const likedAlbums = allAlbums.filter(a => appState.likedAlbums.includes(a.id));
  const repostedRecipes = allRecipes.filter(r => appState.repostedRecipes.includes(r.id));
  const repostedAlbums = allAlbums.filter(a => appState.repostedAlbums.includes(a.id));

  container.innerHTML = `
    <div class="fade-in">
      <div class="profile-header">
        <div class="profile-avatar">${user.avatar}</div>
        <div class="profile-name">${user.name}</div>
        <div class="profile-handle">@${user.username}</div>
        <p class="profile-bio">${user.bio}</p>
        <div class="profile-stats">
          <div class="stat"><span class="stat-number">${formatNum(user.followers)}</span><span class="stat-label">Followers</span></div>
          <div class="stat"><span class="stat-number">${formatNum(user.totalLikes)}</span><span class="stat-label">Likes</span></div>
          <div class="stat"><span class="stat-number">${myRecipes.length + myAlbums.length}</span><span class="stat-label">Posts</span></div>
        </div>
        <div style="margin-top:16px">
          <button class="btn btn-outline btn-sm" onclick="doLogout()">Sign Out</button>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>⚙️ Settings</h3>
        <div class="toggle-row">
          <label>Show my reposts to others</label>
          <label class="toggle">
            <input type="checkbox" ${user.showReposts ? 'checked' : ''} onchange="user.showReposts=this.checked;showToast('Setting saved!')">
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="settings-section">
        <h3>📝 My Recipes & Albums</h3>
        ${myRecipes.length || myAlbums.length ? `
          ${myRecipes.map(r => `
            <div class="my-item">
              <div class="item-thumb" style="background:${r.gradient}">${r.photos[0]}</div>
              <div class="item-info">
                <h4 onclick="navigate('recipe/${r.id}')">${r.title}</h4>
                <p>${r.difficulty} · ${r.duration} min · ❤️ ${formatNum(r.likes)}</p>
              </div>
              <div class="item-actions">
                <button class="btn btn-xs btn-outline" onclick="navigate('edit-recipe/${r.id}')">Edit</button>
              </div>
            </div>`).join('')}
          ${myAlbums.map(a => `
            <div class="my-item">
              <div class="item-thumb" style="background:${a.gradient}">${a.icon}</div>
              <div class="item-info">
                <h4 onclick="navigate('album/${a.id}')">${a.title}</h4>
                <p>${a.recipeIds.length} recipes · ❤️ ${formatNum(a.likes)}</p>
              </div>
            </div>`).join('')}
        ` : emptyState("You haven't created anything yet")}
      </div>

      <div class="settings-section">
        <h3>❤️ Liked (${likedRecipes.length + likedAlbums.length})</h3>
        ${likedRecipes.length || likedAlbums.length ? `
          ${likedRecipes.map(r => `
            <div class="my-item">
              <div class="item-thumb" style="background:${r.gradient}">${r.photos[0]}</div>
              <div class="item-info">
                <h4 onclick="navigate('recipe/${r.id}')">${r.title}</h4>
                <p>by ${USERS.find(u=>u.id===r.authorId)?.name || 'Unknown'}</p>
              </div>
              <div class="item-actions">
                <button class="btn btn-xs btn-outline" onclick="toggleLike('recipe',${r.id});render()">Unlike</button>
              </div>
            </div>`).join('')}
          ${likedAlbums.map(a => `
            <div class="my-item">
              <div class="item-thumb" style="background:${a.gradient}">${a.icon}</div>
              <div class="item-info">
                <h4 onclick="navigate('album/${a.id}')">${a.title}</h4>
                <p>by ${USERS.find(u=>u.id===a.authorId)?.name || 'Unknown'}</p>
              </div>
              <div class="item-actions">
                <button class="btn btn-xs btn-outline" onclick="toggleLike('album',${a.id});render()">Unlike</button>
              </div>
            </div>`).join('')}
        ` : emptyState("No liked items yet")}
      </div>

      <div class="settings-section">
        <h3>🔄 Reposts (${repostedRecipes.length + repostedAlbums.length})</h3>
        ${repostedRecipes.length || repostedAlbums.length ? `
          ${repostedRecipes.map(r => `
            <div class="my-item">
              <div class="item-thumb" style="background:${r.gradient}">${r.photos[0]}</div>
              <div class="item-info">
                <h4 onclick="navigate('recipe/${r.id}')">${r.title}</h4>
                <p>by ${USERS.find(u=>u.id===r.authorId)?.name || 'Unknown'}</p>
              </div>
              <div class="item-actions">
                <button class="btn btn-xs btn-outline" onclick="toggleRepost('recipe',${r.id});render()">Remove</button>
              </div>
            </div>`).join('')}
          ${repostedAlbums.map(a => `
            <div class="my-item">
              <div class="item-thumb" style="background:${a.gradient}">${a.icon}</div>
              <div class="item-info">
                <h4 onclick="navigate('album/${a.id}')">${a.title}</h4>
                <p>by ${USERS.find(u=>u.id===a.authorId)?.name || 'Unknown'}</p>
              </div>
              <div class="item-actions">
                <button class="btn btn-xs btn-outline" onclick="toggleRepost('album',${a.id});render()">Remove</button>
              </div>
            </div>`).join('')}
        ` : emptyState("No reposts yet")}
      </div>
    </div>`;
}

// ============ CREATE RECIPE ============
function renderCreateRecipe(container, editId) {
  const allRecipes = [...RECIPES, ...appState.userCreatedRecipes];
  const editing = editId ? allRecipes.find(r => r.id === editId) : null;
  const emojis = ['🍝', '🥗', '🍗', '🍫', '🍄', '🍛', '🥣', '🌮', '🍞', '🍜', '🍰', '🥑', '🍣', '🥘', '🧁'];
  
  container.innerHTML = `
    <div class="create-page fade-in">
      <button class="back-btn" onclick="history.back()">← Back</button>
      <h1>${editing ? 'Edit' : 'Create'} Recipe</h1>
      <div class="create-form" id="recipe-form">
        <div class="form-group">
          <label>Title</label>
          <input type="text" id="cr-title" placeholder="Give your recipe a name" value="${editing?.title || ''}">
        </div>
        <div class="form-group">
          <label>Short Description</label>
          <input type="text" id="cr-short" placeholder="Brief description for cards" value="${editing?.shortDesc || ''}">
        </div>
        <div class="form-group">
          <label>Full Instructions (use **Step 1:** etc.)</label>
          <textarea id="cr-desc" placeholder="Write the full recipe with step-by-step instructions...">${editing?.description || ''}</textarea>
        </div>
        <div class="form-group">
          <label>Recipe Icon</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap" id="emoji-picker">
            ${emojis.map(e => `<span style="font-size:1.8rem;cursor:pointer;padding:4px;border-radius:8px;border:2px solid transparent" class="emoji-opt" onclick="selectEmoji(this,'${e}')">${e}</span>`).join('')}
          </div>
          <input type="hidden" id="cr-emoji" value="${editing?.photos?.[0] || '🍝'}">
        </div>
        <div class="filter-row">
          <div class="form-group">
            <label>Difficulty</label>
            <select id="cr-difficulty">
              ${DIFFICULTY_LEVELS.map(d => `<option value="${d}" ${editing?.difficulty === d ? 'selected' : ''}>${d}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Duration (min)</label>
            <input type="number" id="cr-duration" min="1" max="999" value="${editing?.duration || 30}">
          </div>
          <div class="form-group">
            <label>Type</label>
            <select id="cr-type">
              ${RECIPE_TYPES.map(t => `<option value="${t}" ${editing?.type === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Ingredients</label>
          <div class="selected-ingredients" id="cr-ingredients">
            ${(editing?.ingredients || []).map(i => `<span class="ing-tag">${i} <span class="remove-ing" onclick="removeCreateIngredient(this,'${i}')">×</span></span>`).join('')}
          </div>
          <select id="cr-ing-select" onchange="addCreateIngredient(this.value);this.value='';" style="margin-top:8px">
            <option value="">+ Add ingredient...</option>
            ${ALL_INGREDIENTS.map(i => `<option value="${i}">${i}</option>`).join('')}
          </select>
        </div>
        <div class="toggle-row">
          <label>Paid recipe</label>
          <label class="toggle">
            <input type="checkbox" id="cr-paid" ${editing?.isPaid ? 'checked' : ''} onchange="document.getElementById('cr-price-group').style.display=this.checked?'flex':'none'">
            <span class="slider"></span>
          </label>
        </div>
        <div class="form-group" id="cr-price-group" style="display:${editing?.isPaid ? 'flex' : 'none'}">
          <label>Price ($)</label>
          <input type="number" id="cr-price" min="0.99" step="0.01" value="${editing?.price || '2.99'}">
        </div>
        <button class="btn btn-primary btn-full" onclick="saveRecipe(${editId || 'null'})">${editing ? 'Save Changes' : 'Publish Recipe'}</button>
      </div>
    </div>`;
  
  // Highlight current emoji
  const currentEmoji = editing?.photos?.[0] || '🍝';
  document.querySelectorAll('.emoji-opt').forEach(el => {
    if (el.textContent === currentEmoji) el.style.borderColor = 'var(--accent)';
  });
}

let createIngredientsList = [];

function selectEmoji(el, emoji) {
  document.querySelectorAll('.emoji-opt').forEach(e => e.style.borderColor = 'transparent');
  el.style.borderColor = 'var(--accent)';
  document.getElementById('cr-emoji').value = emoji;
}

function addCreateIngredient(name) {
  if (!name) return;
  const container = document.getElementById('cr-ingredients');
  const existing = container.querySelectorAll('.ing-tag');
  for (const tag of existing) {
    if (tag.textContent.replace('×', '').trim() === name) return;
  }
  container.insertAdjacentHTML('beforeend', `<span class="ing-tag">${name} <span class="remove-ing" onclick="removeCreateIngredient(this,'${name}')">×</span></span>`);
}

function removeCreateIngredient(el, name) {
  el.parentElement.remove();
}

function saveRecipe(editId) {
  const title = document.getElementById('cr-title').value.trim();
  const shortDesc = document.getElementById('cr-short').value.trim();
  const description = document.getElementById('cr-desc').value.trim();
  const emoji = document.getElementById('cr-emoji').value;
  const difficulty = document.getElementById('cr-difficulty').value;
  const duration = parseInt(document.getElementById('cr-duration').value);
  const type = document.getElementById('cr-type').value;
  const isPaid = document.getElementById('cr-paid').checked;
  const price = parseFloat(document.getElementById('cr-price').value) || 0;

  const ingTags = document.querySelectorAll('#cr-ingredients .ing-tag');
  const ingredients = Array.from(ingTags).map(t => t.textContent.replace('×', '').trim());

  if (!title || !description) { showToast('Please fill in title and instructions!'); return; }

  const gradients = [
    "linear-gradient(135deg, #F5D585 0%, #D4A843 100%)",
    "linear-gradient(135deg, #7CB342 0%, #558B2F 100%)",
    "linear-gradient(135deg, #FF8A65 0%, #D84315 100%)",
    "linear-gradient(135deg, #CE93D8 0%, #7B1FA2 100%)",
    "linear-gradient(135deg, #81C784 0%, #388E3C 100%)",
    "linear-gradient(135deg, #FFE082 0%, #FFC107 100%)"
  ];

  if (editId) {
    const allRecipes = [...RECIPES, ...appState.userCreatedRecipes];
    const r = allRecipes.find(r => r.id === editId);
    if (r) {
      Object.assign(r, { title, shortDesc, description, ingredients, difficulty, duration, type, isPaid, price, photos: [emoji] });
      showToast('Recipe updated!');
    }
  } else {
    const newRecipe = {
      id: 1000 + appState.userCreatedRecipes.length,
      authorId: appState.currentUser,
      title, shortDesc: shortDesc || title, description, ingredients, difficulty, duration, type, isPaid, price,
      likes: 0, reposts: 0,
      photos: [emoji],
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
      comments: []
    };
    appState.userCreatedRecipes.push(newRecipe);
    saveState();
    showToast('Recipe published! 🎉');
    
    // If creating for album, go back to album creation
    if (window._albumReturnMode) {
      createAlbumRecipes.push(newRecipe.id);
      window._albumReturnMode = false;
      navigate('create-album');
      return;
    }
  }
  navigate('myprofile');
}

// ============ CREATE ALBUM ============
function renderCreateAlbum(container) {
  const allRecipes = [...RECIPES, ...appState.userCreatedRecipes];
  const selectedRecipes = createAlbumRecipes.map(id => allRecipes.find(r => r.id === id)).filter(Boolean);
  const emojis = ['📚', '💪', '🥬', '🌱', '🇮🇹', '🔥', '🎯', '⭐', '🏆', '🍳'];

  container.innerHTML = `
    <div class="create-page fade-in">
      <button class="back-btn" onclick="createAlbumRecipes=[];history.back()">← Back</button>
      <h1>Create Album</h1>
      <div class="create-form">
        <div class="form-group">
          <label>Title</label>
          <input type="text" id="ca-title" placeholder="Album name">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea id="ca-desc" placeholder="Describe what this album is about..." style="min-height:100px"></textarea>
        </div>
        <div class="form-group">
          <label>Icon</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap" id="album-emoji-picker">
            ${emojis.map(e => `<span style="font-size:1.8rem;cursor:pointer;padding:4px;border-radius:8px;border:2px solid transparent" class="album-emoji-opt" onclick="selectAlbumEmoji(this,'${e}')">${e}</span>`).join('')}
          </div>
          <input type="hidden" id="ca-emoji" value="📚">
        </div>
        <div class="form-group">
          <label>Recipes in Album (${selectedRecipes.length})</label>
          <div class="album-recipes-list">
            ${selectedRecipes.map(r => `
              <div class="album-recipe-item" style="cursor:default">
                <div class="item-thumb" style="background:${r.gradient}">${r.photos[0]}</div>
                <div class="item-info">
                  <h4>${r.title}</h4>
                  <p>${r.difficulty} · ${r.duration} min</p>
                </div>
                <button class="btn btn-xs btn-outline" onclick="removeAlbumRecipe(${r.id})">Remove</button>
              </div>`).join('')}
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <select id="ca-recipe-select" style="flex:1;padding:8px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-family:var(--font-body);background:var(--bg)">
              <option value="">Select existing recipe...</option>
              ${allRecipes.filter(r => !createAlbumRecipes.includes(r.id)).map(r => `<option value="${r.id}">${r.title}</option>`).join('')}
            </select>
            <button class="btn btn-sm btn-secondary" onclick="addExistingToAlbum()">Add</button>
          </div>
          <button class="btn btn-sm btn-outline" style="margin-top:8px" onclick="window._albumReturnMode=true;navigate('create-recipe')">+ Create New Recipe</button>
        </div>
        <div class="toggle-row">
          <label>Paid album</label>
          <label class="toggle">
            <input type="checkbox" id="ca-paid" onchange="document.getElementById('ca-price-group').style.display=this.checked?'flex':'none'">
            <span class="slider"></span>
          </label>
        </div>
        <div class="form-group" id="ca-price-group" style="display:none">
          <label>Price ($)</label>
          <input type="number" id="ca-price" min="0.99" step="0.01" value="9.99">
        </div>
        <button class="btn btn-primary btn-full" onclick="saveAlbum()">Publish Album</button>
      </div>
    </div>`;
  
  document.querySelectorAll('.album-emoji-opt')[0].style.borderColor = 'var(--accent)';
}

function selectAlbumEmoji(el, emoji) {
  document.querySelectorAll('.album-emoji-opt').forEach(e => e.style.borderColor = 'transparent');
  el.style.borderColor = 'var(--accent)';
  document.getElementById('ca-emoji').value = emoji;
}

function addExistingToAlbum() {
  const sel = document.getElementById('ca-recipe-select');
  const id = parseInt(sel.value);
  if (!id) return;
  if (!createAlbumRecipes.includes(id)) {
    createAlbumRecipes.push(id);
    renderCreateAlbum(document.getElementById('main-content'));
  }
}

function removeAlbumRecipe(id) {
  createAlbumRecipes = createAlbumRecipes.filter(r => r !== id);
  renderCreateAlbum(document.getElementById('main-content'));
}

function saveAlbum() {
  const title = document.getElementById('ca-title').value.trim();
  const desc = document.getElementById('ca-desc').value.trim();
  const icon = document.getElementById('ca-emoji').value;
  const isPaid = document.getElementById('ca-paid').checked;
  const price = parseFloat(document.getElementById('ca-price').value) || 0;

  if (!title) { showToast('Please enter a title!'); return; }
  if (!createAlbumRecipes.length) { showToast('Add at least one recipe!'); return; }

  const gradients = [
    "linear-gradient(135deg, #EF5350 0%, #B71C1C 100%)",
    "linear-gradient(135deg, #66BB6A 0%, #2E7D32 100%)",
    "linear-gradient(135deg, #AED581 0%, #689F38 100%)",
    "linear-gradient(135deg, #FF8A65 0%, #D84315 100%)"
  ];

  const newAlbum = {
    id: 100 + appState.userCreatedAlbums.length,
    authorId: appState.currentUser,
    title, description: desc || title,
    recipeIds: [...createAlbumRecipes],
    isPaid, price,
    likes: 0, reposts: 0,
    gradient: gradients[Math.floor(Math.random() * gradients.length)],
    icon,
    comments: []
  };

  appState.userCreatedAlbums.push(newAlbum);
  createAlbumRecipes = [];
  saveState();
  showToast('Album published! 🎉');
  navigate('myprofile');
}

// ============ COMMENTS ============
function renderComment(c) {
  const user = USERS.find(u => u.id === c.userId);
  return `
    <div class="comment">
      <div class="comment-header">
        <div class="comment-avatar" onclick="navigate('profile/${c.userId}')">${user?.avatar || '👤'}</div>
        <span class="comment-author" onclick="navigate('profile/${c.userId}')">${user?.name || 'Unknown'}</span>
      </div>
      <p class="comment-text">${c.text}</p>
      <div class="comment-actions">
        <button>❤️ ${c.likes}</button>
        <button onclick="toggleReplyForm(${c.id})">Reply</button>
      </div>
      <div class="reply-form" id="reply-form-${c.id}">
        <input type="text" placeholder="Write a reply..." id="reply-input-${c.id}">
        <button class="btn btn-xs btn-primary" onclick="addReply(${c.id})">Reply</button>
      </div>
      ${c.replies?.length ? `
        <div class="comment-replies">
          ${c.replies.map(r => {
            const rUser = USERS.find(u => u.id === r.userId);
            return `
              <div class="comment">
                <div class="comment-header">
                  <div class="comment-avatar" onclick="navigate('profile/${r.userId}')">${rUser?.avatar || '👤'}</div>
                  <span class="comment-author" onclick="navigate('profile/${r.userId}')">${rUser?.name || 'Unknown'}</span>
                </div>
                <p class="comment-text">${r.text}</p>
                <div class="comment-actions"><button>❤️ ${r.likes}</button></div>
              </div>`;
          }).join('')}
        </div>` : ''}
    </div>`;
}

function toggleReplyForm(commentId) {
  document.getElementById(`reply-form-${commentId}`).classList.toggle('show');
}

function addComment(type, itemId) {
  const inputId = type === 'album' ? `comment-input-album-${itemId}` : `comment-input-${itemId}`;
  const input = document.getElementById(inputId);
  if (!input || !input.value.trim()) return;

  const allItems = type === 'album' 
    ? [...ALBUMS, ...appState.userCreatedAlbums]
    : [...RECIPES, ...appState.userCreatedRecipes];
  const item = allItems.find(i => i.id === itemId);
  if (!item) return;

  if (!item.comments) item.comments = [];
  item.comments.push({
    id: Date.now(),
    userId: appState.currentUser,
    text: input.value.trim(),
    likes: 0,
    replies: []
  });
  showToast('Comment posted!');
  render();
}

function addReply(commentId) {
  const input = document.getElementById(`reply-input-${commentId}`);
  if (!input || !input.value.trim()) return;

  // Find the comment across all items
  const allItems = [...RECIPES, ...appState.userCreatedRecipes, ...ALBUMS, ...appState.userCreatedAlbums];
  for (const item of allItems) {
    if (!item.comments) continue;
    const comment = item.comments.find(c => c.id === commentId);
    if (comment) {
      if (!comment.replies) comment.replies = [];
      comment.replies.push({
        id: Date.now(),
        userId: appState.currentUser,
        text: input.value.trim(),
        likes: 0
      });
      showToast('Reply posted!');
      render();
      return;
    }
  }
}

// ============ ACTIONS ============
function toggleLike(type, id) {
  const list = type === 'recipe' ? appState.likedRecipes : appState.likedAlbums;
  const idx = list.indexOf(id);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(id);
  saveState();
  // Re-render cards if on home
  if (getRoute().page === 'home' || !getRoute().page) applyFilters();
}

function toggleRepost(type, id) {
  const list = type === 'recipe' ? appState.repostedRecipes : appState.repostedAlbums;
  const idx = list.indexOf(id);
  if (idx >= 0) { list.splice(idx, 1); showToast('Repost removed'); }
  else { list.push(id); showToast('Reposted!'); }
  saveState();
  if (getRoute().page === 'home' || !getRoute().page) applyFilters();
}

function toggleFollow(userId) {
  const me = USERS.find(u => u.id === appState.currentUser);
  if (!me) return;
  const idx = me.following.indexOf(userId);
  if (idx >= 0) { me.following.splice(idx, 1); showToast('Unfollowed'); }
  else { me.following.push(userId); showToast('Following!'); }
}

function purchaseRecipe(id) {
  appState.purchasedRecipes.push(id);
  saveState();
  showToast('Recipe purchased! 🎉');
  render();
}

function purchaseAlbum(id) {
  appState.purchasedAlbums.push(id);
  saveState();
  showToast('Album purchased! 🎉');
  render();
}

// ============ HELPERS ============
function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function formatDescription(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function emptyState(msg) {
  return `<div class="empty-state"><div class="empty-icon">🍽️</div><p>${msg}</p></div>`;
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// Create dropdown toggle
function toggleCreateDropdown() {
  document.getElementById('create-dropdown').classList.toggle('show');
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const dd = document.getElementById('create-dropdown');
  if (dd && !e.target.closest('.create-btn-wrap')) dd.classList.remove('show');
});

// Nav search
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.nav-search input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      if (getRoute().page === 'home' || !window.location.hash || window.location.hash === '#home') {
        applyFilters();
      }
    });
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        navigate('home');
        setTimeout(applyFilters, 50);
      }
    });
  }
  init();
});
