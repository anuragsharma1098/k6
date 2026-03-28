import http from "k6/http";

// export const options = {
//   stages: [
//     { duration: "30s", target: 10 },
//     { duration: "1m", target: 30 },
//     { duration: "30s", target: 0 },
//   ],
// };

export const options = {
  vus: 10,
  iterations: 30,
};

export default function () {
  http.get("https://test.k6.io");
}
