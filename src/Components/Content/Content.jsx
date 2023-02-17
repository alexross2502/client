import Button from "./Button/Button";
import style from "./Content.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setModalOrder } from "../../redux/orderReducer";

const Content = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  function onActiveClick() {
    dispatch(setModalOrder());
  }

  return (
    <div className={style.container}>
      <h1>
        <p>{t("mainText.part1")}</p>
        <p>{t("mainText.part2")}</p>
      </h1>
      <div className={style.button} onClick={() => onActiveClick()}>
        <Button />
      </div>
    </div>
  );
};

export default Content;
