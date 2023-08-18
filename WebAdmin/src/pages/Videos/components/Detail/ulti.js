
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