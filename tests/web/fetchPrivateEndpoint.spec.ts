import fetchCookie from "fetch-cookie";
import { CookieJar } from "tough-cookie";
import { _fetchPrivateEndpoint } from "../../src/shared/_fetchPrivateEndpoint";
import { fetchPrivateEndpoint } from "../../src/web/fetchPrivateEndpoint";

jest.mock("../../src/shared/_fetchPrivateEndpoint", () => {
  return {
    _fetchPrivateEndpoint: jest.fn(() => "response"),
  };
});

describe("fetchPrivateEndpoint", () => {
  const session = new CookieJar();
  const endpoint = "/endpoint";
  const init = {};

  it("calls _fetchPrivateEndpoint", () => {
    fetchPrivateEndpoint(session, endpoint, init);

    expect(_fetchPrivateEndpoint).toHaveBeenCalledWith(
      fetchCookie,
      session,
      endpoint,
      init
    );
  });

  it("returns from _fetchPrivateEndpoint", async () => {
    const result = await fetchPrivateEndpoint(session, endpoint, init);

    expect(result).toBe("response");
  });
});
