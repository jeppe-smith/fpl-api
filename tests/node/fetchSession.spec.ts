import fetchCookie from "fetch-cookie/node-fetch";
import FormData from "form-data";
import { _fetchSession } from "../../src/shared/_fetchSession";
import { fetchSession } from "../../src/node/fetchSession";

jest.mock("../../src/shared/_fetchSession", () => {
  return {
    _fetchSession: jest.fn(() => "response"),
  };
});

describe("fetchSession", () => {
  const email = "email@example.com";
  const password = "Matlock1";

  it("calls _fetchSession", () => {
    fetchSession(email, password);

    expect(_fetchSession).toHaveBeenCalledWith(
      FormData,
      fetchCookie,
      email,
      password
    );
  });

  it("returns from _fetchSession", async () => {
    const result = await fetchSession(email, password);

    expect(result).toBe("response");
  });
});
