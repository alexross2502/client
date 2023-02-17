import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setModalActive } from "../redux/modalWindowReducer";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuthorized = useSelector((state) => state.authorization.isAuthorized);
  const dispatch = useDispatch();

  if (!isAuthorized) {
    dispatch(setModalActive());
    return <Navigate to="/" state={{ from: location }} />;
  }


  
  return children;
};

export { RequireAuth };
