import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

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

  if (!bgURI) {
    return area.colorPrimario;
  }

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

export const formatDate = (date, long = true) =>
  new Date(date).toLocaleString(
    "es-CL",
    long ? longFormatOptions : shortFormatOptions
  );

export function getPaginationData(pagination) {
  console.log("pagination", pagination);
  const { pageSize = 12, page = 1 } = pagination;
  const _limit = pageSize;
  const _start = (page - 1) * pageSize;
  return { _limit, _start };
}

export function getQueryFilters(filters) {
  const entries = Object.entries(filters);
  console.log("entries", entries);
  if (!entries.length) return null;
  return entries.reduce((acc, [key, value]) => {
    if (key === "pagination") {
      return { ...acc, ...getPaginationData(value) };
    }
    if (Array.isArray(value) && value.length) {
      return { ...acc, [`${key}.id`]: value.join() };
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
  if (score === 7) {
    return green['A700']
  }

  if (score >= 4) {
    return orange[800]
  }

  if (score >= 1) {
    return red[700]
  }

  return grey[700]
};
