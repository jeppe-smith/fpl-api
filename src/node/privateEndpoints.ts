import { CookieJar } from "tough-cookie";
import { Me, MyTeam } from "../shared/types";
import { fetchPrivateEndpoint } from "./fetchPrivateEndpoint";

/**
 * Remove a player from the current users watchlist.
 * @see {@link fetchSession}
 * @param session
 * @param elementCode
 */
export async function removeFromWatchList(
  session: CookieJar,
  elementCode: number
): Promise<boolean> {
  const response = await fetchPrivateEndpoint(
    session,
    `https://fantasy.premierleague.com/api/watchlist/${elementCode}/`,
    {
      method: "DELETE",
    }
  );

  return response.status === 204;
}

/**
 * Add a player to current users watchlist.
 * @see {@link fetchSession}
 * @param session
 * @param elementCode
 */
export async function addToWatchList(
  session: CookieJar,
  elementCode: number
): Promise<boolean> {
  const response = await fetchPrivateEndpoint(
    session,
    `https://fantasy.premierleague.com/api/watchlist/${elementCode}/`,
    {
      method: "POST",
    }
  );

  return response.status === 201;
}

/**
 * Fetch the team of current user.
 * @see {@link fetchSession}
 * @param session
 * @param entryId
 */
export async function fetchMyTeam(
  session: CookieJar,
  entryId: number
): Promise<MyTeam> {
  const response = await fetchPrivateEndpoint(
    session,
    `https://fantasy.premierleague.com/api/my-team/${entryId}/`
  );

  return await response.json();
}

/**
 * Fetch current user.
 * @see {@link fetchSession}
 * @param session
 */
export async function fetchCurrentUser(session: CookieJar): Promise<Me> {
  const response = await fetchPrivateEndpoint(
    session,
    "https://fantasy.premierleague.com/api/me/"
  );

  return await response.json();
}
