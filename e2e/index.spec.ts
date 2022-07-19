import { resolve } from "path";
import { readFileSync } from "fs";
import { Validator } from "jsonschema";
import {
  fetchBootstrap,
  fetchElementSummary,
  fetchEntry,
  fetchEntryEvent,
  fetchEntryHistory,
  fetchEventStatus,
  fetchFixtures,
  fetchLive,
} from "../src";

const validator = new Validator();
const schema = JSON.parse(
  readFileSync(resolve(process.cwd(), "schema.json"), "utf-8")
);

validator.addSchema(schema);

describe("fetchBoootstrap", () => {
  it("fetches bootstrap data", async () => {
    const data = await fetchBootstrap();
    const result = validator.validate(data, schema.definitions.Bootstrap);

    expect(result.errors).toEqual([]);
  });
});

describe("fetchElementSummary", () => {
  it("fetches element summary data", async () => {
    const data = await fetchElementSummary(1);
    const result = validator.validate(data, schema.definitions.ElementSummary);

    expect(result.errors).toEqual([]);
  });
});

xdescribe("fetchEntryEvent", () => {
  it("fetches entry event data", async () => {
    const data = await fetchEntryEvent(1, 1);
    const result = validator.validate(data, schema.definitions.EntryEvent);

    expect(result.errors).toEqual([]);
  });
});

describe("fetchEventStatus", () => {
  it("fetches event status data", async () => {
    const data = await fetchEventStatus();
    const result = validator.validate(data, schema.definitions.EventStatus);

    expect(result.errors).toEqual([]);
  });
});

describe("fetchFixtures", () => {
  it("fetches fixtures data for event", async () => {
    const data = await fetchFixtures(1);

    for (const entry of data) {
      const result = validator.validate(entry, schema.definitions.Fixture);

      expect(result.errors).toEqual([]);
    }
  });
});

describe("fetchLive", () => {
  it("fetches event live data", async () => {
    const data = await fetchLive(1);
    const result = validator.validate(data, schema.definitions.Live);

    expect(result.errors).toEqual([]);
  });
});

describe("fetchEntryHistory", () => {
  it("fetches event live data", async () => {
    const data = await fetchEntryHistory(1);
    const result = validator.validate(data, schema.definitions.EntryHistory);

    expect(result.errors).toEqual([]);
  });
});

describe("fetchEntry", () => {
  it("fetches event live data", async () => {
    const data = await fetchEntry(1);
    const result = validator.validate(data, schema.definitions.Entry);

    expect(result.errors).toEqual([]);
  });
});
