export const formatDate = (datetime: Date) => {
  const year = datetime.getFullYear();
  const month = zeroPad(datetime.getMonth() + 1);
  const date = zeroPad(datetime.getDate());
  const hours = zeroPad(datetime.getHours());
  const minutes = zeroPad(datetime.getMinutes());
  const seconds = zeroPad(datetime.getSeconds());

  return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
};

const zeroPad = (num: number, pad = 2) => {
  return num.toString().padStart(pad, "0");
};
