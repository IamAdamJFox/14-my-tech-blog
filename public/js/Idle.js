// idleLogout.js
import logout from './logout.js'

let idleTimeout; // Variable to store the timeout reference


// Function to reset the idle timeout
function resetIdleTimeout() {
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(logout, 6000); // 600000ms (10 minutes) of inactivity until logout
}

// Add event listeners for user activity
function setupIdleLogout() {
  ['mousemove', 'keydown', 'click'].forEach(eventName => {
    document.addEventListener(eventName, resetIdleTimeout);
  });
}

// Start the idle timer when the page loads
window.onload = setupIdleLogout;