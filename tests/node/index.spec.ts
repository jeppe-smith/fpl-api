import * as node from "../../src/node";
import * as publicEndpoints from "../../src/shared/publicEndpoints";
import { fetchPublicEndpoint } from "../../src/shared/fetchPublicEndpoint";
import * as privateEndpoints from "../../src/node/privateEndpoints";
import { fetchPrivateEndpoint } from "../../src/node/fetchPrivateEndpoint";
import { fetchSession } from "../../src/node/fetchSession";

it("exports fetchPrivateEndPoint", () => {
  expect(node.fetchPrivateEndpoint).toBe(fetchPrivateEndpoint);
});

it("exports fetchPublicEndPoint", () => {
  expect(node.fetchPublicEndpoint).toBe(fetchPublicEndpoint);
});

it("exports fetchSession", () => {
  expect(node.fetchSession).toBe(fetchSession);
});

it("exports all public endpoints", () => {
  const keys = Object.keys(publicEndpoints);

  keys.forEach((key) => {
    // @ts-ignore
    expect(publicEndpoints[key]).toBe(node[key]);
  });
});

it("exports all private endpoints", () => {
  const keys = Object.keys(privateEndpoints);

  keys.forEach((key) => {
    // @ts-ignore
    expect(privateEndpoints[key]).toBe(node[key]);
  });
});
