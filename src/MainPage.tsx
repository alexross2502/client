import style from "./MainPage.module.css";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import ModalAuthorization from "./Components/ModalAuthorization/ModalAuthorization";
import ModalOrder from "./Components/ModalOrder/ModalOrder";
import ModalAvailableMasters from "./Components/ModalAvailableMasters/ModalAvailableMasters";
import React from "react";
import ModalOrderSuccess from "./Components/ModalAvailableMasters/ModalOrderSuccess";
import ModalRegistration from "./Components/ModalRegistration/ModalRegistration";


const MainPage = () => {
  return (
    <div>
      <div className={style.background}>
        <Header />
        <Content />
        <ModalAuthorization />
        <ModalOrder />
        <ModalAvailableMasters />
        <ModalOrderSuccess />
        <ModalRegistration />
      </div>
    </div>
  );
};

export default MainPage;
