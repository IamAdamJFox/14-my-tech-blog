// Function to handle the submission of the signup form
const handleSignupForm = async (event) => {
    event.preventDefault();
  
    // Get the values of the username, email, and password input fields
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    // Check if all required fields have values
    if (username && email && password) {
      try {
        // Send a POST request to the server to create a new user account
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        // Check if the signup was successful
        if (response.ok) {
          // Redirect to the homepage after successful signup
          document.location.replace('/');
        } else {
          // Show an alert for unsuccessful signup
          alert('Failed to sign up. Please try again.');
        }
      } catch (error) {
        // Handle any errors that occurred during signup
        console.error('Error during signup:', error);
        alert('An error occurred during signup. Please try again.');
      }
    } else {
      // Show an alert if any required field is missing
      alert('Please fill out all required fields.');
    }
  };
  
  // Event listener for the signup form submission
  const signupForm = document.querySelector('#signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignupForm);
  }
  