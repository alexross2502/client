import { useTranslation } from "react-i18next";
import style from "../../AdminPage.module.css";
import { FormButton } from "../FormButton";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LeftSideMenu } from "../../LeftSideMenu";
import { useForm } from "react-hook-form";
import { ReservationForm } from "./ReservationForm";
import Api from "../api";
import { setPageRerender } from "../../../redux/rerenderReducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { reservationSave } from "./reservationSave";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const ReservationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rerender = useSelector((state) => state.rerender.isRerender);
  const [reservationList, setReservationList] = useState([]);
  const [mastersList, setMastersList] = useState([]);
  const [townsList, setTownsList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    let asyncFunc = async () => {
      let reservation = [...(await Api.getAll("reservation"))];
      setReservationList(reservation);
      let masters = [...(await Api.getAll("masters"))];
      setMastersList(masters);
      let towns = [...(await Api.getAll("towns"))];
      setTownsList(towns);
    };
    asyncFunc();
  }, [rerender]);

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  let today = new Date();
  let now = today.getUTCHours() + 3;
  //Проверяем не выбран ли сегодняшний день
  function dayChecker() {
    if (String(selectedDate).slice(0, 15) == String(today).slice(0, 15))
      return now < 9 ? 9 : now;
    else return 9;
  }

  let monthNumber = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateParser = (date, time, size) => {
    let dateObj = {};
    let temporary = date.toString().split(" ");
    dateObj.date = `${temporary[2]}.${monthNumber.indexOf(temporary[1])}.${
      temporary[3]
    }`;

    dateObj.time = [
      +time.toString().slice(16, 18),
      +time.toString().slice(16, 18) + Number(size),
    ];

    return dateObj;
  };
  const townListItem = townsList.map((item) => {
    return (
      <option value={item.id} key={item.id}>
        {item.name}
      </option>
    );
  });
  const mastersListItem = mastersList.map((item) => {
    let data = `${item.name} ${item.surname}`;
    return (
      <option value={item.id} key={item.id}>
        {data}
      </option>
    );
  });
  const reservationListItem = reservationList.map((item) => {
    return <ReservationForm data={item} key={item.id} />;
  });

  async function newReservation(data) {
    let date = dateParser(selectedDate, selectedTime, data.size);
    await reservationSave(data.town, data.master, date);
    dispatch(setPageRerender());
  }
  return (
    <div className={style.container} onSubmit={handleSubmit(newReservation)}>
      <LeftSideMenu />
      <div className={style.rightSide}>
        <p className={style.header}>{t("reservationPage.header")}</p>
        <form className={style.addContainer}>
          <p className={style.subtitle}>{t("adminPage.addReservation")}</p>
          <div className={style.dateContainer}>
            <DatePicker
              placeholderText={"Выберите дату"}
              className={style.select}
              required={true}
              selected={selectedDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              filterDate={(date) => date.getDay() != 6 && date.getDay() != 0}
              onChange={(date) => {
                setSelectedDate(date);
                setSelectedTime(null);
              }}
            />
          </div>
          <div className={style.dateContainer}>
            <DatePicker
              placeholderText={"Выберите время"}
              className={style.select}
              required={true}
              selected={selectedTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              minTime={setHours(setMinutes(new Date(), 0), dayChecker())}
              maxTime={setHours(setMinutes(new Date(), 0), 19)}
              dateFormat="h:mm"
              onChange={(time) => setSelectedTime(time)}
            />
          </div>
          <select
            {...register("size", {
              required: `${t("adminPopup.emptyField")}`,
            })}
            className={style.select}
          >
            <option disabled selected value="">
              Выберите размер часов
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <select
            {...register("town", {
              required: `${t("adminPopup.emptyField")}`,
            })}
            className={style.select}
            required
          >
            <option disabled selected value="">
              Выберите город
            </option>
            {townListItem}
          </select>
          <select
            {...register("master", {
              required: `${t("adminPopup.emptyField")}`,
            })}
            className={style.select}
            required
          >
            <option disabled selected value="">
              Выберите мастера
            </option>
            {mastersListItem}
          </select>

          <FormButton buttonType="saveButton" />
        </form>
        <div>
          <p className={style.subtitle}>{t("adminPage.list")}</p>
          <div className={style.listContainer}></div>
          {reservationListItem}
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
