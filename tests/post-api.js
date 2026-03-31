import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,
  duration: "5s",
};

const url = "https://reqres.in/api/users";
const payload = {
  "name": "John Doe",
  "job": "Software Engineer",
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
