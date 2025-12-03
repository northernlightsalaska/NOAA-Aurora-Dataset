# NOAA Aurora Dataset

Comprehensive collection of NOAA Space Weather data including Kp Index, geomagnetic activity, solar events, and related datasets. This repository provides organized JSON data files for easy access and integration into aurora monitoring applications.

## 🌐 Our Websites

### [Alaska Aurora App](https://alaskaaurora.app/)
**Real-Time Aurora Activity & Forecast Monitor**

A comprehensive dashboard for tracking aurora activity in Alaska:
- **Real-time monitoring** of geomagnetic activity and solar wind conditions
- **30-minute aurora forecasts** updated every 30 minutes
- **3-day Kp forecast** with 3-hour interval predictions
- **Current space weather conditions** including measured vs forecasted Kp values
- **Historical data** with 180-day Kp index history
- **Aurora Power Index (HPI)** monitoring and charts
- **Interactive Alaska Aurora Viewing Map**
- **Top viewing locations** in Alaska with 5-day weather forecasts
- **Educational resources** on aurora colors, heights, and scientific information

The app provides both UTC time (24-hour format) and Alaska local time (12-hour format) to help viewers plan their aurora viewing activities. All NOAA forecast data is displayed in UTC, with automatic conversion to Alaska time zones.

### [Northern Lights Alaska](https://northernlightsak.com/)
**Main Website & Resources**

