const report = require("multiple-cucumber-html-reporter");
const { Timer } = require("../utility/timer");

const startDate = Timer.getStartTime(); // ✅ read from file
const endDate = new Date();
const durationMs = endDate.getTime() - startDate.getTime();
const duration = `${Math.floor(durationMs / 1000)} seconds`;

console.log("📝 Generating HTML Report...");
console.log("📅 Start Time:", startDate.toLocaleString());
console.log("📅 End Time:", endDate.toLocaleString());
console.log("⏱ Total Duration:", duration);

report.generate({
  jsonDir: "test-results",
  reportPath: "./html-report",
  reportName: "Playwright BDD Report",
  pageTitle: "DemoWebShop BDD Test Report",
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "Yuvaraj's Machine",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
  customData: {
    title: "Test Info",
    data: [
      { label: "Project", value: "DemoWebShop Project" },
      { label: "Release", value: "1.0.0" },
      { label: "Cycle", value: "Smoke-1" },
      { label: "Execution Start Time", value: startDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) },
      { label: "Execution End Time", value: endDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) },
      { label: "Total Duration", value: duration },
    ],
  },
});

console.log("✅ HTML Report generated successfully at ./html-report/index.html");
