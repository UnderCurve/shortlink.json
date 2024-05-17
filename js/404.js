fetch('/json/urls.json')
    .then((response) => response.json())
    .then((json) => {
        // Get the path from the URL (excluding the initial '/')
        const path = window.location.pathname.substring(1); // Remove the initial '/'

        // Find the object with the id obtained from the path
        const targetObject = json.find(obj => obj.id === path);

        // If the object is found, retrieve its URL and redirect
        if (targetObject) {
            const url = targetObject.url;
            window.location.href = url; // Redirect to the found URL
        } else {
            window.location.href = "/"
        }
    })
    .catch((error) => {
        console.error('Error fetching or parsing data:', error);
    });
