import { SharedArray } from "k6/data";

export function loadConfig() {
  return JSON.parse(open('./data/config.json'));
}

export function parseCsv(path) {
  const rows = open(path).split('\n').filter((line) => line.trim() !== '');
  const [header, ...data] = rows;
  const columns = header.split(',').map((c) => c.trim());

  return data.map((line) => {
    const values = line.split(',').map((v) => v.trim());
    const row = {};
    columns.forEach((column, index) => {
      row[column] = values[index] ?? '';
    });
    return row;
  });
}

export const users = new SharedArray('users', function () {
  return parseCsv('./data/users.csv');
});

export function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function buildHeaders(token = null) {
  const base = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    base['Authorization'] = `Bearer ${token}`;
  }

  return base;
}

export function buildUrl(base, path) {
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}
