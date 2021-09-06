import { fetchPublicEndpoint } from "../../src/shared/fetchPublicEndpoint";
import {
  fetchBootstrap,
  fetchElementSummary,
  fetchEntry,
  fetchEntryEvent,
  fetchEntryHistory,
  fetchEventStatus,
  fetchFixtures,
  fetchLive,
} from "../../src/shared/publicEndpoints";

const mockJson = {};
const mockResponse = {
  status: 200,
  json: jest.fn().mockResolvedValue(mockJson),
};

jest.mock("../../src/shared/fetchPublicEndpoint", () => {
  return {
    fetchPublicEndpoint: jest.fn().mockImplementation(() => {
      return mockResponse;
    }),
  };
});

afterEach(() => {
  // @ts-ignore
  fetchPublicEndpoint.mockClear();
});

describe("fetchBootstrap", () => {
  it("calls api with fetchPublicEndpoint", () => {
    fetchBootstrap();

    expect(fetchPublicEndpoint).toHaveBeenCalledWith(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
  });

  it("returns json", async () => {
    const result = await fetchBootstrap();

    expect(result).toBe(mockJson);
  });
});

describe("fetchElementSummary", () => {
  it("calls api with fetchPublicEndpoint", () => {
    fetchElementSummary(12);

    expect(fetchPublicEndpoint).toHaveBeenCalledWith(
      "https://fantasy.premierleague.com/api/element-summary/12/"
    );
  });

  it("adds id to json", async () => {
    const result = await fetchElementSummary(12);

    expect(result.id).toBe(12);
  });

  it("returns json", async () => {
    const result = await fetchElementSummary(12);

    expect(result).toBe(mockJson);
  });
});

describe("fetchEntryEvent", () => {
  it("calls api with fetchPublicEndpoint", () => {
    fetchEntryEvent(12, 21);

    expect(fetchPublicEndpoint).toHaveBeenCalledWith(
      "https://fantasy.premierleague.com/api/entry/12/event/21/picks/"
    );
  });

  it("returns json", async () => {
    const result = await fetchEntryEvent(12, 21);

    expect(result).toBe(mockJson);
  });
});

describe("fetchEventStatus", () => {
  it("calls api with fetchPublicEndpoint", () => {
    fetchEventStatus();

    expect(fetchPublicEndpoint).toHaveBeenCalledWith(
      "https://fantasy.premierleague.com/api/event-status"
    );
  });

  it("returns json", async () => {
    const result = await fetchEventStatus();

    expect(result).toBe(mockJson);
  });
});

describe("fetchFixtures", () => {
  it("calls api with fetchPublicEndpoint", () => {
    fetchFixtures();

    expect(fetchPublicEndpoint).toHaveBeenCalledWith(
      "https://fantasy.premierleague.com/api/fixtures"
    );
  });

  it("ads query to request", () => {
    fetchFixtures(12);

    expect(fetchPublicEndpoint).toHaveBeenCalledWith(
      "https://fantasy.premierleague.com/api/fixtures?event=12"
    );
  });

  it("returns json", async () => {
    const result = await fetchFixtures();

    expect(result).toBe(mockJson);
  });
});

describe("fetchLive", () => {
  it("calls api with fetchPublicEndpoint", () => {
    fetchLive(12);

    expect(fetchPublicEndpoint).toHaveBeenCalledWith(
      "https://fantasy.premierleague.com/api/event/12/live/"
    );
  });

  it("returns json", async () => {
    const result = await fetchLive(12);

    expect(result).toBe(mockJson);
  });
});

describe("fetchEntryHistory", () => {
  it("calls api with fetchPublicEndpoint", () => {
    fetchEntryHistory(12);

    expect(fetchPublicEndpoint).toHaveBeenCalledWith(
      "https://fantasy.premierleague.com/api/entry/12/history/"
    );
  });

  it("returns json", async () => {
    const result = await fetchEntryHistory(12);

    expect(result).toBe(mockJson);
  });
});

describe("fetchEntry", () => {
  it("calls api with fetchPublicEndpoint", () => {
    fetchEntry(12);

    expect(fetchPublicEndpoint).toHaveBeenCalledWith(
      "https://fantasy.premierleague.com/api/entry/12/"
    );
  });

  it("returns json", async () => {
    const result = await fetchEntry(12);

    expect(result).toBe(mockJson);
  });
});
