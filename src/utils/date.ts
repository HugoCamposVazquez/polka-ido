export const convertDateToUnixtime = (date: Date): number => Math.floor(date.getTime() / 1000);

export const convertDateFromUnixTime = (date: number | string): Date => new Date(Number(date) * 1000);

export const convertStringFromUnixTime = (date: number | string) =>
  convertDateFromUnixTime(date).toLocaleDateString('en-US');

const S_PER_DAY = 60 * 60 * 24;
export const getTimeDiff = (date1: number | string, date2: number | string): number => {
  const diff = Math.abs(Number(date1) - Number(date2));
  return Math.floor(diff / S_PER_DAY);
};
