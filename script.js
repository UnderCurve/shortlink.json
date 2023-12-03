fetch('/urls.json')
    .then((response) => response.json())
    .then((json) => {
        // Get the path from the URL (excluding the initial '/')
        const path = window.location.pathname.substring(1); // Remove the initial '/'

        // Find the object with the name obtained from the path
        const targetObject = json.find(obj => Object.keys(obj)[0] === path);

        // If the object is found, retrieve its value and redirect
        if (targetObject) {
            const value = targetObject[path];
            window.location.href = value; // Redirect to the found URL
        } else {
            console.log(`Name '${path}' not found.`);
            // Handle the 404 scenario (e.g., redirect to a default 404 page)
            window.location.href = '/';
        }
    })
    .catch((error) => {
        console.error('Error fetching or parsing data:', error);
    });
