// js/cart.js
// Reads cart from localStorage (cart_v1) and renders it.
// Supports: +/- quantity, remove item, clear cart, place order (simple confirmation).

/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {number} qty
 */

const CART_KEY = "cart_v1";

const cartMsg = document.getElementById("cartMsg");
const cartList = document.getElementById("cartList");
const cartCountEl = document.getElementById("cartCount");
const cartTotalEl = document.getElementById("cartTotal");

const clearCartBtn = document.getElementById("clearCartBtn");
const placeOrderBtn = document.getElementById("placeOrderBtn");

const cartTotalsSection = document.getElementById("cartTotals");
const cartActionsSection = document.getElementById("cartActions");

/** @returns {CartItem[]} */
function readCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.warn("Cart JSON parse error:", e);
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getTotals(cart) {
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

function setQty(itemId, newQty) {
    const cart = readCart();
    const found = cart.find((x) => x.id === itemId);

    if (!found) return;

    if (newQty <= 0) {
        // remove if qty becomes 0
        const updated = cart.filter((x) => x.id !== itemId);
        saveCart(updated);
    } else {
        found.qty = newQty;
        saveCart(cart);
    }
    renderCart();
}

function removeItem(itemId) {
    const cart = readCart();
    const updated = cart.filter((x) => x.id !== itemId);
    saveCart(updated);
    renderCart();
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    renderCart();
    cartMsg.textContent = "Cart cleared.";
}


function renderCart() {
    const cart = readCart();
    //cartList.innerHTML = "";
    //Maintain consistency of coding style across. 
    cartList.textContent = "";

    const { count, total } = getTotals(cart);

    cartCountEl.textContent = String(count);
    cartTotalEl.textContent = total.toFixed(2);

    if (cart.length === 0) {
        cartMsg.textContent = "Your cart is empty.";
        return;
    }

    cartMsg.textContent = `You have ${count} item(s) in your cart.`;

    for (const item of cart) {
        const row = document.createElement("div");
        row.className = "cart-row";

        const left = document.createElement("div");
        left.className = "cart-left";
        left.textContent = item.name;

        const mid = document.createElement("div");
        mid.className = "cart-mid";
        mid.textContent = `$${Number(item.price).toFixed(2)}`;

        const right = document.createElement("div");
        right.className = "cart-right";

        const minusBtn = document.createElement("button");
        minusBtn.type = "button";
        minusBtn.textContent = "-";
        minusBtn.setAttribute("aria-label", `Decrease quantity for ${item.name}`);
        minusBtn.addEventListener("click", () => setQty(item.id, Number(item.qty) - 1));

        const qtySpan = document.createElement("span");
        qtySpan.className = "cart-qty";
        qtySpan.textContent = String(item.qty);

        const plusBtn = document.createElement("button");
        plusBtn.type = "button";
        plusBtn.textContent = "+";
        plusBtn.setAttribute("aria-label", `Increase quantity for ${item.name}`);
        plusBtn.addEventListener("click", () => setQty(item.id, Number(item.qty) + 1));

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => removeItem(item.id));

        right.appendChild(minusBtn);
        right.appendChild(qtySpan);
        right.appendChild(plusBtn);
        right.appendChild(removeBtn);

        row.appendChild(left);
        row.appendChild(mid);
        row.appendChild(right);

        cartList.appendChild(row);
    }
}

function displaySummary() {
    // Displaying summary - 

    const cart = readCart();
    const { count, total } = getTotals(cart);

    cartList.textContent = "";

    // Hide totals + action buttons (optional, but matches your expectation)
    if (cartTotalsSection) cartTotalsSection.style.display = "none";
    if (cartActionsSection) cartActionsSection.style.display = "none";

    cartCountEl.textContent = String(count);
    cartTotalEl.textContent = total.toFixed(2);

    const summaryRow = document.createElement("h2");
    summaryRow.className = "summary-row";
    summaryRow.textContent = "Summary of Items.";
    cartList.appendChild(summaryRow);

    const totalItems = document.createElement("div");
    totalItems.className = "total-items";
    totalItems.textContent = `Total no.of items - ${count}`;
    cartList.appendChild(totalItems);

    for (const item of cart) {
        //let totalProduct = 0;
        const totalProduct = (Number(item.qty) || 0) * (Number(item.price) || 0);
        
        const productName = document.createElement("div");
        productName.className = "product-name";
        productName.textContent = `${item.name} × ${item.qty} = $${totalProduct.toFixed(2)}`;
        cartList.appendChild(productName);
    }

    const totalAmount = document.createElement("div");
    totalAmount.className = "total-amount";
    totalAmount.textContent = `Total amount - $${total.toFixed(2)}`;
    cartList.appendChild(totalAmount);

    /*cartCountEl.textContent = "";
    cartTotalEl.textContent = "";

    document.getElementById("items").textContent = "";
    document.getElementById("total").textContent = "";
    */
}

if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);

if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
        const cart = readCart();
        if (cart.length === 0) {
            cartMsg.textContent = "Cart is empty. Add items before placing order.";
            return;
        }
        // Phase-1: simulate order placement
        displaySummary();
        localStorage.removeItem(CART_KEY);
        //renderCart();
        cartMsg.textContent = "Order placed successfully! (Simulation)";
    });
}

renderCart();