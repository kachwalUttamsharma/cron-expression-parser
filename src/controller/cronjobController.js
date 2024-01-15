const { parseCronString } = require("../service/cronParser-service");

/**
 * Parses a cron string and returns the expanded fields as an HTML table.
 * @param {Object} req - request object.
 * @param {Object} res - response object.
 */
const cronJobParser = (req, res) => {
  const { cronString } = req.body;
  if (!cronString) {
    return res
      .status(400)
      .json({ error: "Please provide a cron string in the request body." });
  }
  try {
    const parsedCron = parseCronString(cronString);
    const output = formatOutput(parsedCron);
    res.send(output);
  } catch (error) {
    res
      .status(400)
      .json({ error: `Error parsing cron string: ${error.message}` });
  }
};

/**
 * Formats the parsed cron fields into an HTML table.
 * @param {ParsedCron} parsedCron - The parsed cron fields.
 * @returns {string} HTML table markup.
 */
function formatOutput(parsedCron) {
  let output = '<table border="1"><tr><th>Field</th><th>Values</th></tr>';
  for (const field in parsedCron) {
    const values = parsedCron[field];
    const valuesString = typeof values === "string" ? values : values.join(" ");
    output += `<tr><td>${field}</td><td>${valuesString}</td></tr>`;
  }
  output += "</table>";
  return output;
}

module.exports = {
  cronJobParser,
  formatOutput,
};
