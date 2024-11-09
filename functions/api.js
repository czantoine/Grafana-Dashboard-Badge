const express = require('express');
const axios = require('axios');
const { makeBadge } = require('badge-maker');
const serverless = require('serverless-http');
const NodeCache = require('node-cache'); // Importing the caching module

const app = express();
const router = express.Router();
const cache = new NodeCache({ stdTTL: 900 }); // Cache for 15 minutes

// Middleware to add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Bad syntax endpoint to simulate incorrect requests
router.get('/bad-syntax', (req, res) => {
    res.status(400).json({
        error: 'Bad Syntax',
        message: 'The syntax of your request is incorrect. Please review your query parameters.'
    });
});

// Badge endpoint to generate SVG badge for downloads
router.get('/badge', async (req, res) => {
    const { id_dashboard, text, color } = req.query;

    if (!id_dashboard) {
        return res.status(400).json({
            error: 'Missing Parameters',
            message: 'The "id_dashboard" query parameter is required.'
        });
    }

    const cachedDownloads = cache.get(`downloads_${id_dashboard}`);
    if (cachedDownloads) {
        return generateBadgeResponse(res, cachedDownloads, 'Dashboard Downloads', text, color);
    }

    try {
        const response = await axios.get(`https://grafana.com/api/dashboards/${id_dashboard}`);
        const { downloads } = response.data;

        cache.set(`downloads_${id_dashboard}`, downloads);

        generateBadgeResponse(res, downloads, 'Dashboard Downloads', text, color);
    } catch (error) {
        res.status(500).json({
            error: 'Error retrieving data',
            message: error.message
        });
    }
});

// Revision badge endpoint to generate SVG badge for revision
router.get('/revision-badge', async (req, res) => {
    const { id_dashboard, text, color } = req.query;

    if (!id_dashboard) {
        return res.status(400).json({
            error: 'Missing Parameters',
            message: 'The "id_dashboard" query parameter is required.'
        });
    }

    const cachedRevision = cache.get(`revision_${id_dashboard}`);
    if (cachedRevision) {
        return generateBadgeResponse(res, cachedRevision, 'Revision', text, color);
    }

    try {
        const response = await axios.get(`https://grafana.com/api/dashboards/${id_dashboard}`);
        const { revision } = response.data;

        cache.set(`revision_${id_dashboard}`, revision);

        generateBadgeResponse(res, revision, 'Revision', text, color);
    } catch (error) {
        res.status(500).json({
            error: 'Error retrieving data',
            message: error.message
        });
    }
});

// Function to generate the badge response
function generateBadgeResponse(res, value, label, text, color) {
    // Use custom text and color if provided
    const badgeLabel = text || label;
    const badgeColor = color || determineColor(value, label);
    
    const format = {
        label: badgeLabel,
        message: value.toString(),
        color: badgeColor,
    };
    const svg = makeBadge(format);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
}

// Function to determine the color based on the value (downloads or revision)
function determineColor(value, label) {
    if (label === 'Dashboard Downloads') {
        if (value >= 200001) {
            return 'gold';
        } else if (value >= 150001) {
            return 'pink';
        } else if (value >= 100001) {
            return 'coral';
        } else if (value >= 70001) {
            return 'purple';
        } else if (value >= 50001) {
            return 'goldenrod';
        } else if (value >= 40001) {
            return 'cyan';
        } else if (value >= 30001) {
            return 'lightseagreen';
        } else if (value >= 20001) {
            return 'olive';
        } else if (value >= 15001) {
            return 'forestgreen';
        } else if (value >= 10001) {
            return 'mediumseagreen';
        } else if (value >= 9001) {
            return 'skyblue';
        } else if (value >= 8001) {
            return 'deepskyblue';
        } else if (value >= 7001) {
            return 'turquoise';
        } else if (value >= 6001) {
            return 'dodgerblue';
        } else if (value >= 5001) {
            return 'mediumblue';
        } else if (value >= 4001) {
            return 'darkblue';
        } else if (value >= 3001) {
            return 'midnightblue';
        } else if (value >= 2001) {
            return 'darkviolet';
        } else if (value >= 1501) {
            return 'royalblue';
        } else if (value >= 1001) {
            return 'blue';
        } else if (value >= 760) {
            return 'lightyellow';
        } else if (value >= 510) {
            return 'yellow';
        } else if (value >= 410) {
            return 'darkyellow';
        } else if (value >= 310) {
            return 'orange';
        } else if (value >= 210) {
            return 'darkorange';
        } else if (value >= 110) {
            return 'red';
        } else if (value >= 60) {
            return 'darkred';
        } else if (value >= 30) {
            return 'firebrick';
        } else {
            return 'brown';
        }
    } else if (label === 'Revision') {
        if (value >= 50) {
            return 'gold';
        } else if (value >= 40) {
            return 'pink';
        } else if (value >= 30) {
            return 'coral';
        } else if (value >= 20) {
            return 'purple';
        } else if (value >= 10) {
            return 'cyan';
        } else {
            return 'green';
        }
    }
    return 'blue';
}

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);