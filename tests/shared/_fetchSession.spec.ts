import { _fetchSession } from "../../src/shared/_fetchSession";

const cookieJarMock = { getCookieStringSync: jest.fn(() => "pl_profile") };

jest.mock("fetch-cookie", () => jest.fn((f) => f));
jest.mock("tough-cookie", () => {
  return {
    CookieJar: jest.fn(() => cookieJarMock),
  };
});

beforeEach(() => {
  // @ts-ignore
  fetch.mockClear();
});

describe("fetchSession", () => {
  const fetchCookieMock = jest.fn((f) => f);
  const formDataMock = { append: jest.fn() };
  const FormDataMock = jest.fn(
    () => formDataMock
  ) as unknown as new () => FormData;

  it("applies cookie jar to fetch", async () => {
    const cookieJar = await _fetchSession(
      FormDataMock,
      fetchCookieMock,
      "email@example.com",
      "Matlock1"
    );

    expect(fetchCookieMock).toHaveBeenCalledWith(fetch, cookieJar);
  });

  it("creates form data", () => {
    _fetchSession(
      FormDataMock,
      fetchCookieMock,
      "email@example.com",
      "Matlock1"
    );

    expect(formDataMock.append).toHaveBeenCalledWith(
      "login",
      "email@example.com"
    );
    expect(formDataMock.append).toHaveBeenCalledWith("password", "Matlock1");
    expect(formDataMock.append).toHaveBeenCalledWith("app", "plfpl-web");
    expect(formDataMock.append).toHaveBeenCalledWith(
      "redirect_uri",
      "https://fantasy.premierleague.com/a/login"
    );
  });

  it("sends a POST request to the api with provided credentials", async () => {
    await _fetchSession(
      FormDataMock,
      fetchCookieMock,
      "email@example.com",
      "Matlock1"
    );

    expect(fetch).toHaveBeenCalledWith(
      "https://users.premierleague.com/accounts/login/",
      {
        method: "POST",
        body: formDataMock,
      }
    );
  });

  it("returns cookie jar", async () => {
    const result = await _fetchSession(
      FormDataMock,
      fetchCookieMock,
      "email@example.com",
      "Matlock1"
    );

    expect(result).toBe(cookieJarMock);
  });

  it("handles not ok response", async () => {
    // @ts-ignore
    fetch.mockRejectOnce(() => ({ ok: false, statusText: "Bad gateway" }));

    try {
      await _fetchSession(
        FormDataMock,
        fetchCookieMock,
        "email@example.com",
        "Matlock1"
      );
    } catch (error) {
      expect(error.message).toBe("Bad gateway");
    }
  });

  it("handles wrong credentials", async () => {
    cookieJarMock.getCookieStringSync.mockImplementationOnce(() => "");

    try {
      await _fetchSession(
        FormDataMock,
        fetchCookieMock,
        "email@example.com",
        "Matlock2"
      );
    } catch (error) {
      expect(error.message).toBe("Unauthorized");
    }
  });
});
