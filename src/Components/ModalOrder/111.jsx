import React, { useEffect, useState } from "react";
import style from "./ModalOrder.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setModalOrder } from "../../redux/orderReducer";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Api from "../../AdminComponents/Components/api";
import { FormButton } from "../../AdminComponents/Components/FormButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setModalMasters } from "../../redux/modalMastersReducer";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const ModalOrder = () => {
  const userData = useSelector((state) => state.orderData.data);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: "onBlur",
  });
 
  //Открытие\закрытие модального окна
  const isActive = useSelector((state) => state.order.isActive);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  function onActiveClick() {
    dispatch(setModalOrder());
  }

  const [townsList, setTownsList] = useState([]);
  useEffect(() => {
    let asyncFunc = async () => {
      let towns = [...(await Api.getAll("towns"))];
      setTownsList(towns);
      formReset()
    };
    asyncFunc();
  }, [isActive]);

  const townListItem = townsList.map((item) => {
    return (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    );
  });

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

  let today = new Date();
  let now = today.getUTCHours() + 3;
  //Проверяем не выбран ли сегодняшний день
  function dayChecker() {
    if (String(selectedDate).slice(0, 15) == String(today).slice(0, 15))
      return now < 9 ? 9 : now;
    else return 9;
  }

  async function formSend(data) {
    let date = dateParser(selectedDate, selectedTime, data.size);
    let town = townsList[townsList.findIndex((el) => el.name == data.town)].id;
    let orderData = [date, town, data.town]
    dispatch(setModalOrder());
    dispatch({ type: "setAvailableMasters", payload: [...orderData] });
    dispatch(setModalMasters());

    //Добавление информации о клиенте и заказе для дальнейшего отправления письма
    let hours;
    if (date.time[1] - date.time[0] == 1) {
      hours = String(date.time[0]);
    } else if (date.time[1] - date.time[0] == 2) {
      hours = `${date.time[0]}-${+date.time[0] + 1}`;
    } else if (date.time[1] - date.time[0] == 3) {
      hours = `${date.time[0]}-${+date.time[0] + 1}-${+date.time[0] + 2}`;
    }

    let finaleData = [data.name, data.email, data.town, date.date, hours];
    townsList.forEach((el) => {
      if (el.name == data.town) finaleData.push(String(el.id));
    });
    finaleData.push(date.time);
    finaleData.push(data.size)

    dispatch({
      type: "setOrderData",
      payload: [...finaleData],
    });
    console.log(finaleData)

    ////////////////////////////////////////////////////////////////////////////
  }

  //Очистка форм
  function formReset () {
    let hours, date ;
    if(userData[0][3] == '' || userData[0][3] == undefined){
      date = ''
    }else{
      date = userData[0][3]
    }
    if(userData[0][4] == '' || userData[0][4] == undefined){
      hours = ''
    }else{
      hours = userData[0][4].split('-')[0]
    }
      reset({
        name: userData[0][0], 
        email: userData[0][1], 
        size: userData[0][7], 
        town: userData[0][2], 
      }) 
    
      document.getElementById('time').value = hours
      document.getElementById('date').value = date
  }

  return (
    <div
      className={isActive ? `${style.modal} ${style.active}` : `${style.modal}`}
      onClick={() => onActiveClick()}
    >
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal_container}>
          <h1 className={style.modal_h1}>{t("order.header")}</h1>
          <span className={style.closeBtn}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"
              className={style.modal_img}
              onClick={() => onActiveClick()}
            ></img>
          </span>

          <form className={style.modal_form} onSubmit={handleSubmit(formSend)}>
            <p>{t("order.name")}</p>
            <input
              name="name"
              className={style.modal_input}
              {...register("name", {
                required: `${t("adminPopup.emptyField")}`,
                minLength: {
                  value: 3,
                  message: `${t("adminPopup.min")}`,
                },
                maxLength: {
                  value: 15,
                  message: `${t("adminPopup.max")}`,
                },
                pattern: {
                  value: /^[а-яА-я]+$/,
                  message: `${t("adminPopup.onlyCyrillic")}`,
                },
              })}
            ></input>
            {errors?.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
            <p>{t("order.email")}</p>
            <input
              name="email"
              className={style.modal_input}
              {...register("email", {
                required: `${t("adminPopup.emptyField")}`,
                pattern: {
                  value:
                    /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/,
                  message: `${t("adminPopup.vrongFormat")}`,
                },
              })}
            ></input>
            {errors?.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
            <p>{t("order.repearType")}</p>
            <select
              {...register("size")}
              className={style.select}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <p>{t("order.town")}</p>
            <select
              {...register("town", {
                required: `${t("adminPopup.emptyField")}`,
              })}
              className={style.select}
              required
            >
              <option disabled value="DEFAULT">
                Выберите город
              </option>
              {townListItem}
            </select>
            <p>{t("order.date")}</p>
            <DatePicker
              id="date"
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
            <p>{t("order.time")}</p>
            <DatePicker
              id="time"
              value={selectedTime}
              className={style.select}
              required={true}
              selected={selectedTime}
              showTimeSelect
              showTimeSelectOnly
              minTime={setHours(setMinutes(new Date(), 0), dayChecker())}
              maxTime={setHours(setMinutes(new Date(), 0), 19)}
              timeIntervals={60}
              dateFormat="h:mm"
              onChange={(time) => setSelectedTime(time)}
            />

            <FormButton buttonType="saveButton" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalOrder;
