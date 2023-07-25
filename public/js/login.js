// Handler function for login form submission
const LoginFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values of the username and password input fields
  const username = document.querySelector('#username--login').value.trim();
  const password = document.querySelector('#password--login').value.trim();

  // If the input fields have values
  if (username && password) {
    try {
      // Send a POST request to the login endpoint with the input values as JSON data
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the request was successful
      if (response.ok) {
        // Redirect to the homepage
        document.location.replace('/');
      } else {
        // Display an alert for login failure
        alert('Failed to log in.');
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  }
};

// Event listener for the login form
const LoginForm = document.querySelector('.login-form');
if (LoginForm) {
  LoginForm.addEventListener('submit', LoginFormHandler);
}
