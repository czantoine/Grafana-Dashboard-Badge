const express = require('express');
const puppeteer = require('puppeteer');
const axios = require('axios');  // Import axios
const { makeBadge } = require('badge-maker');

const app = express();
const port = 3002;

// Middleware pour ajouter les en-têtes CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Check if we can reach Grafana's website
const checkGrafanaWebsite = async () => {
    try {
        const response = await axios.get('https://grafana.com/');
        if (response.status === 200) {
            console.log('Successfully reached https://grafana.com/');
        } else {
            console.log('Failed to reach https://grafana.com/', response.status);
        }
    } catch (error) {
        console.log('Error while accessing https://grafana.com/', error.message);
    }
};

// Run the test on server startup
checkGrafanaWebsite();

app.get('/badge', async (req, res) => {
    const { user, dashboard } = req.query;

    if (!user || !dashboard) {
        return res.status(400).send('Missing user or dashboard parameter');
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://grafana.com/orgs/${user}/dashboards`);

        const downloads = await page.evaluate((dashboard) => {
            const dashboardElements = Array.from(document.querySelectorAll('div.cursor-reset'));
            const dashboardElement = dashboardElements.find(el => {
                const titleElement = el.querySelector('h2 div span.margin-right');
                return titleElement && titleElement.textContent.includes(dashboard);
            });

            if (dashboardElement) {
                const downloadsText = dashboardElement.querySelector('div.css-rcfal6').textContent;
                const match = downloadsText.match(/Downloads: (\d+)/);
                return match ? match[1] : 'Non trouvé';
            }
            return 'Non trouvé';
        }, dashboard);

        await browser.close();

        const format = {
            label: 'Downloads',
            message: downloads,
            color: 'blue',
        };
        const svg = makeBadge(format);

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
