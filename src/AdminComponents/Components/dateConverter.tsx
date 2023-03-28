export function timestampToDate(timestamp) {
  var d = new Date(timestamp);

  //console.log(d.getHours());
  return (
    ("0" + d.getDate()).slice(-2) +
    "." +
    ("0" + d.getMonth()).slice(-2) +
    "." +
    d.getFullYear()
  );
}

export function dateToTimestamp(date, time) {
  let [year, month, day] = date.split("-");
  return new Date(year, month - 1, day, time).getTime();
}
