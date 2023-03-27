import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setModalActive } from "../redux/modalWindowReducer";
import React = require("react");
import { RootState } from "../redux/rootReducer";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuthorized = useSelector(
    (state: RootState) => state.authorization.isAuthorized
  );
  const dispatch = useDispatch();

  if (!isAuthorized) {
    dispatch(setModalActive());
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
