
export const formatDateToLocal = (
  dateRef: Date | string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateRef) 
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};