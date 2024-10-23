// import io from "socket.io-client";
// export const socket = io();
// const { io } = require("socket.io-client");

export const apiUrl = process.env.NODE_ENV === 'production' ? 'http://crm.pozycjonowaniestron.hekko24.pl/api/': 'http://localhost:5000/';
export const baseUrl = process.env.NODE_ENV === 'production' ? '' : '';

export const user_statuses = [
  {
    _id: 1,
    name: "Administrator",
  },
  {
    _id: 2,
    name: "Menedżer",
  },
  {
    _id: 3,
    name: "Pracownik",
  },
  {
    _id: 4,
    name: "Klient",
  },
];

export const catalog_statuses = [
  {
    _id: 1,
    name: "Atkywny",
  },
];

export const priorities = [
  {
    _id: 0,
    name: "Pali się",
    active: true,
  },
  {
    _id: 1,
    name: "Priorytetowo",
    active: true,
  },
  {
    _id: 2,
    name: "Normalny",
    active: true,
  },
  {
    _id: 3,
    name: "W wolnym czasie",
    active: true,
  },
  {
    _id: 4,
    name: "Można wykonać ale nie trzeba",
    active: true,
  },
];

export const statuses = [
  {
    _id: 0,
    name: "Do wykonania",
    active: true,
  },
  {
    _id: 1,
    name: "W trakcie",
    active: true,
  },
  {
    _id: 2,
    name: "Do akceptacji",
    active: true,
  },
  {
    _id: 3,
    name: "Wykonane",
    active: false,
  },
  {
    _id: 4,
    name: "Zawieszone",
    active: false,
  },
];

export const years = [
  {
    _id: 0,
    value: "2020",
    name: "2020",
  },
];
export const months = [
  {
    _id: 0,
    value: "01",
    name: "Styczeń",
  },
  {
    _id: 1,
    value: "02",
    name: "Luty",
  },
  {
    _id: 2,
    value: "03",
    name: "Marzec",
  },
  {
    _id: 3,
    value: "04",
    name: "Kwiecień",
  },
  {
    _id: 4,
    value: "05",
    name: "Maj",
  },
  {
    _id: 5,
    value: "06",
    name: "Czerwiec",
  },
  {
    _id: 6,
    value: "07",
    name: "Lipiec",
  },
  {
    _id: 7,
    value: "08",
    name: "Sierpień",
  },
  {
    _id: 8,
    value: "09",
    name: "Wrzesień",
  },
  {
    _id: 9,
    value: "10",
    name: "Październik",
  },
  {
    _id: 10,
    value: "11",
    name: "Listopad",
  },
  {
    _id: 11,
    value: "12",
    name: "Grudzień",
  },
];
export const payment_pattern_statuses = [
  {
    _id: 1,
    name: "Utworzony",
  },
  {
    _id: 2,
    name: "Anulowany",
  },
];
export const payment_invoice_statuses = [
  {
    _id: 1,
    name: "Utworzona",
  },
  {
    _id: 2,
    name: "Zapłacona",
  },
  {
    _id: 3,
    name: "Anulowana",
  },
];
export const payment_types = [
  {
    _id: 1,
    name: "Wzór",
  },
  {
    _id: 2,
    name: "Faktura",
  },
];
export const payment_cycles = [
  {
    _id: 1,
    name: "Miesięczny",
  },
  {
    _id: 2,
    name: "Kwartalny",
  },
  {
    _id: 3,
    name: "Roczny",
  },
];
export const payment_methods = [
  {
    _id: 1,
    name: "Przelew",
  },
  {
    _id: 2,
    name: "Gotówka",
  },
];
export const pattern_statuses = [
  {
    _id: 0,
    name: "Do wykonania",
  },
  {
    _id: 1,
    name: "W trakcie",
  },
  {
    _id: 2,
    name: "Do akceptacji",
  },
  {
    _id: 3,
    name: "Wykonane",
  },
  {
    _id: 4,
    name: "Zawieszone",
  },
];
export const calendarTypes = [
  {
    _id: 1,
    name: "Notatka",
  },
  {
    _id: 2,
    name: "Zadanie",
  },
];
