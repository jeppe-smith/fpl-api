import fetch from "cross-fetch";

import { CookieJar } from "tough-cookie";

/**
 * Fetch a private endpoint.
 * @param fetchCookie Instance of fetch-cookie to use.
 * @param session CookieJar with authorized pl_profile cookie.
 * @param endpoint The endpoint to fetch.
 * @param init Fetch options.
 * @see fetchSession
 * @private
 */
export async function _fetchPrivateEndpoint(
  fetchCookie: <T extends Function>(fetch: T, jar?: CookieJar) => T,
  session: CookieJar,
  endpoint: string,
  init?: RequestInit
): Promise<Response> {
  const fetchWithCookies = fetchCookie(fetch, session);
  const response = await fetchWithCookies(
    endpoint,
    Object.assign(
      {
        "User-Agent": "fpl-api",
      },
      init
    )
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}
