function createPage() {
    fetch('/json/urls.json')
        .then(response => response.json())
        .then(urls => {
            // Iterate through each URL object
            urls.forEach(url => {
                // Create elements for the link
                const link = document.createElement('a');
                link.className = 'button';
                link.href = url.url;

                const icon = document.createElement('i');
                icon.className = url.icon;

                const name = document.createTextNode(` ${url.name}`);

                // Append icon and name to link
                link.appendChild(icon);
                link.appendChild(name);

                // Create paragraph element for each link
                const paragraph = document.createElement('p');
                paragraph.className = 'button-outer';
                paragraph.appendChild(link);

                // Append paragraph to links container
                const linksContainer = document.getElementById('links-container');
                linksContainer.appendChild(paragraph);
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing URLs:', error);
        });
}
function applySettings() {
    // Fetch and apply settings
    fetch('/json/settings.json')
        .then(response => response.json())
        .then(data => {
            // Apply background color to body
            document.body.style.backgroundColor = data.settings.background;

            // Apply profile picture styles
            const pfp = document.getElementById('pfp');
            const pfpStyles = data.styles['#pfp'];
            for (const prop in pfpStyles) {
                pfp.style[prop] = pfpStyles[prop];
            }
            pfp.src = `https://avatars.githubusercontent.com/${data.settings.ghname}`;

            // Calculate font size based on screen width
            const screenWidth = window.innerWidth;
            let fontSize;
            if (screenWidth < 700) {
                // Set font size to 30px if screen width is less than 700px
                fontSize = 20;
            } else {
                // Set font size to 45px otherwise
                fontSize = 45;
            }

            // Apply button styles
            const buttons = document.getElementsByClassName('button');
            const buttonStyles = data.styles['.button'];
            Array.from(buttons).forEach(button => {
                for (const prop in buttonStyles) {
                    if (prop === 'font-size') {
                        // Set font size based on screen width
                        button.style[prop] = `${fontSize}px`;
                    } else {
                        button.style[prop] = buttonStyles[prop];
                    }
                }
            });

            // Apply button outer styles
            const outerButtons = document.getElementsByClassName('button-outer');
            const outerButtonStyles = data.styles['.button-outer'];
            Array.from(outerButtons).forEach(outerButton => {
                for (const prop in outerButtonStyles) {
                    outerButton.style[prop] = outerButtonStyles[prop];
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing settings:', error);
        });
}
