function createPage() {
    fetch('/json/urls.json')
        .then(response => response.json())
        .then(urls => {
            // Iterate through each URL object
            urls.forEach(url => {
                // Create elements for the link
                const link = document.createElement('a');
                link.className = 'button';
                link.href = url.id;

                // Apply gradient if defined
                if (url.gradient && url.gradient.direction) {
                    console.log(link.style.backgroundImage = createGradient(url.gradient))
                    if (url.gradient.direction) {
                        link.style.transform = `rotate(${url.gradient.direction})`;
                    }
                } else if (url.btnbg) {
                    link.style.backgroundColor = url.btnbg;
                }
                if (url.btncolor) {
                    link.style.color = url.btncolor
                }

                // Create icon element
                const icon = document.createElement('i');
                icon.className = url.icon;

                // Create text node for button
                const name = document.createTextNode(` ${url.name}`);

                // Append icon and text to link
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

// Function to create gradient style
function createGradient(gradientData) {
    const { direction, start, end } = gradientData;
    return `linear-gradient(${direction}, ${start}, ${end})`;
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

            // Apply GitHub username
            pfp.src = `https://avatars.githubusercontent.com/${data.settings.ghname}`;
            document.title = `${data.settings.ghname} - shortlink.json`;

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

            // Get Github description and write it to gh-desc line
            fetch(`https://api.github.com/users/${data.settings.ghname}`)
                .then(response => response.json())
                .then(ghdata => {
                    const ghDesc = document.getElementById('gh-desc');
                    const DescStyles = data.styles['#gh-desc'];
                    for (const prop in DescStyles) {
                        ghDesc.style[prop] = DescStyles[prop];
                    }
                    if (ghdata.message == "Not Found") {
                        ghDesc.innerHTML = data.settings.descbackup
                    } else {
                        ghDesc.innerHTML = ghdata.bio;
                    }

                    console.log(ghdata, DescStyles, data.settings['#gh-desc'])
                })
                .catch(error => {
                    const ghDesc = document.getElementById('gh-desc');
                    ghDesc.innerHTML = data.settings.descbackup
                });

            // Apply button styles
            const buttons = document.getElementsByClassName('button');
            const buttonStyles = data.styles['.button'];
            Array.from(buttons).forEach(button => {
                for (const prop in buttonStyles) {
                    if (prop === "color" || prop === "background-color") {
                        if (button.style[prop] === "") { // Check if button style is empty
                            button.style[prop] = buttonStyles[prop]; // Apply color from settings.json
                        }
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
