import fetchCookie from "fetch-cookie/node-fetch";
import FormData from "form-data";
import { CookieJar } from "tough-cookie";
import { _fetchSession } from "../shared/_fetchSession";

/**
 * Fetch a session to use with protected endpoints.
 * @param email
 * @param password
 */
export async function fetchSession(
  email: string,
  password: string
): Promise<CookieJar> {
  return await _fetchSession(FormData, fetchCookie, email, password);
}
