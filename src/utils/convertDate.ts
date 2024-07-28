export function convertDate(dateString: string) {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 7);
  return date.toLocaleString("en-us", { timeZone: "Asia/Jakarta" });
}
