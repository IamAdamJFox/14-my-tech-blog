// idleLogout.js

let idleTimeout; // Variable to store the timeout reference


// Function to reset the idle timeout
function resetIdleTimeout() {
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(Logout, 300000); // 300000ms (5 minutes) of inactivity until logout
}

// Add event listeners for user activity
function setupIdleLogout() {
  ['mousemove', 'keydown', 'click'].forEach(eventName => {
    document.addEventListener(eventName, resetIdleTimeout);
  });
}

// Start the idle timer when the page loads
window.onload = setupIdleLogout;