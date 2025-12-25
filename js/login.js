/*
NOTE:
This script is currently loaded at the bottom of the HTML,
so DOM elements are already available.

If this script is moved to <head>, wrap all code inside:

document.addEventListener("DOMContentLoaded", function () {
  // existing code here
});

OR load the script with the 'defer' attribute in HTML:
<script src="js/login.js" defer></script>
*/


const form = document.getElementById("loginForm");
/** @type {HTMLInputElement} */
const emailInput = document.getElementById("email");
/** @type {HTMLInputElement} */
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

// Start typing any character->Error message disappears immediately
// ONLY clear the existing error text from browser screen
// Same for ARIA attributes as well
emailInput.addEventListener("input", () => {
    errorMsg.textContent = "";
    emailInput.removeAttribute("aria-invalid");
});

passwordInput.addEventListener("input", () => {
    errorMsg.textContent = "";
    passwordInput.removeAttribute("aria-invalid");
});

//Uses form submit, not onclick.
//e is the event object here passed by browser to JS to describe the event.
form.addEventListener("submit", function (e) {  
  e.preventDefault();

  /* In the above preventDefault() indicates browser won't perform
  any default action because here in this case submission is happening
  using JavaScript itself. So, page won't refresh. It behaves as if 
  its a SPA - single page application. 
  If the above line is removed / commented, the page immediately refrehes
  and the error message disappears and the form is reset. 
  */

  /* For a form with submit, default behaviour of browser is - 
  1. Submit the form ->
  2. Reload the page ->
  3. (Optionally) send data to server
  */

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (email === "admin@food.com" &&
      password === "admin123") {

    // tells the browser to navigate to another page.  
    /* window = browser window/tab(Top-level obj in client-side JS) 
    location = current URL e.g. https://example.com/index.html
    href = actual address (URL). 
    The flow / execution -->
    So, Current page stops->
    Browser loads menu.html->
    New DOM is created->
    New JS (if any) runs->
    Old page is gone.
    Summary - Same as clicking <a href="menu.html">
    */  
    localStorage.removeItem("cart_v1");
    window.location.href = "menu.html";
  } else {
    //Works with ARIA (role="alert").Screen readers will announce it
    emailInput.setAttribute("aria-invalid", "true");
    passwordInput.setAttribute("aria-invalid", "true");
    errorMsg.textContent = "Invalid email or password";
    // Moves the cursor back to email field. 
    emailInput.focus();
  }
});