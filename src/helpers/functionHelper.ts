import { PRICE_DICTIONARY, TIME_DICTIONARY } from "@/constant/app";

export function toLowerCaseNonAccentVietnamese(str: string) {
  let res = str.toLowerCase();
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  res = res.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  res = res.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  res = res.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  res = res.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  res = res.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  res = res.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  res = res.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  res = res.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  res = res.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return res;
}

export function addMinutes(date: any, minutes: any) {
  return new Date(date.getTime() + minutes * 60000);
}

export const convertSecondToMMSS = (seconds: number) => {
  let residual = seconds % 60;
  let natural = Math.floor(seconds / 60);
  if (residual < 10) {
    return natural + ":0" + residual;
  }
  return natural + ":" + residual;
};

export const getDaysLeft = (expiredDate: any, days = "") => {
  if (expiredDate) {
    const getTimeExpired =
      new Date(expiredDate).getTime() - new Date().getTime();
    if (getTimeExpired > 0) {
      const dayLeft = getTimeExpired / (1000 * 3600 * 24);
      return Math.floor(dayLeft) + days;
    }
    return 0;
  } else {
    return 0;
  }
};

export const getDaysRange = ({
  startDate = "",
  expiredDate = "",
  days = "",
}: {
  startDate?: string;
  expiredDate?: string;
  days: string;
}) => {
  if (expiredDate && !isNaN(new Date(expiredDate).getTime())) {
    const getTimeStart = new Date(startDate).getTime();
    const getTimeExpired = new Date(expiredDate).getTime();
    const timeDiff = getTimeExpired - getTimeStart;

    if (timeDiff > 0) {
      const dayLeft = timeDiff / (1000 * 3600 * 24);
      return Math.floor(dayLeft) + " " + days;
    }
    return 0;
  } else {
    return 0;
  }
};

export const convertCurrency = (value: number, spacing = true) => {
  const maxval = 100000000;
  const million = 1000000;
  if (spacing) {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString() + "đ";
    }
    return value?.toLocaleString() + " đ";
  } else {
    if (value > maxval) {
      return Math.trunc(value / million)?.toLocaleString() + " đ";
    }
    return value?.toLocaleString() + "đ";
  }
};

export const hidePhoneNumber = (phone = "", start = 3, end = 7) => {
  const HIDDEN_TEXT = "*****";
  if (phone?.length >= 10) {
    return phone.substring(0, start) + HIDDEN_TEXT + phone.substring(end);
  }
  return phone;
};

export const convertKilogram = (value: number) => {
  return value?.toLocaleString();
};

interface ITimes {
  1: {
    start: string;
    end: string;
  };
  2: {
    start: string;
    end: string;
  };
  3: {
    start: string;
    end: string;
  };
  4: {
    start: string;
    end: string;
  };
}

export const getRangeTripTime = (times: number[]) => {
  if (times?.length === 0 || times?.length === 4) {
    return {
      startTime: null,
      endTime: null,
    };
  } else {
    const sortTimes = times?.sort();
    const minTime = TIME_DICTIONARY[sortTimes[0] as keyof ITimes]?.start;
    const maxTime =
      TIME_DICTIONARY[sortTimes[sortTimes?.length - 1] as keyof ITimes]?.end;
    return {
      startTime: minTime,
      endTime: maxTime,
    };
  }
};

interface IPrices {
  1: {
    priceRangeStart: null;
    priceRangeEnd: number;
  };
  2: {
    priceRangeStart: number;
    priceRangeEnd: number;
  };
  3: {
    priceRangeStart: number;
    priceRangeEnd: null;
  };
}

export const getRangeTripPrice = (prices: number[]) => {
  if (prices?.length === 0 || prices?.length === 3) {
    return {
      priceRangeStart: null,
      priceRangeEnd: null,
    };
  } else {
    const sortPrices = prices?.sort();
    const { priceRangeStart } =
      PRICE_DICTIONARY[sortPrices[0] as keyof IPrices];
    const { priceRangeEnd } =
      PRICE_DICTIONARY[sortPrices[sortPrices?.length - 1] as keyof IPrices];
    return {
      priceRangeStart: priceRangeStart,
      priceRangeEnd: priceRangeEnd,
    };
  }
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const getTimeCountDown = () => {
  let timeCd = document.getElementById("time-countdown");
  if (timeCd) {
    let val = parseInt(timeCd?.innerText);
    return val;
  }

  return 0;
};

export const formatNumber = (value: any) => {
  const roundedValue = Math.round(value * 1000) / 1000;
  return parseFloat(roundedValue.toString());
};

export const convertTimesToSeconds = (stringTimes: string) => {
  const times = stringTimes.split(":"); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  return +times[0] * 60 * 60 + +times[1] * 60 + +times[2];
};

export const getCurrentLocale = () => {
  const locale = localStorage.getItem("locale");
  if (locale === "en") {
    return "en";
  }
  return "vi";
};
