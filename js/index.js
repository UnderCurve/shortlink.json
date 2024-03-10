import urls from '/json/urls.json' assert { type: 'json' };
import config from '/json/settings.json' assert { type: 'json' };

console.log(urls, config);

document.title = `${config.settings.ghname} shortlink.json`

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load settings JSON
        applySettings(config.settings);

        // Load URLs JSON
        renderUrls(urls);
        applyStyles(config.styles);
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

function applyStyles(styles) {
    for (const selector in styles) {
        const elements = document.querySelectorAll(selector);
        if (elements) {
            elements.forEach(element => {
                const properties = styles[selector];
                for (const property in properties) {
                    element.style[property] = properties[property];
                }
            });
        }
    }
}

function applySettings(settings) {
    // Apply settings to the DOM
    document.body.style.backgroundColor = settings.background;
    const pfp = document.getElementById('pfp');
    pfp.src = `https://avatars.githubusercontent.com/${settings.ghname}`;
}

function renderUrls(urls) {
    const linksContainer = document.getElementById('links-container');
    urls.forEach(record => {
        const link = document.createElement('a');
        link.className = 'button';
        link.href = `/${record.id}`;
        link.draggable = false;

        const icon = document.createElement('i');
        icon.className = record.icon;

        const name = document.createTextNode(` ${record.name}`);

        link.appendChild(icon);
        link.appendChild(name);

        const paragraph = document.createElement('p');
        paragraph.className = 'button-outer';

        paragraph.appendChild(link);

        linksContainer.appendChild(paragraph);
    });
}
