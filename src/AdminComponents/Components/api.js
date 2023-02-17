import { request } from "../axios-utils";

const Api = {};

Api.getAll = async function (url) {
  return await request({url: `/${url}`})
}

Api.delete = async function (url, id) {
  return await request({url: `/${url}/${id}`, method: 'delete'})
};

Api.getAvailable = async function (url, id) {
  return await request({url: `/${url}/${id}`, method: 'get'})
};

Api.mastersCheck = async function checkMasters(date, town, townName) {
  let data = {};
  data.date = date;
  data.town = town;
  data.townName = townName;
  return await request({url: `/reservation/available`, method: 'post', data: data})
};

Api.makeOrder = async function orderMake(town, master, date, recipient, name, surname, rating, clientName) {
  let data = {};
  data.recipient = recipient;
  data.name = name;
  data.surname = surname;
  data.rating = rating;
  data.towns_id = String(town);
  data.master_id = String(master);
  data.day = date.date;
  data.clientName = clientName

  let hours;
  if (date.time[1] - date.time[0] == 1) {
    hours = String(date.time[0]);
  } else if (date.time[1] - date.time[0] == 2) {
    hours = `${date.time[0]}-${+date.time[0] + 1}`;
  } else if (date.time[1] - date.time[0] == 3) {
    hours = `${date.time[0]}-${+date.time[0] + 1}-${+date.time[0] + 2}`;
  }
  data.hours = hours;

  return await request({url: `/reservation/order`, method: 'post', data: data})
};


export default Api;
