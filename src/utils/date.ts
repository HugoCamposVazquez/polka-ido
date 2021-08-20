export const convertDateToUnixtime = (date: Date): number => Math.floor(date.getTime() / 1000);
