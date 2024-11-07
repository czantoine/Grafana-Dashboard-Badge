const express = require('express');
const puppeteer = require('puppeteer');
const axios = require('axios'); 
const { makeBadge } = require('badge-maker');

const app = express();
const port = 3002;

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

checkGrafanaWebsite();

// Middleware to add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Bad syntax endpoint to simulate incorrect requests
app.get('/bad-syntax', (req, res) => {
    res.status(400).json({
        error: 'Bad Syntax',
        message: 'The syntax of your request is incorrect. Please review your query parameters.'
    });
});

app.get('/badge', async (req, res) => {
    const { user, dashboard } = req.query;

    // Check if both user and dashboard parameters are provided
    if (!user || !dashboard) {
        return res.status(400).json({
            error: 'Missing Parameters',
            message: 'Both "user" and "dashboard" query parameters are required.'
        });
    }

    // Additional validation for "user" and "dashboard" format (example)
    if (typeof user !== 'string' || typeof dashboard !== 'string') {
        return res.status(400).json({
            error: 'Invalid Parameters',
            message: '"user" and "dashboard" parameters must be strings.'
        });
    }

    try {
        const browser = await puppeteer.launch({
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
                "--disable-gpu",
                "--disable-dev-shm-usage"
            ]
        });
        const page = await browser.newPage();
        await page.goto(`https://grafana.com/orgs/${user}/dashboards`, {
            timeout: 120000
        });

        const downloads = await page.evaluate((dashboard) => {
            const dashboardElements = Array.from(document.querySelectorAll('div.cursor-reset'));
            const dashboardElement = dashboardElements.find(el => {
                const titleElement = el.querySelector('h2 div span.margin-right');
                return titleElement && titleElement.textContent.includes(dashboard);
            });

            if (dashboardElement) {
                const downloadsText = dashboardElement.querySelector('div.css-rcfal6').textContent;
                const match = downloadsText.match(/Downloads: (\d+)/);
                return match ? parseInt(match[1]) : 'Not Found';
            }
            return 'Not Found';
        }, dashboard);

        await browser.close();

        // Set badge color based on downloads with ultra-fine granularity
        let color = 'blue';
        if (downloads !== 'Not Found') {
            if (downloads >= 20001) {
                color = 'gold'; // Divine
            } else if (downloads >= 15001) {
                color = 'pink'; // Titan
            } else if (downloads >= 10001) {
                color = 'coral'; // Legendary Mythic
            } else if (downloads >= 7001) {
                color = 'purple'; // Mythic Legendary
            } else if (downloads >= 5001) {
                color = 'goldenrod'; // Ultra Epic
            } else if (downloads >= 4001) {
                color = 'cyan'; // Rare Legendary
            } else if (downloads >= 3001) {
                color = 'lightseagreen'; // Rare Epic
            } else if (downloads >= 2001) {
                color = 'olive'; // Legendary Superb
            } else if (downloads >= 1501) {
                color = 'forestgreen'; // Extreme Superb
            } else if (downloads >= 1001) {
                color = 'mediumseagreen'; // High Mythic
            } else if (downloads >= 901) {
                color = 'skyblue'; // Mythic
            } else if (downloads >= 801) {
                color = 'deepskyblue'; // Epic
            } else if (downloads >= 701) {
                color = 'turquoise'; // Very High Legendary
            } else if (downloads >= 601) {
                color = 'dodgerblue'; // Legendary
            } else if (downloads >= 501) {
                color = 'mediumblue'; // Very Exceptional
            } else if (downloads >= 401) {
                color = 'darkblue'; // Exceptional
            } else if (downloads >= 301) {
                color = 'midnightblue'; // Extraordinary
            } else if (downloads >= 201) {
                color = 'darkviolet'; // Exceptional
            } else if (downloads >= 151) {
                color = 'royalblue'; // Very Good
            } else if (downloads >= 101) {
                color = 'blue'; // Good
            } else if (downloads >= 76) {
                color = 'lightyellow'; // Medium
            } else if (downloads >= 51) {
                color = 'yellow'; // Medium
            } else if (downloads >= 41) {
                color = 'darkyellow'; // Medium
            } else if (downloads >= 31) {
                color = 'orange'; // Low Medium
            } else if (downloads >= 21) {
                color = 'darkorange'; // Low
            } else if (downloads >= 11) {
                color = 'red'; // Very Low
            } else if (downloads >= 6) {
                color = 'darkred'; // Very Very Low
            } else if (downloads >= 3) {
                color = 'firebrick'; // Very Very Low
            } else if (downloads >= 0) {
                color = 'brown'; // Very Very Low
            }
        }

        const format = {
            label: 'Downloads',
            message: downloads === 'Not Found' ? 'Not Found' : downloads.toString(),
            color: color,
        };

        const svg = makeBadge(format);

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});