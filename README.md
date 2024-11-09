# Grafana Dashboard Badge

<p align="center">
	<a href="https://twitter.com/cz_antoine"><img alt="Twitter" src="https://img.shields.io/twitter/follow/cz_antoine?style=social"></a>
	<a href="https://www.linkedin.com/in/antoine-cichowicz-837575b1"><img alt="Linkedin" src="https://img.shields.io/badge/-Antoine-blue?style=flat-square&logo=Linkedin&logoColor=white"></a>
	<a href="https://github.com/czantoine/Grafana-Dashboard-Badge"><img alt="Stars" src="https://img.shields.io/github/stars/czantoine/Grafana-Dashboard-Badge"></a>
	<a href="https://github.com/czantoine/Grafana-Dashboard-Badge"><img alt="Issues" src="https://img.shields.io/github/issues/czantoine/Grafana-Dashboard-Badge"></a>
	<img alt="Last Commit" src="https://img.shields.io/github/last-commit/czantoine/Grafana-Dashboard-Badge">
</p>

This project retrieves the download count for a specific Grafana dashboard and generates a badge to display it. This badge provides an easy way to visualize the popularity of your Grafana dashboards.

Netlify deployment:

<p align="center">
  <a href="https://app.netlify.com/sites/grafana-dashboard-badge/deploys">
    <img src="https://api.netlify.com/api/v1/badges/fdafb19b-c8b7-4ce8-87ba-3502793c3d55/deploy-status" alt="Netlify Status">
  </a>
</p>

Download Dashboard Grafana: 

<img src="https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378" alt="Grafana Dashboard Badge">

## Table of Contents

1. [Project Overview](#project-overview)
2. [Badge](#Badge)
3. [API Documentation](#api-documentation)
   - [Health Check Endpoint](#health-check-endpoint)
   - [Badge Generation Endpoint](#badge-generation-endpoint)
   - [Simulated Error Endpoint](#simulated-error-endpoint)
4. [Badge Color Scheme](#badge-color-scheme)
5. [Netlify Deployment](#netlify-deployment)
6. [Debugging Netlify Functions Locally](#debugging-netlify-functions-locally)

## Project Overview

The `Grafana Dashboard Badge` application retrieves the download count for a Grafana dashboard by scraping data from Grafana’s site and generates an SVG badge that shows the count. The functions for deployment are in `functions/api.js` for Netlify.

## Badge

Example of code integration:

1. **Image Badge**

```html
<img src="https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378" alt="Grafana Dashboard Badge">
```

2. **Link with Badge**

```html
<a href="https://grafana.com/dashboards/21378">
    <img src="https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378" alt="Grafana Dashboard Badge">
</a>
```

## API Documentation

### Health Check Endpoint

- **Endpoint**: `/health`
- **Method**: `GET`
- **Description**: Returns a simple message to indicate the server is running.

**Example Request**:
```bash
curl https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/health
```

**Response**:
```
OK
```

### Badge Generation Endpoint

- **Endpoint**: `/badge`
- **Method**: `GET`
- **Description**: Generates a badge displaying the download count for a Grafana dashboard.

- **Query Parameters**:
  - `id_dashboard` (required): Grafana dashboard id

**Example Request**:
```bash
curl "https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378"
```

**Response**:
1. **Success**: Returns an SVG image of the badge with the download count.
2. **Error (Missing Parameters)**:
    ```json
    {
        "error": "Missing Parameters",
        "message": "Both 'user' and 'dashboard' query parameters are required."
    }
    ```
3. **Error (Invalid Parameters)**:
    ```json
    {
        "error": "Invalid Parameters",
        "message": "'user' and 'dashboard' parameters must be strings."
    }
    ```
4. **Error (Data Retrieval)**:
   ```
   Error retrieving data
   ```

### Simulated Error Endpoint

- **Endpoint**: `/bad-syntax`
- **Method**: `GET`
- **Description**: Simulates an incorrect request format for testing error handling.

**Example Request**:
```bash
curl https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/bad-syntax
```

**Response**:
```json
{
    "error": "Bad Syntax",
    "message": "The syntax of your request is incorrect. Please review your query parameters."
}
```

## Badge Color Scheme

The badge color changes dynamically based on the download count of the Grafana dashboard, providing a visual representation of its popularity. Here’s the breakdown:

- **0 - 100 downloads**: `brown` - Very Low
- **110 - 200 downloads**: `darkred` - Very Very Low
- **210 - 300 downloads**: `darkorange` - Low
- **310 - 400 downloads**: `orange` - Low Medium
- **410 - 500 downloads**: `darkyellow` - Medium
- **510 - 750 downloads**: `yellow` - Medium
- **760 - 1000 downloads**: `lightyellow` - Medium
- **1001 - 1500 downloads**: `blue` - Good
- **1510 - 2000 downloads**: `royalblue` - Very Good
- **2001 - 3000 downloads**: `darkviolet` - Exceptional
- **3001 - 4000 downloads**: `midnightblue` - Extraordinary
- **4001 - 5000 downloads**: `darkblue` - Exceptional
- **5001 - 6000 downloads**: `mediumblue` - Very Exceptional
- **6001 - 7000 downloads**: `dodgerblue` - Legendary
- **7001 - 8000 downloads**: `turquoise` - Very High Legendary
- **8001 - 9000 downloads**: `deepskyblue` - Epic
- **9001 - 10000 downloads**: `skyblue` - Mythic
- **10001 - 15000 downloads**: `mediumseagreen` - High Mythic
- **15001 - 20000 downloads**: `forestgreen` - Extreme Superb
- **20001 - 30000 downloads**: `olive` - Legendary Superb
- **30001 - 40000 downloads**: `lightseagreen` - Rare Epic
- **40001 - 50000 downloads**: `cyan` - Rare Legendary
- **50001 - 70000 downloads**: `goldenrod` - Ultra Epic
- **70001 - 100000 downloads**: `purple` - Mythic Legendary
- **10001 - 150000 downloads**: `coral` - Legendary Mythic
- **150001 - 200000 downloads**: `pink` - Titan
- **200001+ downloads**: `gold` - Divine

Each color indicates a range of downloads, from low to very high popularity, allowing users to quickly gauge the dashboard's status.

## Netlify Deployment

This project is deployed on Netlify. The badge [URL](https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378) is accessible via:

`https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378`

## Debugging Netlify Functions Locally

To debug Netlify functions:

1. **Install Netlify CLI**:
    ```bash
    npm install -g netlify-cli
    ```

2. **Run Netlify in Dev Mode**:
    ```bash
    netlify dev
    ```

This starts a local server that replicates the Netlify environment, allowing testing and debugging of function calls.

---

If you find this project useful, please give it a star ⭐️ ! Your support is greatly appreciated. Also, feel free to contribute to this project. All contributions, whether bug fixes, improvements, or new features, are welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for details.