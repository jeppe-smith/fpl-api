import superagent from "superagent";
import {
  Bootstrap,
  ClassicLeague,
  ElementSummary,
  Entry,
  EntryEvent,
  EntryHistory,
  EventStatus,
  Fixture,
  H2HLeague,
  H2HLeagueMatches,
  Live,
} from "./types";

/**
 * General data such as players, teams, gameweeks, etc.
 */
export async function fetchBootstrap(): Promise<Bootstrap> {
  const response = await superagent.get(
    "https://fantasy.premierleague.com/api/bootstrap-static/"
  );

  return response.body;
}

/**
 * Fetch data for a player.
 * @param elementId player id.
 */
export async function fetchElementSummary(
  elementId: number
): Promise<ElementSummary> {
  const response = await superagent.get(
    `https://fantasy.premierleague.com/api/element-summary/${elementId}/`
  );
  const data = response.body;

  data.id = elementId;

  return data;
}

/**
 * Fetch entry event data (picks, transfers, etc.).
 * @param entryId ID of an entry team.
 * @param eventId ID of a gameweek.
 */
export async function fetchEntryEvent(
  entryId: number,
  eventId: number
): Promise<EntryEvent> {
  const response = await superagent.get(
    `https://fantasy.premierleague.com/api/entry/${entryId}/event/${eventId}/picks/`
  );

  return response.body;
}

/**
 * Fetch current event status.
 */
export async function fetchEventStatus(): Promise<EventStatus> {
  const response = await superagent.get(
    "https://fantasy.premierleague.com/api/event-status/"
  );

  return response.body;
}

/**
 * Fetch all fixtures or for a specific event.
 * @param eventId ID of a gameweek.
 */
export async function fetchFixtures(eventId?: number): Promise<Fixture[]> {
  const query = eventId !== undefined ? "?event=" + eventId : "";

  const response = await superagent.get(
    `https://fantasy.premierleague.com/api/fixtures/${query}`
  );

  return response.body;
}

/**
 * Fetch live data for a gameweek.
 * @param eventId ID of a gameweek.
 */
export async function fetchLive(eventId: number): Promise<Live> {
  const response = await superagent.get(
    `https://fantasy.premierleague.com/api/event/${eventId}/live/`
  );

  return response.body;
}

/**
 * Fetch an entrys history.
 * @param entryId ID of an entry team.
 */
export async function fetchEntryHistory(
  entryId: number
): Promise<EntryHistory> {
  const response = await superagent.get(
    `https://fantasy.premierleague.com/api/entry/${entryId}/history/`
  );

  return response.body;
}

/**
 * Fetch an entry.
 * @param entryId ID of an entry team.
 */
export async function fetchEntry(entryId: number): Promise<Entry> {
  const response = await superagent.get(
    `https://fantasy.premierleague.com/api/entry/${entryId}/`
  );

  return response.body;
}

/**
 * Fetch an entrys matches from a H2H league.
 * @param leagueId ID of the H2H league.
 * @param entryId ID of the entry whos matches should be fetched.
 * @param page Page number to fetch.
 */
export async function fetchH2HMatches(
  leagueId: number,
  entryId: number,
  page: number = 1
): Promise<H2HLeagueMatches> {
  const response = await superagent.get(
    `https://fantasy.premierleague.com/api/leagues-h2h-matches/league/${leagueId}/?page=${page}&entry=${entryId}`
  );

  return response.body;
}

/**
 * Fetch H2H league standings page.
 * @param leagueId ID of a H2H league.
 * @param options Page options.
 * @param options.pageStandings Page number of standings.
 * @param options.pageNewEntries Page number of new entries.
 */
export async function fetchH2HLeagueStandings(
  leagueId: number,
  { pageStandings, pageNewEntries } = {
    pageStandings: 1,
    pageNewEntries: 1,
  }
): Promise<H2HLeague> {
  const response = await superagent.get(
    `https://fantasy.premierleague.com/api/leagues-h2h/${leagueId}/standings/?page_new_entries=${pageNewEntries}&page_standings=${pageStandings}`
  );

  return response.body;
}

/**
 * Fetch classic league standings page.
 * @param leagueId ID of a classic league.
 * @param options Page options.
 * @param options.pageStandings Page number of standings.
 * @param options.pageNewEntries Page number of new entries.
 * @param options.phase Phase ID.
 */
export async function fetchClassicLeague(
  leagueId: number,
  { pageStandings, pageNewEntries, phase } = {
    pageStandings: 1,
    pageNewEntries: 1,
    phase: 1,
  }
): Promise<ClassicLeague> {
  const response = await superagent.get(
    `https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/?page_new_entries=${pageNewEntries}&page_standings=${pageStandings}&phase=${phase}`
  );

  return response.body;
}
