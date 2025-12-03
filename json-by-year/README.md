# NOAA Kp Index Data - JSON by Year

This directory contains daily Kp index data organized by year, with one JSON file per year.

## Structure

```
json-by-year/
├── 2000/
│   └── kp-index-2000.json
├── 2001/
│   └── kp-index-2001.json
├── ...
├── 2024/
│   └── kp-index-2024.json
└── index.json
```

## Data Format

Each year file contains an array of daily Kp index records:

```json
[
  {
    "time_tag": "2000-01-01T09:00:00.000Z",
    "date": "2000-01-01",
    "year": 2000,
    "month": 1,
    "day": 1,
    "dayOfYear": 1,
    "k_indices": [4, 5, 4, 4, 5, 3, 3, 2],
    "max_kp": 5,
    "avg_kp": 3.75,
    "kp_index": 5,
    "estimated_kp": 3.75
  }
]
```

### Fields

- `time_tag`: ISO 8601 timestamp (UTC)
- `date`: Date in YYYY-MM-DD format
- `year`, `month`, `day`: Date components
- `dayOfYear`: Day of year (1-365/366)
- `k_indices`: Array of 8 K-index values for the day (3-hour intervals)
- `max_kp`: Maximum Kp value for the day
- `avg_kp`: Average Kp value for the day
- `kp_index`: Same as max_kp (for compatibility)
- `estimated_kp`: Same as avg_kp (for compatibility)

## Available Years

Currently available: **1966-2025** (60 years)

- ✅ **1966-2025**: Complete - All years from 1966 through 2025 are available
- Note: Some early years (1966-1995) may have partial data coverage within the year
- Years 2000-2025 have complete full-year coverage

## Usage

### Load a specific year:

```javascript
const year = 2020;
const data = await fetch(`/json-by-year/${year}/kp-index-${year}.json`)
  .then(r => r.json());
```

### Load multiple years:

```javascript
const years = [2020, 2021, 2022];
const allData = await Promise.all(
  years.map(year => 
    fetch(`/json-by-year/${year}/kp-index-${year}.json`)
      .then(r => r.json())
  )
);
```

### Check available years:

```javascript
const index = await fetch('/json-by-year/index.json')
  .then(r => r.json());
console.log(index.years.map(y => y.year));
```

## Index File

The `index.json` file contains metadata about all available years:

```json
{
  "metadata": {
    "description": "NOAA Daily Geomagnetic Data (Kp Index) by Year",
    "source": "NOAA Space Weather Prediction Center",
    "format": "JSON",
    "totalYears": 60,
    "yearRange": {
      "start": 1966,
      "end": 2025
    }
  },
  "years": [
    {
      "year": 2000,
      "file": "2000/kp-index-2000.json",
      "recordCount": 366,
      "dateRange": {
        "start": "2000-01-01",
        "end": "2000-12-31"
      }
    }
  ]
}
```

## Source

Data extracted from NOAA Space Weather Prediction Center:
- Daily Geomagnetic Data (DGD) text files
- Source: `https://services.swpc.noaa.gov/text/daily-geomagnetic-indices.txt`
- Local archive: `NOAA-FTP-Download-Aurora-Dataset/`

## Conversion Scripts

- `convert-dgd-to-json.js`: Converts DGD text files to JSON
- `fetch-historical-noaa.js`: Fetches and converts from NOAA online source

## Last Updated

2025-11-24

## Data Hosting

This dataset is now hosted on GitHub:
- Repository: https://github.com/northernlightsalaska/NOAA-Aurora-Dataset
- Raw JSON files: `https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/{year}/kp-index-{year}.json`
- Index file: `https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/index.json`

