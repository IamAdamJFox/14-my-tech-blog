const Logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/'); // Redirect to the homepage when successful
    } else {
      throw new Error('Failed to log out.'); // Throw an error for unsuccessful logout
    }
  } catch (error) {
    console.error('Error during logout:', error);
    alert('An error occurred during logout. Please try again.'); // Show an alert for any errors
  }
};

const LogoutButton = document.querySelector('#logout');
if (LogoutButton) {
  LogoutButton.addEventListener('click', Logout);
}

module.export = logout

  