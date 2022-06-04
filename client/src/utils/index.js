export function splitArrayIntoChunksOfLen(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

export const getAreaBackground = (area) => {
  const files = [...area.archivos];
  const bgFileType = 24; // Background PNG
  const bgURI = files.find((x) => x.tipo_archivo?.id === bgFileType)?.path;

  if (!bgURI) return area.colorPrimario;

  return `url(${bgURI})`;
};

const longFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const shortFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const filterFormatOptions = {
  ...shortFormatOptions,
  hour: "numeric",
  minute: "numeric",
};

export const formatFilterDate = (date) =>
  new Date(date).toLocaleString("es-CL", filterFormatOptions);

export const formatDate = (date, long = true) =>
  new Date(date).toLocaleString(
    "es-CL",
    long ? longFormatOptions : shortFormatOptions
  );

export function getPaginationData(pagination) {
  const { pageSize = 12, page = 1 } = pagination;
  const _limit = pageSize;
  const _start = (page - 1) * pageSize;
  return { _limit, _start };
}

export function getQueryFilters(filters, schema) {
  console.log("filters", filters);
  const entries = Object.entries(filters);
  if (!entries.length) return null;
  return entries.reduce((acc, [key, value]) => {
    if (key === "pagination") {
      return { ...acc, ...getPaginationData(value) };
    }
    const columnSchema = (schema || []).find((x) => x.name === key);
    const isValidArray = Array.isArray(value) && value.length;
    if (isValidArray && !columnSchema?.type) {
      return { ...acc, [`${key}.id`]: value.join() };
    }
    if (isValidArray && columnSchema?.type) {
      return { ...acc, [key]: value.join() };
    }
    return { ...acc, [key]: value };
  }, {});
}

export const map2select = ([value, label]) => ({ label, value });

export function pluralize(word, count) {
  return `${word}${count === 1 ? "" : "s"}`;
}

export function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((x) => {
        return "%" + ("00" + x.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function nullifyObjectEmptyStrings(object) {
  return Object.entries(object).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: replaceEmptyStringWithNull(value),
    }),
    {}
  );
}

export function replaceEmptyStringWithNull(value) {
  if (!value) return null;
  return value;
}

export const getScoreColor = (score = 0) => {
  let colors = [
    "#616161",
    "#757575",
    "#e53935",
    "#e53935",
    "#f4511e",
    "#ffb300",
    "#d6b21e",
    "#d6b21e",
    "#79b700",
    "#79b700",
    "#1faa00",
  ];

  if (score < 10) {
    colors = [...new Set(colors)];
    score = score * 10;
  }

  score = parseInt(score / 10);

  return colors[score];
};

export const isDate = (item) =>
  isNaN(item) && new Date(item) !== "Invalid Date" && !isNaN(new Date(item));

export const isObject = (item) => !!item && typeof item === "object";

export const isBoolean = (item) => typeof item === "boolean";

export const isNullish = (item) => typeof item === "undefined" || item === null;
