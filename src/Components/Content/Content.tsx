import React from "react";
import { useTranslation } from "react-i18next";

const Content = () => {
  const { t } = useTranslation();

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
