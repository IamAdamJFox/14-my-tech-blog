// Function to handle the submission of a new comment
const createComment = async (event) => {
    event.preventDefault();
  
    // Extract the post ID from the current URL
    const post_id = parseInt(window.location.pathname.split('/').pop());
  
    // Get the value of the content input field
    const content = document.querySelector('#content-new-comment').value.trim();
  
    // Check if the content field has a value
    if (content) {
      try {
        // Send a POST request to create the comment
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({ comment_text: content, post_id }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        // Check if the comment creation was successful
        if (response.ok) {
          // Reload the current page to display the new comment
          document.location.reload();
        } else {
          // Log the response status and text for debugging purposes
          console.log('Response status:', response.status);
          console.log('Response text:', await response.text());
          // Show an alert for unsuccessful comment creation
          alert('Failed to create a comment.');
        }
      } catch (error) {
        // Handle any errors that occurred during comment creation
        console.error('Error during comment creation:', error);
        alert('An error occurred during comment creation. Please try again.');
      }
    }
  };
  
  // Event listener for the new comment form submission
  const newCommentForm = document.querySelector('.new-comment-form');
  if (newCommentForm) {
    newCommentForm.addEventListener('submit', createComment);
  }
  