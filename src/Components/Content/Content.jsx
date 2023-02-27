import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setModalOrder } from "../../redux/orderReducer";
import { Button } from "@mui/material";

const Content = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div>
      <h1>
        <p>{t("mainText.part1")}</p>
        <p>{t("mainText.part2")}</p>
      </h1>
    </div>
  );
};

export default Content;
