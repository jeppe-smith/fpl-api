import * as web from "../../src/web";
import * as publicEndpoints from "../../src/shared/publicEndpoints";
import { fetchPublicEndpoint } from "../../src/shared/fetchPublicEndpoint";
import * as privateEndpoints from "../../src/web/privateEndpoints";
import { fetchPrivateEndpoint } from "../../src/web/fetchPrivateEndpoint";
import { fetchSession } from "../../src/web/fetchSession";

it("exports fetchPrivateEndPoint", () => {
  expect(web.fetchPrivateEndpoint).toBe(fetchPrivateEndpoint);
});

it("exports fetchPublicEndPoint", () => {
  expect(web.fetchPublicEndpoint).toBe(fetchPublicEndpoint);
});

it("exports fetchSession", () => {
  expect(web.fetchSession).toBe(fetchSession);
});

it("exports all public endpoints", () => {
  const keys = Object.keys(publicEndpoints);

  keys.forEach((key) => {
    // @ts-ignore
    expect(publicEndpoints[key]).toBe(web[key]);
  });
});

it("exports all private endpoints", () => {
  const keys = Object.keys(privateEndpoints);

  keys.forEach((key) => {
    // @ts-ignore
    expect(privateEndpoints[key]).toBe(web[key]);
  });
});
