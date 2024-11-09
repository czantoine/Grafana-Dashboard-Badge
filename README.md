# Grafana Dashboard Badge

<p align="center">
    <a href="https://twitter.com/cz_antoine"><img alt="Twitter" src="https://img.shields.io/twitter/follow/cz_antoine?style=social"></a>
    <a href="https://www.linkedin.com/in/antoine-cichowicz-837575b1"><img alt="Linkedin" src="https://img.shields.io/badge/-Antoine-blue?style=flat-square&logo=Linkedin&logoColor=white"></a>
    <a href="https://github.com/czantoine/Grafana-Dashboard-Badge"><img alt="Stars" src="https://img.shields.io/github/stars/czantoine/Grafana-Dashboard-Badge"></a>
    <a href="https://github.com/czantoine/Grafana-Dashboard-Badge"><img alt="Issues" src="https://img.shields.io/github/issues/czantoine/Grafana-Dashboard-Badge"></a>
    <img alt="Last Commit" src="https://img.shields.io/github/last-commit/czantoine/Grafana-Dashboard-Badge">
</p>

`Grafana Dashboard Badge` is a tool to retrieve download count metrics for a Grafana dashboard and generate badges displaying these metrics. These badges are an easy way to visualize and share the popularity of your dashboards.

**Live Example:**
- Download Count Badge: ![Download Badge](https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378)
- Revision Badge: ![Revision Badge](https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/revision-badge?id_dashboard=21378)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Usage Examples](#usage-examples)
3. [Customization](#customization)
4. [API Documentation](#api-documentation)
5. [Development with Netlify](#development-with-netlify)

## Project Overview

The `Grafana Dashboard Badge` application scrapes Grafana’s site for dashboard data, specifically download counts, and generates an SVG badge with this count. The deployment and API endpoints are managed via Netlify, making it accessible online.

## Usage Examples

Here’s how you can use the badges in your project or website:

1. **Image Badge**

    ```html
    <img src="https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378" alt="Grafana Dashboard Download Badge">
    ```

2. **Link with Badge**

    ```html
    <a href="https://grafana.com/dashboards/21378">
        <img src="https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378" alt="Grafana Dashboard Download Badge">
    </a>
    ```

3. **Markdown Integration**

    ```markdown
    ![Grafana Dashboard Download Badge](https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378)
    ```

## Customization

You can customize the badge with optional parameters for text and color to better fit your design.

![Custom Grafana Dashboard Badge](https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378&text=My%20Custom%20Badge&color=blue)

- **Parameters**:
    - `text` (default: "Dashboard Downloads"): Set custom text.
    - `color` (default: auto-generated based on download count): Define a specific color in hex or color name.

Example of the default auto-generated based on download count [here](ColorScheme.md).

**Example**:

```html
<img src="https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378&text=Popularity&color=blue" alt="Custom Grafana Badge">
```

## API Documentation

### Badge Generation Endpoint

- **Endpoint**: `/badge`
- **Method**: `GET`
- **Description**: Generates a badge with the Grafana dashboard download count.

**Query Parameters**:
- `id_dashboard` (required): The Grafana dashboard ID.
- `text` (optional): Custom label text.
- `color` (optional): Custom color for the badge.

**Example**:

```bash
curl "https://grafana-dashboard-badge.netlify.app/.netlify/functions/api/badge?id_dashboard=21378&text=Downloads&color=green"
```

## Development with Netlify

Netlify deployment:

<p align="center">
  <a href="https://app.netlify.com/sites/grafana-dashboard-badge/deploys">
    <img src="https://api.netlify.com/api/v1/badges/fdafb19b-c8b7-4ce8-87ba-3502793c3d55/deploy-status" alt="Netlify Status">
  </a>
</p>

1. **Install Netlify CLI**:
    ```bash
    npm install -g netlify-cli
    ```

2. **Run Locally**:
    ```bash
    netlify dev
    ```

This starts a local server simulating the Netlify environment for testing, dev and debugging.

---

If you find this project useful, please give it a star ⭐️ ! Your support is greatly appreciated. Also, feel free to contribute to this project. All contributions, whether bug fixes, improvements, or new features, are welcome!

## Special Thanks

A special thanks to **jangaraj** from the [Grafana Community](https://community.grafana.com/u/jangaraj/summary) for their invaluable guidance and support.

## License

This project is licensed under the MIT License. See the LICENSE file for details.