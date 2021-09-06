import { fetchPublicEndpoint } from "../../src/shared/fetchPublicEndpoint";

beforeEach(() => {
  // @ts-ignore
  fetch.mockClear();
});

describe("fetchPublicEndpoint", () => {
  it("calls the endpoint with init", () => {
    const init = {};

    fetchPublicEndpoint(
      "https://fantasy.premierleague.com/api/bootstrap-static/",
      init
    );

    expect(fetch).toHaveBeenCalledWith(
      "https://fantasy.premierleague.com/api/bootstrap-static/",
      init
    );
  });

  it("returns response", async () => {
    // @ts-ignore
    fetch.mockResponseOnce(JSON.stringify({ elements: [] }));

    const result = await fetchPublicEndpoint(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    const json = await result.json();

    expect(json).toEqual({ elements: [] });
  });

  it("handles not ok response", async () => {
    // @ts-ignore
    fetch.mockRejectOnce(() => ({ ok: false, statusText: "Bad gateway" }));

    try {
      await fetchPublicEndpoint(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
    } catch (error) {
      expect(error.message).toBe("Bad gateway");
    }
  });
});
