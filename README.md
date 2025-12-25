# Food Ordering App (Phase-1 – Simplilearn MERN Stack)

This is a **Phase-1 frontend project** built as part of the **Simplilearn MERN Stack program**.  
The application simulates a simple **food ordering flow** using **HTML, CSS, and JavaScript** with client-side state management.

The project demonstrates:
- DOM manipulation
- Event handling
- Browser storage (`localStorage`)
- Accessible UI (ARIA basics)
- Clean separation of concerns (HTML / CSS / JS)

---

## Features Implemented

### 1. Admin Login
- Login screen with email & password
- Client-side validation
- ARIA-compliant error messaging
- Successful login redirects to menu page

**Demo credentials**
Email: admin@food.com
Password: admin123

### 2. Menu Page
- Menu items loaded dynamically from `menu.json`
- Items rendered using JavaScript (`createElement`, `appendChild`)
- Each item displays:
  - Name
  - Description
  - Price
  - “Add to Cart” button
- Cart summary updates in real time

### 3. Cart Management
- Cart data stored in browser `localStorage`
- Supports:
  - Add item
  - Increase / decrease quantity
  - Remove item
  - Clear cart
- Cart persists across page navigation

---

### 4. Order Summary (Simulation)
- “Place Order” generates a final **order summary**
- Displays:
  - Total items
  - Line-wise item totals
  - Final amount
- Cart storage cleared after order placement
- UI switches to confirmation state (buttons hidden)

---

## Accessibility (ARIA)
- `role="alert"` and `aria-live` for error & status messages
- Proper labels for form inputs
- Keyboard-accessible buttons
- Screen-reader friendly status updates

---

## Technical Design Decisions

- **Vanilla JavaScript only** (no frameworks)
- DOM created dynamically using `document.createElement`
- Avoided `innerHTML` for dynamic data to prevent XSS
- Used `localStorage` as a shared state between pages
- Re-render strategy:  
  **single source of truth → read storage → render UI**

---

## 📂 Project Structure
```
      project-root/
      │
      ├── index.html # Login page
      ├── menu.html # Menu page
      ├── cart.html # Cart & order summary page
      │
      ├── css/
      │ └── style.css # Application styling
      │
      ├── js/
      │ ├── login.js # Login logic
      │ ├── menu.js # Menu rendering & cart add logic
      │ └── cart.js # Cart rendering & order summary
      │
      ├── data/
      │ └── menu.json # Menu data
      │
      └── README.md
```


## ▶️ How to Run the Project

### Recommended
Use **VS Code Live Server**:

1. Open project folder in VS Code
2. Right-click `index.html`
3. Select **“Open with Live Server”**

> `fetch()` requires a server context — opening files directly (`file://`) may not work.

---

## Tested Scenarios
- Login success & failure
- Add multiple items
- Quantity increase / decrease
- Cart persistence
- Clear cart
- Order summary rendering
- Browser refresh & navigation handling

---

## Future Enhancements (Phase-2 / MERN)
- Backend API (Node.js + Express)
- MongoDB persistence
- User-specific carts
- Authentication with JWT
- Checkout & payment simulation
- Convert to React SPA

---

## Notes
- This is a **simulation project** for learning purposes
- No real authentication or payment processing is implemented
- Focus is on frontend logic and clean code structure

---

## Author
**Ayan Gupta**  
Senior IT Architect | Payments & Blockchain  
Simplilearn MERN Stack Program
