/* script.js — LuxuryExpress
   Responsible for: products (fakestoreapi), testimonials (jsonplaceholder),
   cart (localStorage), theme toggle, scroll animations, tracking & newsletter mocks.
*/

(() => {
  // ---- Config ----
  const PRODUCTS_API = 'https://fakestoreapi.com/products';
  const TESTIMONIALS_API = 'https://jsonplaceholder.typicode.com/comments?_limit=6';
  const CART_KEY = 'lx_cart_v1';
  const THEME_KEY = 'lx_theme_v1';

  // ---- Utilities ----
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  function toast(msg, timeout = 2200){
    const t = document.createElement('div');
    t.className = 'lx-toast';
    t.textContent = msg;
    Object.assign(t.style, {
      position: 'fixed', right: '20px', bottom: '20px', padding: '10px 14px',
      background: 'rgba(0,0,0,0.8)', color: '#fff', borderRadius: '10px', zIndex: 9999,
      transition: 'transform 0.25s ease, opacity 0.25s ease'
    });
    document.body.appendChild(t);
    setTimeout(()=> t.style.opacity = '0', timeout - 400);
    setTimeout(()=> t.remove(), timeout);
  }

  // ---- Theme Toggle ----
  function applyTheme(theme){
    if(theme === 'dark') document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem(THEME_KEY, theme);
  }
  function initTheme(){
    const saved = localStorage.getItem(THEME_KEY);
    const themeBtn = $('#themeToggle');
    if(saved) {
      applyTheme(saved);
      themeBtn?.setAttribute('aria-pressed', saved === 'dark' ? 'true' : 'false');
    }
    themeBtn?.addEventListener('click', ()=>{
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      themeBtn.setAttribute('aria-pressed', (!isDark).toString());
      themeBtn.innerHTML = isDark ? '🌞' : '🌒';  // Visual feedback
      themeBtn.title = `Switch to ${isDark ? 'dark' : 'light'} mode`; // Tooltip
    });
    // Set initial icon and tooltip
    if(themeBtn) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeBtn.innerHTML = isDark ? '🌒' : '🌞';
      themeBtn.title = `Switch to ${isDark ? 'light' : 'dark'} mode`;
    }
  }

  // ---- Cart ----
  function loadCart(){
    try{ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }catch(e){ return []; }
  }
  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
    renderMiniCart();
    // If we're on the cart page, refresh the cart list
    try{ if(typeof renderCartPage === 'function') renderCartPage(); }catch(e){}
  }
  function addToCart(product){
    const cart = loadCart();
    const found = cart.find(i=>i.id === product.id);
    if(found){ found.qty = (found.qty||1) + 1; }
    else cart.push({ id: product.id, title: product.title, price: product.price, img: product.image, qty: 1 });
    saveCart(cart);
    toast('Added to cart');
  }
  function changeQty(id, delta){
    const cart = loadCart();
    const idx = cart.findIndex(i=>i.id === id);
    if(idx === -1) return;
    cart[idx].qty = Math.max(0, (cart[idx].qty||1) + delta);
    if(cart[idx].qty === 0) cart.splice(idx,1);
    saveCart(cart);
  }
  function updateCartBadge(){
    const count = loadCart().reduce((s,i)=> s + (i.qty||1), 0);
    const badge = $('#cartBadge'); if(badge) badge.textContent = count;
    const countEl = $('#cartCount'); if(countEl) countEl.textContent = count;
  }

  function renderMiniCart(){
    const container = $('#cartList');
    if(!container) return;
    const cart = loadCart();
    container.innerHTML = '';
    if(cart.length === 0){ container.textContent = 'Your cart is empty'; $('#subtotal') && ($('#subtotal').textContent = '$0.00'); return; }
    const grid = document.createElement('div'); grid.className = 'mini-grid';
    let subtotal = 0;
    cart.forEach(item => {
      subtotal += item.price * (item.qty||1);
      const row = document.createElement('div'); row.className = 'mini-item';
      row.innerHTML = `
        <img src="${item.img}" alt="${item.title}" loading="lazy" style="width:64px;height:64px;object-fit:cover;border-radius:6px">
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:0.95rem">${item.title}</div>
          <div style="color:var(--color-muted);font-size:0.9rem">$${item.price.toFixed(2)} each</div>
          <div style="margin-top:6px;display:flex;gap:6px;align-items:center">
            <button class="qty-btn" data-decrease="${item.id}">-</button>
            <div style="min-width:26px;text-align:center">${item.qty}</div>
            <button class="qty-btn" data-increase="${item.id}">+</button>
            <button class="muted remove-btn" data-remove="${item.id}" style="margin-left:8px;background:none;border:0;cursor:pointer;color:var(--color-muted)">Remove</button>
          </div>
        </div>
      `;
      grid.appendChild(row);
    });
    container.appendChild(grid);
    $('#subtotal') && ($('#subtotal').textContent = '$' + subtotal.toFixed(2));
  }

  // ---- Fetch products & render ----
  async function fetchProducts(){
    try{
      const res = await fetch(PRODUCTS_API);
      if(!res.ok) throw new Error('Bad response');
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }catch(err){
      console.warn('Products API failed, using fallback.', err);
      // fallback minimal dataset
      return [
        {id:111,title:'Fallback Leather Bag',price:149.99,image:'https://picsum.photos/seed/f1/800/600'},
        {id:112,title:'Fallback Watch',price:199.99,image:'https://picsum.photos/seed/f2/800/600'},
        {id:113,title:'Fallback Candle Set',price:39.99,image:'https://picsum.photos/seed/f3/800/600'}
      ];
    }
  }

  function createProductCard(product){
    const el = document.createElement('article');
    el.className = 'product-card card lx-animate';
    el.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div style="padding:0.8rem">
        <h4 title="${product.title}">${product.title.length>60 ? product.title.slice(0,57)+'...' : product.title}</h4>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.6rem">
          <div style="font-weight:800">$${(product.price||0).toFixed(2)}</div>
          <div style="display:flex;gap:8px;align-items:center">
            <button class="btn small" data-addid="${product.id}">Add</button>
          </div>
        </div>
      </div>
    `;
    // allow clicking the whole card to show details and keyboard access
    el.dataset.productId = product.id;
    el.setAttribute('role', 'button');
    el.tabIndex = 0;
    return el;
  }

  // ---- Shop page integration (consolidated) ----
  async function initShopPage(){
    const shopGrid = document.getElementById('shop-grid');
    if(!shopGrid) return;
    const shimmer = document.getElementById('loading-shimmer');
    const categorySelect = document.getElementById('categorySelect');
    const sortSelect = document.getElementById('sortSelect');
    const shopFilter = document.getElementById('shopFilter');

    let products = [];
    try{
      if(shimmer) shimmer.style.display = 'block';
      products = await fetchProducts();
    }catch(e){
      console.warn('Shop products fetch failed', e);
      products = [];
    }finally{
      if(shimmer) shimmer.style.display = 'none';
    }

    // render categories
    if(categorySelect){
      categorySelect.innerHTML = '<option value="all">All Categories</option>';
      const cats = [...new Set(products.map(p => p.category))].filter(Boolean);
      cats.forEach(cat => {
        const opt = document.createElement('option'); opt.value = cat; opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1); categorySelect.appendChild(opt);
      });
      categorySelect.addEventListener('change', ()=>{
        applyShopFilters();
      });
    }

    if(sortSelect){
      sortSelect.addEventListener('change', ()=> applyShopFilters());
    }

    if(shopFilter){
      shopFilter.addEventListener('input', ()=> applyShopFilters());
    }

    function applyShopFilters(){
      let out = [...products];
      const cat = categorySelect ? categorySelect.value : 'all';
      if(cat && cat !== 'all') out = out.filter(p => p.category === cat);
      const sort = sortSelect ? sortSelect.value : 'default';
      if(sort === 'low-high') out.sort((a,b)=> a.price - b.price);
      if(sort === 'high-low') out.sort((a,b)=> b.price - a.price);
      const q = shopFilter ? (shopFilter.value || '').trim().toLowerCase() : '';
      if(q && q.length >= 1) out = out.filter(p => (p.title||'').toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q));
      renderShopGrid(out);
    }

    function renderShopGrid(list){
      shopGrid.innerHTML = '';
      if(!list || list.length === 0){ shopGrid.innerHTML = '<div class="muted">No products found</div>'; return; }
      list.forEach(p => shopGrid.appendChild(createProductCard(p)));
      observeAnimations();
    }

    // initial render
    renderShopGrid(products.slice(0, 100));
  }

  async function populateProducts(containerSelector = '#productGrid', limit = 6){
    const container = document.querySelector(containerSelector);
    if(!container) return;
    container.innerHTML = '<div class="muted">Loading products…</div>';
    const products = await fetchProducts();
    container.innerHTML = '';
    const subset = products.slice(0, limit);
    subset.forEach(p => container.appendChild(createProductCard(p)));
    observeAnimations();
  }

  // ---- Testimonials ----
  async function loadTestimonials(){
    const container = $('#testGrid'); if(!container) return;
    container.innerHTML = '<div class="muted">Loading testimonials…</div>';
    try{
      const res = await fetch(TESTIMONIALS_API);
      if(!res.ok) throw new Error('Bad');
      const comments = await res.json();
      container.innerHTML = '';
      comments.forEach(c => {
        const fig = document.createElement('figure'); fig.className = 'testimonial lx-animate';
        fig.innerHTML = `<div style="display:flex;gap:0.6rem;align-items:center"><div style="width:40px;height:40px;background:linear-gradient(90deg,#e2e8f0,#c7d2fe);border-radius:999px;display:flex;align-items:center;justify-content:center;font-weight:700">${c.name[0]||'U'}</div><div style="font-weight:700">${c.name}</div></div><blockquote style="margin-top:0.6rem;color:var(--color-muted)">${c.body}</blockquote>`;
        container.appendChild(fig);
      });
      observeAnimations();
    }catch(err){
      console.warn('Testimonials failed, fallback used', err);
      const fallback = [
        {name:'Amaka', body:'Amazing quality, fast delivery.'},
        {name:'Tunde', body:'Support helped me pick the right watch.'},
        {name:'Sofia', body:'Packaging felt premium — great unboxing experience.'}
      ];
      container.innerHTML = '';
      fallback.forEach(c=>{
        const fig = document.createElement('figure'); fig.className='testimonial lx-animate';
        fig.innerHTML = `<div style="display:flex;gap:0.6rem;align-items:center"><div style="width:40px;height:40px;background:linear-gradient(90deg,#e2e8f0,#c7d2fe);border-radius:999px;display:flex;align-items:center;justify-content:center;font-weight:700">${c.name[0]||'U'}</div><div style="font-weight:700">${c.name}</div></div><blockquote style="margin-top:0.6rem;color:var(--color-muted)">${c.body}</blockquote>`;
        container.appendChild(fig);
      });
      observeAnimations();
    }
  }

  // ---- Track order simulation ----
  function initTracking(){
    $('#trackBtn')?.addEventListener('click', ()=>{
      const code = $('#trackInput')?.value?.trim();
      const out = $('#trackResult');
      if(!code){ out.textContent = 'Enter a tracking code to simulate status.'; return; }
      out.textContent = 'Checking…';
      setTimeout(()=>{
        // simple deterministic status based on hash
        const hash = Array.from(code).reduce((s,ch)=> s + ch.charCodeAt(0), 0);
        const statuses = ['Processing', 'Fulfilled', 'Shipped', 'Out for delivery', 'Delivered'];
        const status = statuses[hash % statuses.length];
        out.textContent = `Status: ${status}`;
      }, 800);
    });
  }

  // ---- Newsletter & subscribe mocks ----
  function initSubscriptions(){
    $('#notifyBtn')?.addEventListener('click', ()=>{
      const el = $('#notifyEmail');
      if(!el || !el.value.match(/\S+@\S+\.\S+/)) return toast('Enter a valid email');
      toast('Investor pack requested — check email'); el.value = '';
    });
    $('#subBtn')?.addEventListener('click', ()=>{
      const el = $('#subEmail');
      if(!el || !el.value.match(/\S+@\S+\.\S+/)) return toast('Enter a valid email');
      toast('Subscribed — thanks'); el.value = '';
    });
  }

  // ---- Search (client side) ----
  function initSearch(){
    const input = $('#searchInput');
    if(!input) return;
    let latest = [];
    input.addEventListener('input', async (e)=>{
      const q = e.target.value.trim().toLowerCase();
      if(q.length < 2){ // restore
        populateProducts('#productGrid', 6); return;
      }
      if(latest.length === 0) latest = await fetchProducts();
      const filtered = latest.filter(p => p.title.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q));
      const grid = $('#productGrid'); if(!grid) return;
      grid.innerHTML = '';
      if(filtered.length === 0){ grid.innerHTML = '<div class="muted">No products found</div>'; return; }
      filtered.slice(0,12).forEach(p => grid.appendChild(createProductCard(p)));
      observeAnimations();
    });
  }

  // ---- Animations: intersection observer ----
  let observer = null;
  function observeAnimations(){
    const items = document.querySelectorAll('.lx-animate');
    if(!observer){
      observer = new IntersectionObserver((entries)=>{
        entries.forEach(ent => {
          if(ent.isIntersecting){ ent.target.style.opacity = 1; ent.target.style.transform = 'translateY(0)'; observer.unobserve(ent.target); }
        });
      },{threshold:0.12});
    }
    items.forEach(it => {
      it.style.opacity = 0; it.style.transform = 'translateY(12px)'; observer.observe(it);
    });
  }

  // ---- Page-level init ----
  function initEvents(){
    // Delegate product add buttons
    document.addEventListener('click', e=>{
      const add = e.target.closest('[data-addid]'); if(add){ const id = +add.getAttribute('data-addid'); fetchProducts().then(all=>{ const p = all.find(x=>x.id===id); if(p) addToCart(p); else toast('Product not found'); }); return; }
      const inc = e.target.closest('[data-increase]'); if(inc){ changeQty(+inc.getAttribute('data-increase'), 1); return; }
      const dec = e.target.closest('[data-decrease]'); if(dec){ changeQty(+dec.getAttribute('data-decrease'), -1); return; }
      const rem = e.target.closest('[data-remove]'); if(rem){ changeQty(+rem.getAttribute('data-remove'), - (loadCart().find(i=>i.id===+rem.getAttribute('data-remove')).qty || 1)); return; }
    });

    // Mini cart quantity buttons
    document.addEventListener('click', e=>{
      if(e.target.classList.contains('qty-btn')){
        const inc = e.target.getAttribute('data-increase');
        const dec = e.target.getAttribute('data-decrease');
        if(inc) changeQty(+inc, 1);
        if(dec) changeQty(+dec, -1);
      }
      if(e.target.classList.contains('remove-btn')){
        const id = +e.target.getAttribute('data-remove');
        changeQty(id, - (loadCart().find(i=>i.id===id).qty || 1));
      }
    });

    // Checkout button demo
    $('#checkoutBtn')?.addEventListener('click', ()=>{
      if(loadCart().length === 0) return toast('Cart is empty');
      toast('Demo checkout — integrate Stripe/Paystack in backend');
    });

    // update year
    const y = new Date().getFullYear(); $('#year') && ($('#year').textContent = y);
  }

  // ---- Boot ----
  async function boot(){
    initTheme();
    initEvents();
    populateProducts('#productGrid', 6);
    loadTestimonials();
    renderMiniCart();
    updateCartBadge();
    initTracking();
    initSubscriptions();
    initSearch();
    // Initialize shop page if present
    try{ initShopPage(); }catch(e){}
    initProductModals();
    observeAnimations();

    // small accessibility: focus states for keyboard users
    document.addEventListener('keyup', e=>{ if(e.key === 'Tab') document.body.classList.add('show-focus'); });
  }

  // run
  // Expose a minimal global API so other pages can call cart / render functions
  function renderCartPage(){
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    const countEl = document.getElementById('cartCount') || document.getElementById('cartBadge');
    if(!container) return;
    const cart = loadCart();
    container.innerHTML = '';
    if(cart.length === 0){
      container.innerHTML = '<div class="muted">Your cart is empty</div>';
      if(totalEl) totalEl.textContent = '$0.00';
      if(countEl) countEl.textContent = '0';
      return;
    }
    let total = 0;
    const list = document.createElement('div'); list.className = 'cart-list';
    cart.forEach(item => {
      total += item.price * (item.qty||1);
      const row = document.createElement('div');
      row.className = 'cart-row';
      row.style.display = 'flex';
      row.style.gap = '1rem';
      row.style.alignItems = 'center';
      row.style.marginBottom = '1rem';
      row.style.padding = '0.75rem';
      row.style.background = 'var(--color-surface)';
      row.style.border = '1px solid var(--color-border)';
      row.style.borderRadius = '8px';
      row.innerHTML = `
        <img src="${item.img}" alt="${item.title}" style="width:90px;height:90px;object-fit:cover;border-radius:8px">
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;margin-bottom:0.25rem">${item.title}</div>
          <div style="color:var(--color-muted);font-size:0.95rem">$${item.price.toFixed(2)} each</div>
          <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
            <button class="btn small" aria-label="Decrease quantity" onclick="window.LX && LX.changeQty(${item.id}, -1)">-</button>
            <div style="min-width:32px;text-align:center;font-weight:600">${item.qty}</div>
            <button class="btn small" aria-label="Increase quantity" onclick="window.LX && LX.changeQty(${item.id}, 1)">+</button>
            <button class="btn ghost small" style="margin-left:8px" aria-label="Remove item" onclick="window.LX && LX.changeQty(${item.id}, -${item.qty})">Remove</button>
          </div>
        </div>
      `;
      list.appendChild(row);
    });
    container.appendChild(list);
    if(totalEl) totalEl.textContent = '$' + total.toFixed(2);
    if(countEl) countEl.textContent = loadCart().reduce((s,i)=> s + (i.qty||1), 0);

    // Update checkout / clear buttons state when on cart page
    try{
      const checkoutBtn = document.getElementById('checkoutBtn');
      const clearBtn = document.getElementById('clearCartBtn');
      const isEmpty = loadCart().length === 0;
      if(checkoutBtn) checkoutBtn.disabled = isEmpty;
      if(clearBtn) clearBtn.disabled = isEmpty;
    }catch(e){}
  }

  function clearCart(){
    localStorage.removeItem(CART_KEY);
    renderCartPage();
    updateCartBadge();
    renderMiniCart();
  }

  // Product modal functionality
  async function showProductModal(productId) {
    const products = await fetchProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Get related products (same category if available)
    const related = products
      .filter(p => p.id !== productId && (!p.category || p.category === product.category))
      .slice(0, 4);

    // Create modal HTML
    const modalHtml = `
      <div class="product-modal">
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
          <h2>${product.title}</h2>
          <div class="price">$${product.price.toFixed(2)}</div>
          <div class="description">${product.description || 'No description available.'}</div>
          <div class="attributes">
            ${product.category ? `
              <div class="attribute">
                <span class="attribute-label">Category:</span>
                <span>${product.category}</span>
              </div>
            ` : ''}
            <div class="attribute">
              <span class="attribute-label">SKU:</span>
              <span>LX-${product.id.toString().padStart(4, '0')}</span>
            </div>
          </div>
          <button class="btn primary" data-addid="${product.id}">Add to Cart</button>
        </div>
      </div>
      ${related.length > 0 ? `
        <div class="related-products">
          <h3>Related Products</h3>
          <div class="related-grid">
            ${related.map(p => `
              <a href="#" class="related-product" data-productid="${p.id}">
                <img src="${p.image}" alt="${p.title}">
                <h4>${p.title.length > 40 ? p.title.slice(0, 37) + '...' : p.title}</h4>
                <div class="price">$${p.price.toFixed(2)}</div>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    // Show modal
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.innerHTML = `
      <div class="modal">
        <button class="modal-close" aria-label="Close">&times;</button>
        ${modalHtml}
      </div>
    `;

    document.body.appendChild(modalBackdrop);
    modalBackdrop.style.display = 'flex';

    const modalEl = modalBackdrop.querySelector('.modal');
    if(modalEl){
      modalEl.setAttribute('role','dialog');
      modalEl.setAttribute('aria-modal','true');
      modalEl.setAttribute('aria-label', product.title ? product.title.substring(0,80) : 'Product details');
    }

    // Focus management & trap
    const previousActive = document.activeElement;
    const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    let focusable = Array.from(modalEl.querySelectorAll(focusableSelector));
    if(focusable.length === 0){
      modalEl.tabIndex = -1;
      modalEl.focus();
    } else {
      focusable[0].focus();
    }

    const handleTab = (e) => {
      if(e.key !== 'Tab') return;
      focusable = Array.from(modalEl.querySelectorAll(focusableSelector));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if(e.shiftKey){
        if(document.activeElement === first){
          e.preventDefault();
          last.focus();
        }
      } else {
        if(document.activeElement === last){
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleTab);

    function closeModal(){
      try{ modalBackdrop.remove(); }catch(e){}
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      if(previousActive && previousActive.focus) previousActive.focus();
    }

    // Handle clicks
    modalBackdrop.addEventListener('click', e => {
      if (e.target === modalBackdrop || e.target.closest('.modal-close')) {
        closeModal();
      }
      if (e.target.closest('.related-product')) {
        e.preventDefault();
        const id = +e.target.closest('.related-product').dataset.productid;
        closeModal();
        showProductModal(id);
      }
    });

    // Handle escape key
    const handleEscape = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  function initProductModals() {
    document.addEventListener('click', e => {
      const productCard = e.target.closest('.product-card');
      const addBtn = e.target.closest('[data-addid]');
      if (productCard && !addBtn) {
        e.preventDefault();
        const id = +productCard.querySelector('[data-addid]')?.dataset.addid;
        if (id) showProductModal(id);
      }
    });
  }

  // expose API and some aliases for older pages
  window.LX = {
    addToCart, loadCart, saveCart, changeQty, updateCartBadge, renderMiniCart, 
    renderCartPage, clearCart, toast, showProductModal
  };
  // friendly aliases
  window.updateCartCount = updateCartBadge;
  window.renderCartPage = renderCartPage;
  window.showToast = toast;

  document.addEventListener('DOMContentLoaded', boot);
})();