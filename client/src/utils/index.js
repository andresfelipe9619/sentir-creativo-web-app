export function splitArrayIntoChunksOfLen (arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)))
  }
  return chunks
}


const longFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}
const shortFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}

export const formatDate = (date, long = true) =>
  new Date(date).toLocaleString(
    'es-CL',
    long ? longFormatOptions : shortFormatOptions
  )
