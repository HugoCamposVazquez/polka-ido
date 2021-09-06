export const convertDateToUnixtime = (date: Date): number => Math.floor(date.getTime() / 1000);

export const convertDateFromUnixtime = (date: number): string => new Date(date * 1000).toLocaleDateString('en-US');
