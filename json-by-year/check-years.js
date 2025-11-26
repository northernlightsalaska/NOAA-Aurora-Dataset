#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const jsonByYearDir = __dirname;
const indexJsonPath = path.join(jsonByYearDir, 'index.json');

console.log('\n📊 Checking Available Kp Index JSON Files\n');
console.log('=' .repeat(60));

// Read all directories
const entries = fs.readdirSync(jsonByYearDir, { withFileTypes: true });
const yearDirs = entries
  .filter(entry => entry.isDirectory() && /^\d{4}$/.test(entry.name))
  .map(entry => parseInt(entry.name))
  .sort((a, b) => a - b);

console.log(`\n✅ Found ${yearDirs.length} year directories:\n`);

// Group by decade for display
const decades = {};
yearDirs.forEach(year => {
  const decade = Math.floor(year / 10) * 10;
  if (!decades[decade]) {
    decades[decade] = [];
  }
  decades[decade].push(year);
});

// Display by decade
Object.keys(decades).sort((a, b) => a - b).forEach(decade => {
  const years = decades[decade];
  const startYear = Math.min(...years);
  const endYear = Math.max(...years);
  const count = years.length;
  const expected = endYear - startYear + 1;
  const missing = expected - count;
  
  console.log(`📅 ${decade}s (${startYear}-${endYear}):`);
  console.log(`   ✅ ${count} years available`);
  if (missing > 0) {
    console.log(`   ⚠️  ${missing} years missing`);
    
    // Show which years are missing
    const missingYears = [];
    for (let y = startYear; y <= endYear; y++) {
      if (!years.includes(y)) {
        missingYears.push(y);
      }
    }
    if (missingYears.length > 0 && missingYears.length <= 10) {
      console.log(`   ❌ Missing: ${missingYears.join(', ')}`);
    } else if (missingYears.length > 10) {
      console.log(`   ❌ Missing: ${missingYears.slice(0, 5).join(', ')} ... and ${missingYears.length - 5} more`);
    }
  }
  console.log(`   📁 Years: ${years.join(', ')}`);
  console.log('');
});

// Check index.json
console.log('\n📋 Checking index.json...\n');
let indexData = null;
try {
  const indexContent = fs.readFileSync(indexJsonPath, 'utf8');
  indexData = JSON.parse(indexContent);
  console.log(`✅ index.json found`);
  console.log(`   Total years in index: ${indexData.years?.length || 0}`);
  console.log(`   Year range in index: ${indexData.metadata?.yearRange?.start || 'N/A'} - ${indexData.metadata?.yearRange?.end || 'N/A'}`);
  
  const indexYears = indexData.years?.map(y => y.year).sort((a, b) => a - b) || [];
  const missingInIndex = yearDirs.filter(y => !indexYears.includes(y));
  const extraInIndex = indexYears.filter(y => !yearDirs.includes(y));
  
  if (missingInIndex.length > 0) {
    console.log(`\n   ⚠️  ${missingInIndex.length} years in directories but NOT in index.json:`);
    console.log(`      ${missingInIndex.join(', ')}`);
  }
  
  if (extraInIndex.length > 0) {
    console.log(`\n   ⚠️  ${extraInIndex.length} years in index.json but NOT in directories:`);
    console.log(`      ${extraInIndex.join(', ')}`);
  }
  
  if (missingInIndex.length === 0 && extraInIndex.length === 0) {
    console.log(`\n   ✅ index.json is in sync with directories`);
  }
} catch (error) {
  console.log(`   ❌ Error reading index.json: ${error.message}`);
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📈 SUMMARY\n');
console.log(`   Total years available: ${yearDirs.length}`);
console.log(`   Year range: ${Math.min(...yearDirs)} - ${Math.max(...yearDirs)}`);
console.log(`   Complete decades: ${Object.keys(decades).length}`);

// Check for gaps
const allYears = [];
for (let y = Math.min(...yearDirs); y <= Math.max(...yearDirs); y++) {
  allYears.push(y);
}
const missingYears = allYears.filter(y => !yearDirs.includes(y));

if (missingYears.length > 0) {
  console.log(`\n   ⚠️  ${missingYears.length} years missing in range:`);
  if (missingYears.length <= 20) {
    console.log(`      ${missingYears.join(', ')}`);
  } else {
    console.log(`      ${missingYears.slice(0, 10).join(', ')} ... and ${missingYears.length - 10} more`);
  }
} else {
  console.log(`\n   ✅ No gaps in year range!`);
}

console.log('\n' + '='.repeat(60) + '\n');

