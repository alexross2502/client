import { request } from "../../axios-utils";

export async function masterSave(name, surname, rating, town) {
  let data = {};
  data.name = name;
  data.surname = surname;
  data.rating = rating;
  data.townName = town;
  return await request({url: `/masters`, method: 'post', data: data})
}
