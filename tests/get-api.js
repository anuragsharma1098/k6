import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,
  iterations: 30,
};

const endpoint = "https://gorest.co.in/public/v2";

const params = {
  headers: {
    Authorization: "Bearer 119b1c8e5a0f2c3e7b4d5a6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7",
  },
};

// let headers_api = {
//   Authorization:
//     "Bearer 119b1c8e5a0f2c3e7b4d5a6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7",
// };

// export default function () {
//   const res = http.get("https://gorest.co.in/public/v2/users/", {
//     headers: headers_api,
//   });
export default function () {
  const res = http.get(endpoint + "/users/", params);

  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}