The primary website for Northern Lights Alaska (NLAK) featuring:
- **Main site** with comprehensive aurora information
- **Forecast app** at [forecast.northernlightsak.com](https://forecast.northernlightsak.com)
- **Aurora maps** and viewing guides
- **Data sources** and API documentation
- **Resources** including links to UAF Geophysical Institute and NOAA SWPC
- **Contact information** and community resources

Both websites are powered by data from this repository and NOAA's Space Weather Prediction Center.

## 📁 Repository Structure

This repository is organized by dataset type and year for easy navigation:

```
NOAA-Aurora-Dataset/
├── json-by-year/              # All JSON datasets organized by type
│   ├── kp-index/              # Kp Index data (1966-2025)
│   │   ├── 1966/
│   │   ├── 1967/
│   │   └── ...
│   ├── rsga/                  # Regionally Summarized Geomagnetic Activity (1966-2024)
│   ├── dgd/                   # Daily Geomagnetic Data (1996-2024)
│   ├── dpd/                   # Daily Proton Data (1996-2020)
│   ├── dsd/                   # Daily Solar Data (1996-2024)
│   ├── events/                # Solar/Aurora Events (1996-2024)
│   ├── geoa/                  # Geomagnetic Event Observation Archive (1996-2024)
│   ├── sgas/                  # Solar Geophysical Activity Summary (1996-2024)
│   └── srs/                   # Solar Region Summary (1996-2024)
├── pdfs/                      # Historical PDF archives
│   ├── RSGA/                  # RSGA PDFs organized by year (1966-1995)
│   └── WeeklyPDF/             # Weekly PDF reports (2025)
├── data/                      # Additional data files
└── index.json                 # Master index of all datasets
```

## 📊 Available Datasets

### Kp Index Data
- **Years**: 1966-2025 (60 years)
- **Total Files**: 60 JSON files
- **Structure**: `json-by-year/kp-index/{year}/kp-index-{year}.json`
- **Coverage**: Complete data from 1966 through 2025
  - Early years (1966-1995) may have partial coverage within the year
  - Years 2000-2025 have complete full-year coverage

### Other Dataset Types
- **RSGA** (Regionally Summarized Geomagnetic Activity): 1966-2024 (59 files)
- **DGD** (Daily Geomagnetic Data): 1996-2024 (29 files)
- **DPD** (Daily Proton Data): 1996-2020 (25 files)
- **DSD** (Daily Solar Data): 1996-2024 (29 files)
- **Events** (Solar/Aurora Events): 1996-2024 (29 files)
- **GEOA** (Geomagnetic Event Observation Archive): 1996-2024 (29 files)
- **SGAS** (Solar Geophysical Activity Summary): 1996-2024 (29 files)
- **SRS** (Solar Region Summary): 1996-2024 (29 files)

**Total**: 319 JSON data files organized by type and year

## 📄 Data Format

### Kp Index JSON Structure

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

### Field Descriptions

- `time_tag`: ISO 8601 timestamp in UTC
- `date`: Date in YYYY-MM-DD format
- `year`, `month`, `day`: Date components
- `dayOfYear`: Day of year (1-365/366)
- `k_indices`: Array of 8 K-index values for the day (3-hour intervals)
- `max_kp`: Maximum Kp value for the day
- `avg_kp`: Average Kp value for the day
- `kp_index`: Same as max_kp (for compatibility)
- `estimated_kp`: Same as avg_kp (for compatibility)

## 🚀 Usage Examples

### Load a Specific Year

```javascript
const year = 2020;
const data = await fetch(
  `https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/json-by-year/kp-index/${year}/kp-index-${year}.json`
).then(r => r.json());
```

### Load Multiple Years

```javascript
const years = [2020, 2021, 2022];
const allData = await Promise.all(
  years.map(year => 
    fetch(
      `https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/json-by-year/kp-index/${year}/kp-index-${year}.json`
    ).then(r => r.json())
  )
);
```

### Load Different Dataset Types

```javascript
// Load RSGA data for 2020
const rsga2020 = await fetch(
  `https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/json-by-year/rsga/2020/rsga-2020.json`
).then(r => r.json());

// Load Daily Geomagnetic Data for 2020
const dgd2020 = await fetch(
  `https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/json-by-year/dgd/2020/dgd-2020.json`
).then(r => r.json());
```

### Check Available Years

```javascript
const index = await fetch(
  'https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/json-by-year/index.json'
).then(r => r.json());
console.log(index.years.map(y => y.year));
```

## 📚 Index Files

### Main Index
- **Location**: `index.json` (root level)
- Contains metadata about all dataset types and available years

### Kp Index Index
- **Location**: `json-by-year/index.json`
- Contains detailed metadata about Kp index files including:
  - Total years available
  - Year range (start/end)
  - Record counts per year
  - Date ranges for each year

## 📦 PDF Archives

### RSGA PDFs
- **Location**: `pdfs/RSGA/{year}/`
- **Years**: 1966-1995 (30 years)
- **Total**: 7,588 PDF files
- Historical Regionally Summarized Geomagnetic Activity reports

### Weekly PDF Reports
- **Location**: `pdfs/WeeklyPDF/{year}/`
- **Current**: 2025 only (256 files)
- Weekly space weather summary reports

## 🔗 Data Hosting

This dataset is hosted on GitHub and accessible via raw file URLs:

- **Repository**: [https://github.com/northernlightsalaska/NOAA-Aurora-Dataset](https://github.com/northernlightsalaska/NOAA-Aurora-Dataset)
- **Raw JSON Base URL**: `https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/json-by-year/{type}/{year}/{file}.json`
- **Index File**: `https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/json-by-year/index.json`

### Example URLs

- Kp Index 2020: `https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/json-by-year/kp-index/2020/kp-index-2020.json`
- RSGA 2020: `https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/json-by-year/rsga/2020/rsga-2020.json`
- DGD 2020: `https://raw.githubusercontent.com/northernlightsalaska/NOAA-Aurora-Dataset/main/json-by-year/dgd/2020/dgd-2020.json`

## 📖 Source Data

All data is extracted from NOAA Space Weather Prediction Center:

- **Primary Source**: [NOAA SWPC](https://www.swpc.noaa.gov/)
- **Daily Geomagnetic Data**: `https://services.swpc.noaa.gov/text/daily-geomagnetic-indices.txt`
- **Data Format**: Original data in text format, converted to JSON for easy consumption
- **Update Frequency**: Data is updated as new information becomes available from NOAA

## 🛠️ Conversion Scripts

The repository includes scripts for data conversion and updates:

- `json-by-year/check-years.js`: Validates year files and checks for completeness
- `json-by-year/update-index.js`: Updates the index.json file with current metadata

## 📅 Last Updated

**2025-11-26** - Repository reorganized with new structure by dataset type and year

## 📝 License & Attribution

Data provided by NOAA Space Weather Prediction Center. This repository organizes and makes the data easily accessible in JSON format.

When using this data, please attribute:
- **Data Source**: NOAA Space Weather Prediction Center
- **Repository**: Northern Lights Alaska (NLAK)
- **Websites**: [alaskaaurora.app](https://alaskaaurora.app/) | [northernlightsak.com](https://northernlightsak.com/)

## 🤝 Contributing

This repository is maintained by Northern Lights Alaska. For questions or issues:
- **Email**: info@northernlightsak.com
- **Website**: [northernlightsak.com](https://northernlightsak.com/)

## 🔍 Related Resources

- [UAF Geophysical Institute](https://www.gi.alaska.edu/)
- [NOAA SWPC](https://www.swpc.noaa.gov/)
- [NOAA Data Access](https://www.swpc.noaa.gov/data)
- [NOAA Aurora Dashboard](https://www.swpc.noaa.gov/products/aurora-30-minute-forecast)

---

**Northern Lights Alaska (NLAK)** - Making NOAA space weather data accessible for aurora enthusiasts and researchers.

