// Quick test of CSV parsing
const testLine = 'Rome,41.9028,12.4964,1,Nov 19-22,Relais Fontana di Trevi,"Via del Lavatore 44, Rome, RM, 187 Italy",39 06 6797317,https://www.relaisfontanaditrevi.com/,72066654887946';

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

const parsed = parseCSVLine(testLine);
console.log('Parsed fields:', parsed.length);
parsed.forEach((field, i) => {
  console.log(`${i}: "${field}"`);
});

// Expected:
// 0: Rome
// 1: 41.9028
// 2: 12.4964
// 3: 1
// 4: Nov 19-22
// 5: Relais Fontana di Trevi
// 6: Via del Lavatore 44, Rome, RM, 187 Italy
// 7: 39 06 6797317
// 8: https://www.relaisfontanaditrevi.com/
// 9: 72066654887946
