import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import { Login } from "./register-login-components/Login";
import { Register } from "./register-login-components/Register";
import { Home } from "./shared-components/Home";
import { Profile } from "./shared-components/Profile";
import { NewAppointment } from "./parent-components/NewAppointment";
import { WaitingAppointment } from "./doctor-components/WaitingAppointment";
import { NewAppointmentOutcome } from "./doctor-components/NewAppointmentOutcome";
import { NewMedicalReport } from "./doctor-components/NewMedicalReport";
import { SickLeaveRecommendation } from "./doctor-components/SickLeaveRecommendation";
import { useToken } from "./context/TokenProvider.js";
import Cookies from "js-cookie";
import { ChildProfile } from "./shared-components/ChildProfile.js";
import { MedicalCheckupComponent } from "./shared-components/MedicalCheckupComponent.js";
import { MedicalReportComponent } from "./shared-components/MedicalReportComponent.js";
import { AccountEdit } from "./administrator-components/AccountEdit.js";

export const App = () => {
  const { token, login } = useToken();

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      login(storedToken);
    }
  }, [login]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/prijava" />} />
        <Route
          path="/registracija"
          element={token !== null ? <Navigate to="/naslovna" /> : <Register />}
        />
        <Route
          path="/prijava"
          element={token !== null ? <Navigate to="/naslovna" /> : <Login />}
        />
        <Route
          path="/naslovna"
          element={token !== null ? <Home /> : <Navigate to="/prijava" />}
        >
          <Route path="/naslovna/profil" element={<Profile />} />
          <Route path="/naslovna/noviTermin" element={<NewAppointment />} />
          <Route path="/naslovna/popisPregleda" element={<ChildProfile />} />

          <Route path="/naslovna/popisPacijenata" element={<></>} />
          <Route
            path="/naslovna/terminiNaCekanju"
            element={<WaitingAppointment />}
          />
          <Route
            path="/naslovna/noviPregled"
            element={<NewAppointmentOutcome />}
          />
          <Route
            path="/naslovna/upravljanjeRacunima"
            element={<AccountEdit />}
          />
          <Route path="/naslovna/noviNalaz" element={<NewMedicalReport />} />
          <Route
            path="/naslovna/preporukeZaBolovanje"
            element={<SickLeaveRecommendation />}
          />
        </Route>
        <Route
          path="/naslovna/pregled/:id"
          element={
            token !== null ? (
              <MedicalCheckupComponent />
            ) : (
              <Navigate to="/prijava" />
            )
          }
        ></Route>
        <Route
          path="/naslovna/nalaz/:id"
          element={
            token !== null ? (
              <MedicalReportComponent />
            ) : (
              <Navigate to="/prijava" />
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
