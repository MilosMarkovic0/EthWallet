// Function to fetch the user's profile picture
function fetchProfilePicture() {
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
  
      fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('User profile data:', data);
        const profilePictureUrl = data.picture;
        console.log('Profile picture URL:', profilePictureUrl);
        // Now you have the URL of the profile picture, you can display it or use it as needed.
        return profilePictureUrl;
      })
      .catch(error => {
        console.error('Error fetching profile picture:', error);
      });
    });
  }
  
  // Call the function to fetch the profile picture when needed
  //fetchProfilePicture();
  