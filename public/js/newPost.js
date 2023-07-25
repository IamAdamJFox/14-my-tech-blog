// Function to handle the submission of a new post
const createNewPost = async (event) => {
    event.preventDefault();
  
    // Get the values of the title and content input fields
    const title = document.querySelector('#title-new-post').value.trim();
    const content = document.querySelector('#content-new-post').value.trim();
  
    // Check if both title and content fields have values
    if (title && content) {
      try {
        // Send a POST request to create the post
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        // Check if the post creation was successful
        if (response.ok) {
          // Redirect to the dashboard page after successful creation
          document.location.replace('/dashboard');
        } else {
          // Show an alert for unsuccessful post creation
          alert('Failed to create a new post.');
        }
      } catch (error) {
        // Handle any errors that occurred during post creation
        console.error('Error during post creation:', error);
        alert('An error occurred during post creation. Please try again.');
      }
    }
  };
  
  // Event listener for the new post form submission
  const newPostForm = document.querySelector('.new-post-form');
  if (newPostForm) {
    newPostForm.addEventListener('submit', createNewPost);
  }
  