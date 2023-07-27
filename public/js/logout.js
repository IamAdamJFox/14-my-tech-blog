// This function handles the user logout process
const Logout = async () => {
  try {
    // Send a POST request to the server to log the user out
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' }, // You might need to include this header based on your server's API
    });

    // Log the response (useful for debugging)
    console.log(response);

    // If the logout was successful (no errors), redirect the user to the homepage
    document.location.replace('/');

    // The following code is commented out, as it is not needed when the redirect is performed
    // If there are cases where you need to handle unsuccessful logout, you can uncomment and customize this part
    // } else {
    //   throw new Error('Failed to log out.'); // Throw an error for unsuccessful logout
    // }
  } catch (error) {
    // If any errors occur during the logout process, handle them here
    console.error('Error during logout:', error);
    alert('An error occurred during logout. Please try again.'); // Show an alert for any errors
  }
};

// Get the reference to the HTML element with the ID 'logout'
const LogoutButton = document.querySelector('#logout');

// If the LogoutButton element exists, add a click event listener to it
if (LogoutButton) {
  LogoutButton.addEventListener('click', Logout);
}



  