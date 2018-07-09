//Support function for date display issues
export const deconstructDate = (dateTime) => {
  var dateObject = new Date(dateTime.replace(/-/g, "/"));
  return date = {
    year: dateObject.getFullYear(),
    month: (dateObject.getMonth() + 1) < 10 ?
      "0" + (dateObject.getMonth() + 1)
      .toString() : (dateObject.getMonth() + 1),
    day: dateObject.getDate() < 10 ?
      "0" + dateObject.getDate()
      .toString() : dateObject.getDate(),
    hour: dateObject.getHours() < 10 ?
      "0" + dateObject.getHours()
      .toString() : dateObject.getHours(),
    minute: dateObject.getMinutes() < 10 ?
      "0" + dateObject.getMinutes()
      .toString() : dateObject.getMinutes(),
    second: dateObject.getSeconds() < 10 ?
      "0" + dateObject.getSeconds()
      .toString() : dateObject.getSeconds()
  };
};
