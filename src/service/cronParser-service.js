/**
 * Parses the individual fields of a cron string.
 * @param {string} cronString - The cron string to parse.
 * @returns {ParsedCron} An object containing expanded cron fields.
 */
const parseCronString = (cronString) => {
  const fields = cronString.split(" ");
  const minute = expandField(fields[0], 0, 59);
  const hour = expandField(fields[1], 0, 23);
  const dayOfMonth = expandField(fields[2], 1, 31);
  const month = expandField(fields[3], 1, 12);
  const dayOfWeek = expandField(fields[4], 0, 6);
  const command = fields.slice(5).join(" ");
  return {
    minute,
    hour,
    "day of month": dayOfMonth,
    month,
    "day of week": dayOfWeek,
    command,
  };
};

/**
 * Expands a single field of a cron string.
 * @param {string} field - The field to expand.
 * @param {number} min - Minimum allowed value.
 * @param {number} max - Maximum allowed value.
 * @returns {number[]} An array of expanded values for the field.
 */
const expandField = (field, min, max) => {
  if (field === "*") {
    let values = [];
    for (let i = min; i <= max; i++) {
      values.push(i);
    }
    return values;
  }

  if (field.includes(",")) {
    return field.split(",").map((value) => parseInt(value));
  }

  if (field.includes("/")) {
    const [start, increment] = field.split("/");
    const values = [];
    for (let i = min; i <= max; i += parseInt(increment)) {
      values.push(i);
    }
    return values;
  }

  if (field.includes("-")) {
    const [start, end] = field.split("-").map((value) => parseInt(value));
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }

  return [parseInt(field)];
};

module.exports = {
  parseCronString,
};
