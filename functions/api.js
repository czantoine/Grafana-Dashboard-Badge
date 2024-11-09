const express = require('express');
const axios = require('axios');
const { makeBadge } = require('badge-maker');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

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
    const { id_dashboard } = req.query;

    // Check if id_dashboard parameter is provided
    if (!id_dashboard) {
        return res.status(400).json({
            error: 'Missing Parameters',
            message: 'The "id_dashboard" query parameter is required.'
        });
    }

    try {
        const response = await axios.get(`https://grafana.com/api/dashboards/${id_dashboard}`);
        const { downloads } = response.data;

        // Set badge color based on downloads with ultra-fine granularity
        let color = 'blue';
        if (downloads >= 200001) {
            color = 'gold'; // Divine
        } else if (downloads >= 150001) {
            color = 'pink'; // Titan
        } else if (downloads >= 100001) {
            color = 'coral'; // Legendary Mythic
        } else if (downloads >= 70001) {
            color = 'purple'; // Mythic Legendary
        } else if (downloads >= 50001) {
            color = 'goldenrod'; // Ultra Epic
        } else if (downloads >= 40001) {
            color = 'cyan'; // Rare Legendary
        } else if (downloads >= 30001) {
            color = 'lightseagreen'; // Rare Epic
        } else if (downloads >= 20001) {
            color = 'olive'; // Legendary Superb
        } else if (downloads >= 15001) {
            color = 'forestgreen'; // Extreme Superb
        } else if (downloads >= 10001) {
            color = 'mediumseagreen'; // High Mythic
        } else if (downloads >= 9001) {
            color = 'skyblue'; // Mythic
        } else if (downloads >= 8001) {
            color = 'deepskyblue'; // Epic
        } else if (downloads >= 7001) {
            color = 'turquoise'; // Very High Legendary
        } else if (downloads >= 6001) {
            color = 'dodgerblue'; // Legendary
        } else if (downloads >= 5001) {
            color = 'mediumblue'; // Very Exceptional
        } else if (downloads >= 4001) {
            color = 'darkblue'; // Exceptional
        } else if (downloads >= 3001) {
            color = 'midnightblue'; // Extraordinary
        } else if (downloads >= 2001) {
            color = 'darkviolet'; // Exceptional
        } else if (downloads >= 1501) {
            color = 'royalblue'; // Very Good
        } else if (downloads >= 1001) {
            color = 'blue'; // Good
        } else if (downloads >= 760) {
            color = 'lightyellow'; // Medium
        } else if (downloads >= 510) {
            color = 'yellow'; // Medium
        } else if (downloads >= 410) {
            color = 'darkyellow'; // Medium
        } else if (downloads >= 310) {
            color = 'orange'; // Low Medium
        } else if (downloads >= 210) {
            color = 'darkorange'; // Low
        } else if (downloads >= 110) {
            color = 'red'; // Very Low
        } else if (downloads >= 60) {
            color = 'darkred'; // Very Very Low
        } else if (downloads >= 30) {
            color = 'firebrick'; // Very Very Low
        } else if (downloads >= 0) {
            color = 'brown'; // Very Very Low
        }

        const format = {
            label: 'Dashboard Downloads',
            message: downloads.toString(),
            color: color,
        };

        const svg = makeBadge(format);

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg);
    } catch (error) {
        res.status(500).json({
            error: 'Error retrieving data',
            message: error.message
        });
    }
});

// Revision badge endpoint to generate SVG badge for revision
router.get('/revision-badge', async (req, res) => {
    const { id_dashboard } = req.query;

    // Check if id_dashboard parameter is provided
    if (!id_dashboard) {
        return res.status(400).json({
            error: 'Missing Parameters',
            message: 'The "id_dashboard" query parameter is required.'
        });
    }

    try {
        const response = await axios.get(`https://grafana.com/api/dashboards/${id_dashboard}`);
        const { revision } = response.data;

        // Set badge color based on revision
        let color = 'blue';
        if (revision >= 50) {
            color = 'gold'; // High Revision
        } else if (revision >= 40) {
            color = 'pink'; // Significant Revision
        } else if (revision >= 30) {
            color = 'coral'; // Major Revision
        } else if (revision >= 20) {
            color = 'purple'; // Moderate Revision
        } else if (revision >= 10) {
            color = 'cyan'; // Minor Revision
        } else {
            color = 'green'; // Low Revision
        }

        const format = {
            label: 'Revision',
            message: revision.toString(),
            color: color,
        };

        const svg = makeBadge(format);

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg);
    } catch (error) {
        res.status(500).json({
            error: 'Error retrieving data',
            message: error.message
        });
    }
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
