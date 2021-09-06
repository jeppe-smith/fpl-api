import { CookieJar } from "tough-cookie";
import { fetchPrivateEndpoint } from "../../src/node/fetchPrivateEndpoint";
import {
  addToWatchList,
  fetchCurrentUser,
  fetchClassicLeague,
  fetchMyTeam,
  removeFromWatchList,
  fetchH2HLeagueStandings,
  fetchH2HMatches,
} from "../../src/node/privateEndpoints";

const mockJson = "{}";
const mockResponse = {
  status: 200,
  json: jest.fn().mockResolvedValue(mockJson),
};

jest.mock("../../src/node/fetchPrivateEndpoint", () => {
  return {
    fetchPrivateEndpoint: jest.fn().mockImplementation(() => {
      return mockResponse;
    }),
  };
});

describe("fetchH2HMatches", () => {
  it("calls api with fetchPrivateEndpoint", () => {
    const cookieJar = new CookieJar();

    fetchH2HMatches(cookieJar, 1, 2, 3);

    expect(fetchPrivateEndpoint).toHaveBeenCalledWith(
      cookieJar,
      "https://fantasy.premierleague.com/api/leagues-h2h-matches/league/1/?page=3&entry=2"
    );
  });

  it("returns json", async () => {
    const cookieJar = new CookieJar();

    const result = await fetchH2HMatches(cookieJar, 1, 2, 3);

    expect(result).toBe(mockJson);
  });
});

describe("fetchH2HLeagueStandings", () => {
  it("calls api with fetchPrivateEndpoint", () => {
    const cookieJar = new CookieJar();

    fetchH2HLeagueStandings(cookieJar, 12345, {
      pageStandings: 1,
      pageNewEntries: 2,
    });

    expect(fetchPrivateEndpoint).toHaveBeenCalledWith(
      cookieJar,
      "https://fantasy.premierleague.com/api/leagues-h2h/12345/standings/?page_new_entries=2&page_standings=1"
    );
  });

  it("returns json", async () => {
    const cookieJar = new CookieJar();

    const result = await fetchH2HLeagueStandings(cookieJar, 12345);

    expect(result).toBe(mockJson);
  });
});

describe("fetchClassicLeague", () => {
  it("calls api with fetchPrivateEndpoint", () => {
    const cookieJar = new CookieJar();

    fetchClassicLeague(cookieJar, 12345, {
      pageStandings: 1,
      pageNewEntries: 2,
      phase: 3,
    });

    expect(fetchPrivateEndpoint).toHaveBeenCalledWith(
      cookieJar,
      "https://fantasy.premierleague.com/api/leagues-classic/12345/standings/?page_new_entries=2&page_standings=1&phase=3"
    );
  });

  it("returns json", async () => {
    const cookieJar = new CookieJar();

    const result = await fetchClassicLeague(cookieJar, 12345);

    expect(result).toBe(mockJson);
  });
});

describe("removeFromWatchList", () => {
  beforeAll(() => {
    mockResponse.status = 204;
  });

  afterAll(() => {
    mockResponse.status = 200;
  });

  it("calls api with fetchPrivateEndpoint", () => {
    const cookieJar = new CookieJar();

    removeFromWatchList(cookieJar, 123);

    expect(fetchPrivateEndpoint).toHaveBeenCalledWith(
      cookieJar,
      "https://fantasy.premierleague.com/api/watchlist/123/",
      { method: "DELETE" }
    );
  });

  it("returns true", async () => {
    const cookieJar = new CookieJar();
    const result = await removeFromWatchList(cookieJar, 123);

    expect(result).toBe(true);
  });
});

describe("addToWatchList", () => {
  beforeAll(() => {
    mockResponse.status = 201;
  });

  afterAll(() => {
    mockResponse.status = 200;
  });

  it("calls api with fetchPrivateEndpoint", () => {
    const cookieJar = new CookieJar();

    addToWatchList(cookieJar, 123);

    expect(fetchPrivateEndpoint).toHaveBeenCalledWith(
      cookieJar,
      "https://fantasy.premierleague.com/api/watchlist/123/",
      { method: "POST" }
    );
  });

  it("returns true", async () => {
    const cookieJar = new CookieJar();
    const result = await addToWatchList(cookieJar, 123);

    expect(result).toBe(true);
  });
});

describe("fetchMyTeam", () => {
  it("calls api with fetchPrivateEndpoint", () => {
    const cookieJar = new CookieJar();

    fetchMyTeam(cookieJar, 12345);

    expect(fetchPrivateEndpoint).toHaveBeenCalledWith(
      cookieJar,
      "https://fantasy.premierleague.com/api/my-team/12345/"
    );
  });

  it("returns json", async () => {
    const cookieJar = new CookieJar();

    const result = await fetchMyTeam(cookieJar, 12345);

    expect(result).toBe(mockJson);
  });
});

describe("fetchCurrentUser", () => {
  it("calls api with fetchPrivateEndpoint", () => {
    const cookieJar = new CookieJar();

    fetchCurrentUser(cookieJar);

    expect(fetchPrivateEndpoint).toHaveBeenCalledWith(
      cookieJar,
      "https://fantasy.premierleague.com/api/me/"
    );
  });

  it("returns json", async () => {
    const cookieJar = new CookieJar();

    const result = await fetchCurrentUser(cookieJar);

    expect(result).toBe(mockJson);
  });
});
