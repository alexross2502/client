import Api from "../../AdminComponents/Components/api";
import { reservationSave } from "../../AdminComponents/Components/ReservationPage/reservationSave";

export async function sendMail(masterData, orderData) {
  //Создание брони
  let date = {
    date: orderData[0][3],
    time: orderData[0][6],
  };
  reservationSave(orderData[0][5], masterData.id, date);

  //Отправка письма на почту клиента
  Api.sendMail(
    orderData[0][1],
    masterData.name,
    masterData.surname,
    masterData.rating
  );
}
