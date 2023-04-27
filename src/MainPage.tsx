import style from "./MainPage.module.css";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import ModalAuthorization from "./Components/ModalAuthorization/ModalAuthorization";
import ModalOrder from "./Components/ModalOrder/ModalOrder";
import ModalAvailableMasters from "./Components/ModalAvailableMasters/ModalAvailableMasters";
import React, { useState } from "react";
import ModalRegistration from "./Components/ModalRegistration/ModalRegistration";
import ErrorAndSuccessModal from "./Components/Modals/ErrorAndSuccessModal";

const MainPage = () => {
  const [isErrorAndSuccessModalActive, setErrorAndSuccessModalActive] =
    useState<boolean>(false);
  const [ErrorAndSuccessModalData, setErrorAndSuccessModalData] = useState({
    type: "",
    message: "",
  });
  const [isAuthorizationModalActive, setAuthorizationModalActive] =
    useState<boolean>(false);
  const [isRegistrationModalActive, setRegistrationModalActive] =
    useState<boolean>(false);
  const [isOrderModalActive, setOrderModalActive] = useState<boolean>(false);
  const [isAvailableMastersModalActive, setAvailableMastersModalActive] =
    useState<boolean>(false);
  const [orderData, setOrderData] = useState<any>();

  function errorAndSuccessModalHandler(data) {
    setErrorAndSuccessModalData(data);
    setErrorAndSuccessModalActive(!isErrorAndSuccessModalActive);
  }

  function authorizationModalHandler() {
    setAuthorizationModalActive(!isAuthorizationModalActive);
  }

  function registrationModalHandler() {
    setRegistrationModalActive(!isRegistrationModalActive);
  }

  function orderModalHandler() {
    setOrderModalActive(!isOrderModalActive);
  }

  function orderPayload(payload) {
    setOrderData(payload);
    availableMastersModalHandler();
  }

  function availableMastersModalHandler() {
    setAvailableMastersModalActive(!isAvailableMastersModalActive);
  }

  return (
    <>
      <div className={style.background}>
        <Header
          authorization={authorizationModalHandler}
          registration={registrationModalHandler}
          order={orderModalHandler}
        />
        <Content />
      </div>
      {isErrorAndSuccessModalActive && (
        <ErrorAndSuccessModal
          onClose={errorAndSuccessModalHandler}
          type={ErrorAndSuccessModalData?.type}
          message={ErrorAndSuccessModalData?.message}
        />
      )}
      {isAvailableMastersModalActive && (
        <ModalAvailableMasters
          data={orderData}
          onClose={availableMastersModalHandler}
          result={errorAndSuccessModalHandler}
        />
      )}
      {isAuthorizationModalActive && (
        <ModalAuthorization
          onClose={authorizationModalHandler}
          result={errorAndSuccessModalHandler}
        />
      )}
      {isOrderModalActive && (
        <ModalOrder
          onClose={orderModalHandler}
          result={errorAndSuccessModalHandler}
          next={orderPayload}
        />
      )}
      {isRegistrationModalActive && (
        <ModalRegistration
          onClose={registrationModalHandler}
          result={errorAndSuccessModalHandler}
        />
      )}
    </>
  );
};

export default MainPage;
