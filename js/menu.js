// js/menu.js
// Loads menu items via fetch (AJAX) and manages a simple cart using localStorage.

const menuGrid = document.getElementById("menuGrid");
const statusMsg = document.getElementById("statusMsg");

const cartCountEl = document.getElementById("cartCount");
const summaryCountEl = document.getElementById("summaryCount");
const summaryTotalEl = document.getElementById("summaryTotal");

const goToCartBtn = document.getElementById("goToCartBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

const MENU_URL = "data/menu.json";
const CART_KEY = "cart_v1";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Cart parse error:", err);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartTotals(cart) {
  let count = 0;
  let total = 0;

  for (const item of cart) {
    const qty = Number(item.qty) || 0;
    const price = Number(item.price) || 0;
    count += qty;
    total += qty * price;
  }
  return { count, total };
}

function renderCartSummary() {
  const cart = readCart();
  const { count, total } = getCartTotals(cart);

  if (cartCountEl) cartCountEl.textContent = String(count);
  if (summaryCountEl) summaryCountEl.textContent = String(count);
  if (summaryTotalEl) summaryTotalEl.textContent = total.toFixed(2);
}

function addToCart(menuItem) {
  const cart = readCart();

  // Find if item already exists in cart
  const existing = cart.find((c) => c.id === menuItem.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      qty: 1
    });
  }
  saveCart(cart);
  renderCartSummary();
  statusMsg.textContent = `"${menuItem.name}" added to cart.`;
}

function renderMenuItems(items) {
  if (!menuGrid) return;

  // Clear existing
  menuGrid.innerHTML = "";

  if (!items || items.length === 0) {
    statusMsg.textContent = "No items found.";
    return;
  }

  for (const item of items) {
    const card = document.createElement("div");
    card.className = "menu-card";

    const name = document.createElement("h3");
    name.textContent = item.name;

    const desc = document.createElement("p");
    desc.className = "menu-desc";
    desc.textContent = item.description || "Delicious and freshly prepared.";
    const price = document.createElement("p");
    price.className = "menu-price";
    price.textContent = `$${Number(item.price).toFixed(2)}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "add-btn";
    btn.textContent = "Add to Cart";
    btn.addEventListener("click", () => addToCart(item));

    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(price);
    card.appendChild(btn);

    menuGrid.appendChild(card);
  }
  statusMsg.textContent = `Loaded ${items.length} item(s).`;
}

async function loadMenu() {
  try {
    statusMsg.textContent = "Loading menu...";
    const res = await fetch(MENU_URL);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} while loading menu.json`);
    }

    const items = await res.json();
    renderMenuItems(items);
  } catch (err) {
    console.error(err);
    statusMsg.textContent =
      "Failed to load menu items. Please check Live Server and menu.json path.";
  }
}

// Buttons
if (goToCartBtn) {
  goToCartBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem(CART_KEY);
    renderCartSummary();
    statusMsg.textContent = "Cart cleared.";
  });
}

// Init
renderCartSummary();
loadMenu();
