import { formatISO, parse } from "date-fns";

// Converts the date input to ISO time if needed
export const parseDate = (date: string) => {
  const invalidDateString: RegExp = /^[0-9]{2}\/[0-9]{2}\/[0-9]{2}\s-\s[0-9]{2}:[0-9]{2}/g; //example: "18/12/21 - 21:04"
  if (invalidDateString.test(date) === false) return date;
  return formatISO(parse(date, "dd/MM/yy - HH:mm", new Date()));
};
