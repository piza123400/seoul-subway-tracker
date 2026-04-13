# Seoul Subway Tracker 🚇

A lightweight, client-side web application for browsing Seoul Metropolitan Subway lines and stations.

## Features

- **Line overview** – All 9 main Seoul subway lines displayed with their official colours.
- **Interactive map** – Click any station node on the map to see its details.
- **Station search** – Instant search with autocomplete across all stations.
- **Transfer indicators** – Transfer stations are highlighted with an orange ring.
- **Adjacent stations** – Each station card shows the neighbouring stops and lets you navigate between them.
- **Line filter** – Toggle individual lines on/off to declutter the view.

## Usage

Open `index.html` in any modern web browser – no build step or server required.

```
open index.html
```

## Project Structure

```
seoul-subway-tracker/
├── index.html   # Application shell
├── style.css    # Styles
├── app.js       # Station/line data and UI logic
└── README.md
```

## Data

Station lists are embedded directly in `app.js` and cover Lines 1–9 of the Seoul Metropolitan Subway.

