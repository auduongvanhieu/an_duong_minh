export const secondsToTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);

  let str = "";
  if (h) str += h < 10 ? `0${h}:` : `${h}:`;
  str += m < 10 ? `0${m}:` : `${m}:`;
  str += s < 10 ? `0${s}` : `${s}`;

  return str;
};
export const timeToSecond = (str='0') => {
  console.log(str)
  let a = str.split(":"); // split it at the colons
  if (a.length === 1) {
    a.unshift("00");
    a.unshift("00");
  } else if (a.length === 2) {
    a.unshift("00");
  } else if (a.length === 3) {
  }
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

  console.log(seconds);
  return seconds;
};
