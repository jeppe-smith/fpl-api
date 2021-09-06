import { CookieJar } from "tough-cookie";
import { _fetchPrivateEndpoint } from "../../src/shared/_fetchPrivateEndpoint";

beforeEach(() => {
  // @ts-ignore
  fetch.mockClear();
});

describe("_fetchPrivateEndpoint", () => {
  const fetchCookieMock = jest.fn((f) => f);

  it("applies cookie jar to fetch", async () => {
    const cookieJar = new CookieJar();

    _fetchPrivateEndpoint(
      fetchCookieMock,
      cookieJar,
      "https://fantasy.premierleague.com/api/me/"
    );

    expect(fetchCookieMock).toHaveBeenCalledWith(fetch, cookieJar);
  });

  it("calls the endpoint with init", () => {
    const cookieJar = new CookieJar();
    const init = {};

    _fetchPrivateEndpoint(
      fetchCookieMock,
      cookieJar,
      "https://fantasy.premierleague.com/api/me/",
      init
    );

    expect(fetch).toHaveBeenCalledWith(
      "https://fantasy.premierleague.com/api/me/",
      init
    );
  });

  it("returns response", async () => {
    // @ts-ignore
    fetch.mockResponseOnce(JSON.stringify({ email: "email@example.com" }));

    const cookieJar = new CookieJar();
    const result = await _fetchPrivateEndpoint(
      fetchCookieMock,
      cookieJar,
      "https://fantasy.premierleague.com/api/me/"
    );
    const json = await result.json();

    expect(json).toEqual({ email: "email@example.com" });
  });

  it("handles not ok response", async () => {
    // @ts-ignore
    fetch.mockRejectOnce(() => ({ ok: false, statusText: "Bad gateway" }));

    const cookieJar = new CookieJar();

    try {
      await _fetchPrivateEndpoint(
        fetchCookieMock,
        cookieJar,
        "https://fantasy.premierleague.com/api/me/"
      );
    } catch (error) {
      expect(error.message).toBe("Bad gateway");
    }
  });
});
