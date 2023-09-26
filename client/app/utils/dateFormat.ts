export const dateFormat = (date: string) => {
  const d = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(d);

  return formattedDate;
};
