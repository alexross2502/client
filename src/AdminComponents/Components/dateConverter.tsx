import repairTime from "./repairTime.json";

export function dateConverter(el) {
  el.end = `${new Date(el.day).getHours()}-${
    new Date(el.day).getHours() + repairTime[el.size]
  }`;
  el.day = new Date(el.day).toLocaleString("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
