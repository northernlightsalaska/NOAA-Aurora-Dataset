#!/usr/bin/env node
/**
 * Update index.json to reflect all available years
 */
const fs = require('fs');
const path = require('path');

const BASE_DIR = __dirname;
const years = fs.readdirSync(BASE_DIR)
  .filter(f => {
    const fullPath = path.join(BASE_DIR, f);
    return fs.statSync(fullPath).isDirectory() && /^\d{4}$/.test(f);
  })
  .map(f => parseInt(f))
  .sort((a, b) => a - b);

const indexData = {
  metadata: {
    description: "NOAA Daily Geomagnetic Data (Kp Index) by Year",
    source: "NOAA Space Weather Prediction Center",
    format: "JSON",
    structure: "One file per year: YYYY/kp-index-YYYY.json",
    lastUpdated: new Date().toISOString(),
    totalYears: years.length,
    yearRange: {
      start: years[0],
      end: years[years.length - 1]
    }
  },
  years: years.map(year => {
    const filePath = path.join(BASE_DIR, year.toString(), `kp-index-${year}.json`);
    let recordCount = 0;
    let dateRange = { start: null, end: null };
    
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (Array.isArray(data) && data.length > 0) {
          recordCount = data.length;
          dateRange.start = data[0].date;
          dateRange.end = data[data.length - 1].date;
        }
      } catch (e) {
        console.warn(`Warning: Could not parse ${filePath}`);
      }
    }
    
    return {
      year,
      file: `${year}/kp-index-${year}.json`,
      recordCount,
      dateRange
    };
  })
};

fs.writeFileSync(
  path.join(BASE_DIR, 'index.json'),
  JSON.stringify(indexData, null, 2),
  'utf8'
);

console.log(`✅ Updated index.json with ${years.length} years (${years[0]}-${years[years.length - 1]})`);


