// This function handles the deletion of a post using the provided post_id
const deletePost = async (post_id) => {
  try {
    // Send a DELETE request to the server to delete the post with the specified post_id
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    // If the deletion is successful (status code 200-299)
    if (response.ok) {
      document.location.reload(); // Reload the page when successful to reflect the updated list of posts
    } else {
      throw new Error("Failed to delete the post."); // Throw an error for unsuccessful deletion
    }
  } catch (error) {
    console.error("Error during post deletion:", error);
    alert("An error occurred during post deletion. Please try again."); // Show an alert for any errors during deletion
  }
};

// This function is the event handler for clicks on elements with the class "delete-post"
const deletePostHandler = (event) => {
  // Check if the clicked element matches the selector ".delete-post"
  if (event.target.matches(".delete-post")) {
    // Extract the post_id from the element's "data-post-id" attribute
    const post_id = event.target.getAttribute("data-post-id");
    // Call the deletePost function with the extracted post_id to initiate the deletion process
    deletePost(post_id);
  }
};

// Set up an event listener to handle clicks on the document
// When a click event occurs, the deletePostHandler function will be called
document.addEventListener("click", deletePostHandler);

  