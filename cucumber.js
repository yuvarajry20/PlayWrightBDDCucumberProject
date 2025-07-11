module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    dryRun: false,
    paths: ["src/test/features/**/*.feature"],
    require: [
      "src/test/steps/**/*.ts",
      "src/hooks/**/*.ts"
    ],
    format: [
      "progress-bar",
      "json:test-results/report.json",
      "html:test-results/report.html",
      "rerun:@rerun.txt"
    ],
    requireModule: ["ts-node/register"],
    parallel: 4
  },
  rerun: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    dryRun: false,
    paths: ["@rerun.txt"], // note: keep it like this
    require: [
      "src/test/steps/**/*.ts",
      "src/hooks/**/*.ts"
    ],
    format: [
      "progress-bar",
      "json:test-results/rerun-report.json"
    ],
    requireModule: ["ts-node/register"],
  }
}
