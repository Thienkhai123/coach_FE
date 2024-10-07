export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const ACCESS_TOKEN_VALUE =
  typeof window !== "undefined" && localStorage.getItem("ACCESS_TOKEN");
export const LG_SCREEN = 1024;
export const REGEX_PHONE = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
export const REGEX_CCCD = /^[0-9]{12}$/;
export const REGEX_PASSWORD = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/];
export const TIME_DICTIONARY = {
  1: {
    start: "00:00",
    end: "06:00",
  },
  2: {
    start: "06:00",
    end: "12:00",
  },
  3: {
    start: "12:00",
    end: "18:00",
  },
  4: {
    start: "18:00",
    end: "23:59",
  },
};
export const PRICE_DICTIONARY = {
  1: {
    priceRangeStart: null,
    priceRangeEnd: 300000,
  },
  2: {
    priceRangeStart: 300000,
    priceRangeEnd: 500000,
  },
  3: {
    priceRangeStart: 500000,
    priceRangeEnd: null,
  },
};
