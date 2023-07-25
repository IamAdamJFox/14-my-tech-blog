// Get the post ID from the endpoint
const post_id = window.location.toString().split("/").pop();

// Function to update the post
const updatePostFormHandler = async (event) => {
  event.preventDefault();

  // Get the values of the title and content input fields
  const title = document.querySelector("#title-update-post").value.trim();
  const content = document.querySelector("#content-update-post").value.trim();

  // Check if both title and content fields have values
  if (title && content) {
    try {
      // Send a PUT request to update the post
      const response = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      // Check if the update was successful
      if (response.ok) {
        // Redirect to the dashboard page
        document.location.replace("/dashboard");
      } else {
        // Show an alert for unsuccessful update
        alert("Failed to update the post.");
      }
    } catch (error) {
      // Handle any errors that occurred during the update process
      console.error("Error during post update:", error);
      alert("An error occurred during post update. Please try again.");
    }
  }
};

// Function to delete the post
const deletePostFormHandler = async (event) => {
  event.preventDefault();

  try {
    // Send a DELETE request to delete the post
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
    });

    // Check if the deletion was successful
    if (response.ok) {
      // Redirect to the dashboard page
      document.location.replace("/dashboard");
    } else {
      // Show an alert for unsuccessful deletion
      alert("Failed to delete the post.");
    }
  } catch (error) {
    // Handle any errors that occurred during the deletion process
    console.error("Error during post deletion:", error);
    alert("An error occurred during post deletion. Please try again.");
  }
};

// Event listeners
const updatePostButton = document.querySelector("#update-post");

if (updatePostButton) {
  updatePostButton.addEventListener("click", updatePostFormHandler);
}

const deletePostButton = document.querySelector("#delete-post");

if (deletePostButton) {
  deletePostButton.addEventListener("click", deletePostFormHandler);
}
