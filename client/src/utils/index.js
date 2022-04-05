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
  const { pageSize = 6, page = 1 } = pagination;
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
