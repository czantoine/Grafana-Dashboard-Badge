# Grafana Dashboard Badge

<p align="center">
	<a href="https://twitter.com/cz_antoine"><img alt="Twitter" src="https://img.shields.io/twitter/follow/cz_antoine?style=social"></a>
	<a href="https://www.linkedin.com/in/antoine-cichowicz-837575b1"><img alt="Linkedin" src="https://img.shields.io/badge/-Antoine-blue?style=flat-square&logo=Linkedin&logoColor=white"></a>
	<a href="https://github.com/czantoine/Grafana-Dashboard-Badge"><img alt="Stars" src="https://img.shields.io/github/stars/czantoine/Grafana-Dashboard-Badge"></a>
	<a href="https://github.com/czantoine/Grafana-Dashboard-Badge"><img alt="Issues" src="https://img.shields.io/github/issues/czantoine/Grafana-Dashboard-Badge"></a>
	<img alt="Last Commit" src="https://img.shields.io/github/last-commit/czantoine/Grafana-Dashboard-Badge">
</p>

This project retrieves the download count for a specific Grafana dashboard and generates a badge to display it. This badge provides an easy way to visualize the popularity of your Grafana dashboards.

![Grafana Badge Example](img/badge.png)

## Table of Contents

1. [Project Overview](#project-overview)
2. [API Documentation](#api-documentation)
   - [Health Check Endpoint](#health-check-endpoint)
   - [Badge Generation Endpoint](#badge-generation-endpoint)
   - [Simulated Error Endpoint](#simulated-error-endpoint)
3. [Badge Color Scheme](#badge-color-scheme)
4. [Local Deployment](#local-deployment)
5. [Testing with Ngrok](#testing-with-ngrok)
6. [Netlify Deployment](#netlify-deployment)
7. [Debugging Netlify Functions Locally](#debugging-netlify-functions-locally)
8. [Known Issues](#known-issues)

## Project Overview

The `Grafana Dashboard Badge` application retrieves the download count for a Grafana dashboard by scraping data from Grafana’s site and generates an SVG badge that shows the count. The main application logic is in `src/server.js`, while the functions for deployment are in `functions/api.js` for Netlify.

## API Documentation

### Health Check Endpoint

- **Endpoint**: `/health`
- **Method**: `GET`
- **Description**: Returns a simple message to indicate the server is running.

**Example Request**:
```bash
curl http://localhost:3002/health
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
  - `user` (required): Grafana user or organization name.
  - `dashboard` (required): Name of the dashboard.

**Example Request**:
```bash
curl "http://localhost:3002/badge?user=czantoine&dashboard=Microsoft%20SQL%20Server%20Dashboard"
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
curl http://localhost:3002/bad-syntax
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

- **0 - 10 downloads**: `brown` - Very Low
- **11 - 20 downloads**: `darkred` - Very Very Low
- **21 - 30 downloads**: `darkorange` - Low
- **31 - 40 downloads**: `orange` - Low Medium
- **41 - 50 downloads**: `darkyellow` - Medium
- **51 - 75 downloads**: `yellow` - Medium
- **76 - 100 downloads**: `lightyellow` - Medium
- **101 - 150 downloads**: `blue` - Good
- **151 - 200 downloads**: `royalblue` - Very Good
- **201 - 300 downloads**: `darkviolet` - Exceptional
- **301 - 400 downloads**: `midnightblue` - Extraordinary
- **401 - 500 downloads**: `darkblue` - Exceptional
- **501 - 600 downloads**: `mediumblue` - Very Exceptional
- **601 - 700 downloads**: `dodgerblue` - Legendary
- **701 - 800 downloads**: `turquoise` - Very High Legendary
- **801 - 900 downloads**: `deepskyblue` - Epic
- **901 - 1000 downloads**: `skyblue` - Mythic
- **1001 - 1500 downloads**: `mediumseagreen` - High Mythic
- **1501 - 2000 downloads**: `forestgreen` - Extreme Superb
- **2001 - 3000 downloads**: `olive` - Legendary Superb
- **3001 - 4000 downloads**: `lightseagreen` - Rare Epic
- **4001 - 5000 downloads**: `cyan` - Rare Legendary
- **5001 - 7000 downloads**: `goldenrod` - Ultra Epic
- **7001 - 10000 downloads**: `purple` - Mythic Legendary
- **10001 - 15000 downloads**: `coral` - Legendary Mythic
- **15001 - 20000 downloads**: `pink` - Titan
- **20001+ downloads**: `gold` - Divine

Each color indicates a range of downloads, from low to very high popularity, allowing users to quickly gauge the dashboard's status.

## Local Deployment

To test the application locally:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/czantoine/Grafana-Dashboard-Badge
    cd grafana-dashboard-badge
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the Server**:
    Use `src/server.js` as the main entry point:
    ```bash
    node src/server.js
    ```

4. **Testing Locally**:
   Access the endpoints in your browser or an API client to test badge generation.

## Testing with Ngrok

To test the application externally:

1. **Start the Local Server**: Ensure the server is running.
2. **Install and Set Up Ngrok**:
    ```bash
    ngrok http 3002
    ```
3. **Access the Public URL**: Ngrok will generate a public URL for external access.

## Netlify Deployment

<p align="center">
  <a href="https://app.netlify.com/sites/grafana-dashboard-badge/deploys">
    <img src="https://api.netlify.com/api/v1/badges/fdafb19b-c8b7-4ce8-87ba-3502793c3d55/deploy-status" alt="Netlify Status">
  </a>
</p>

This project is deployed on Netlify. The badge [URL](https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?user=czantoine&dashboard=Microsoft%20SQL%20Server%20Dashboard) is accessible via:

`https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?user=czantoine&dashboard=Microsoft%20SQL%20Server%20Dashboard`

Due to potential Grafana bot protection, API calls might result in errors, which are handled in `functions/api.js`.

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

## Known Issues

- **Error retrieving data**: When accessing the badge endpoint on the Netlify deployment, you might encounter an `Error retrieving data` message. This is likely due to Grafana’s bot protection, which can block automated requests.

---

If you find this project useful, please give it a star ⭐️ ! Your support is greatly appreciated. Also, feel free to contribute to this project. All contributions, whether bug fixes, improvements, or new features, are welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for details.