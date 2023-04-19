import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import MainPage from "./MainPage";
import { RequireAuth } from "./hoc/RequireAuth";
import ClientPage from "./AdminComponents/Components/ClientsPage/ClientPage";
import MastersPage from "./AdminComponents/Components/MastersPage/MastersPage";
import TownsPage from "./AdminComponents/Components/TownsPage/TownsPage";
import ReservationPage from "./AdminComponents/Components/ReservationPage/ReservationPage";
import React from "react";
import ClientAccount from "./ClientAccount/ClientAccount";
import MasterAccount from "./MasterAccount/MasterAccount";
import ConfirmationPage from "./Components/ConfirmationPage/ConfirmationPage";

function App() {
  return (
    <Suspense fallback="loading">
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/clients"
              element={
                <RequireAuth>
                  <ClientPage />
                </RequireAuth>
              }
            />
            <Route
              path="/masters"
              element={
                <RequireAuth>
                  <MastersPage />
                </RequireAuth>
              }
            />
            <Route
              path="/towns"
              element={
                <RequireAuth>
                  <TownsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/reservation"
              element={
                <RequireAuth>
                  <ReservationPage />
                </RequireAuth>
              }
            />
            <Route path="/clientaccount" element={<ClientAccount />} />
            <Route path="/masteraccount" element={<MasterAccount />} />
            <Route
              path="/mailconfirmation/token=:token/url=:url"
              element={<ConfirmationPage />}
            />
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
