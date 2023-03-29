import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setModalActive } from "../redux/modalWindowReducer";
import React from "react";
import { RootState } from "../redux/rootReducer";

const RequireAuth = ({ children }) => {
  const isAuthorized = useSelector(
    (state: RootState) => state.authorization.isAuthorized
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isAuthorized) {
    dispatch(setModalActive());
    navigate("/");
  }

  return children;
};

export { RequireAuth };
