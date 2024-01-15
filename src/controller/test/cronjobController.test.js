const { cronJobParser, formatOutput } = require("../cronjobController");

describe("cronJobParser", () => {
  test("should return 400 if no cron string provided", () => {
    const req = { body: {} };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    cronJobParser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Please provide a cron string in the request body.",
    });
  });

  test("should return 400 with error message if cron parsing fails", () => {
    const req = { body: { cronString: "invalid-cron" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    cronJobParser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Error parsing cron string"),
    });
  });

  test("should return formatted output if cron parsing succeeds", () => {
    const req = { body: { cronString: "*/5 * * * *" } };
    const res = {
      send: jest.fn(),
    };
    const mockParsedCron = {
      minute: "*/5",
      hour: "*",
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: "*",
    };
    jest.mock("../../service/cronParser-service", () => ({
      parseCronString: jest.fn(() => mockParsedCron),
    }));
    cronJobParser(req, res);
    expect(res.send).toHaveBeenCalledWith(expect.stringContaining("<table"));
    expect(res.send).toHaveBeenCalledWith(
      expect.stringContaining("<tr><th>Field</th><th>Values</th></tr>")
    );
  });
});

describe("formatOutput", () => {
  test("should format parsed cron fields into HTML table", () => {
    const parsedCron = {
      minute: "*/5",
      hour: "*",
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: "*",
    };

    const result = formatOutput(parsedCron);

    expect(result).toContain("<table");
    expect(result).toContain("<tr><th>Field</th><th>Values</th></tr>");
    expect(result).toContain("<tr><td>minute</td><td>*/5</td></tr>");
    expect(result).toContain("<tr><td>hour</td><td>*</td></tr>");
    expect(result).toContain("<tr><td>dayOfMonth</td><td>*</td></tr>");
    expect(result).toContain("<tr><td>month</td><td>*</td></tr>");
    expect(result).toContain("<tr><td>dayOfWeek</td><td>*</td></tr>");
  });
});
