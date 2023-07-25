const deletePost = async (post_id) => {
    try {
      const response = await fetch(`/api/posts/${post_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.reload(); // Reload the page when successful
      } else {
        throw new Error("Failed to delete the post."); // Throw an error for unsuccessful deletion
      }
    } catch (error) {
      console.error("Error during post deletion:", error);
      alert("An error occurred during post deletion. Please try again."); // Show an alert for any errors
    }
  };
  
  const deletePostHandler = (event) => {
    if (event.target.matches(".delete-post")) {
      const post_id = event.target.getAttribute("data-post-id");
      deletePost(post_id);
    }
  };
  
  document.addEventListener("click", deletePostHandler);
  