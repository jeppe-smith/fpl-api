import fetchCookie from "fetch-cookie";
import { CookieJar } from "tough-cookie";
import { _fetchPrivateEndpoint } from "../shared/_fetchPrivateEndpoint";

/**
 * Fetch a private endpoint.
 * @param session CookieJar with authorized pl_profile cookie.
 * @param endpoint The endpoint to fetch.
 * @param init Fetch options.
 * @see fetchSession
 */
export async function fetchPrivateEndpoint(
  session: CookieJar,
  endpoint: string,
  init?: RequestInit
): Promise<Response> {
  return await _fetchPrivateEndpoint(
    fetchCookie,
    session,
    endpoint,
    Object.assign(
      {
        headers: {
          "User-Agent": "fpl-api",
        },
      },
      init
    )
  );
}
