import fetch from "cross-fetch";

/**
 * Fetch a public endpoint.
 * @param endpoint The endpoint to fetch.
 * @param init Fetch options
 * @private
 */
export async function fetchPublicEndpoint(
  endpoint: string,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(
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

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}
