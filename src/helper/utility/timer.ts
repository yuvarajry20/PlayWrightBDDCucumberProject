import * as fs from 'fs';
import * as path from 'path';

// Path to store the start time
const filePath = path.resolve(__dirname, 'start-time.txt');

export const Timer = {
  // Save the current time to the file when test execution starts
  setStartTime: () => {
    const now = new Date().toISOString();
    fs.writeFileSync(filePath, now, 'utf-8');
    console.log("⏱ Test Execution Started At:", new Date(now).toLocaleString());
  },

  // Read the time back later for report
  getStartTime: (): Date => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return new Date(content);
    } catch (err) {
      console.warn("⚠ Could not read start time. Defaulting to current time.");
      return new Date();
    }
  }
};
