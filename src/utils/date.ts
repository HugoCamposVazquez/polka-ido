export const convertDateToUnixtime = (date: Date): number => Math.floor(date.getTime() / 1000);

export const convertDateFromUnixtime = (date: number): string => new Date(date * 1000).toLocaleDateString('en-US');

const MS_PER_DAY = 1000 * 60 * 60 * 24;
export const getTimeDiff = (date1: number | string, date2: number | string): number => {
  const diff = Math.abs(Number(date1) - Number(date2));
  return Math.floor(diff / MS_PER_DAY);
};
