export const calculateFormatedDuration = (secs) => {
  const minutes = Math.floor(secs / 60);
  let seconds = Math.floor(secs - minutes * 60);
  if (seconds === 0) seconds = "00";
  else if (seconds < 10) seconds = `0${seconds}`;
  return `${minutes}:${seconds}`;
};
