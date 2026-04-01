import http from "k6/http";
import { check } from "k6";
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import faker from "https://cdn.skypack.dev/faker@5.5.3";

export const options = {
  vus: 1,
  duration: "2s",
};

const url = "https://reqres.in/api/users";
const payload = {
  name: faker.name.firstName() + faker.name.lastName(),
  // name: randomString(10),
  // name:'AB'+randomString(8),
  job: "SoftwareEngineer",
};

export default function () {
  const response = http.post(url, payload);
  console.log("Payload sent:", payload);
  console.log("Response body:", response.body);
  check(response, {
    "is status 201": (response) => response.status === 201,
    "response has id": (response) => response.body.includes("id"),
  });
}
