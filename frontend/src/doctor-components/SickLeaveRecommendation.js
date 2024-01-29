import React, { useState, useEffect } from "react";
import axios from "axios";
import "../parent-components/NewAppointment.css";
import "../other-components/Appointment.css";
import { useToken } from "../context/TokenProvider.js";

export const SickLeaveRecommendation = () => {
  const { token } = useToken();
  const [waitingSickLeaves, setWaitingSickLeaves] = useState(null);

  const handleCancelSickLeave = async (id) => {
    const data = {
      token: token,
      id: id,
    };

    try {
      await axios.post("/api/other/postCancelSickLeave", data).then(() => {
        setWaitingSickLeaves((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptSickLeave = async (id) => {
    const data = {
      token: token,
      id: id,
    };

    try {
      await axios.post("/api/other/postAcceptSickLeave", data).then(() => {
        setWaitingSickLeaves((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        token: token,
      };

      try {
        let res = null;
        res = await axios
          .post("/api/other/getWaitingSickLeaves", data)
          .then((response) => response.data);
        console.log(res);
        setWaitingSickLeaves(res);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="schedule">
      <h2 className="schedule__title">PREPORUKE ZA BOLOVANJE NA ČEKANJU</h2>
      <hr className="schedule__hr" />
      {waitingSickLeaves ? (
        waitingSickLeaves.length > 0 ? (
          <div className="pendingSchedule pendingSchedule__modified">
            {waitingSickLeaves.map((sickLeave) => (
              <div className="appointmentSickLeave" key={sickLeave.id}>
                <div className="appointment__verticalWrapper appointment__justifyCenter">
                  <div className="appointment__verticalWrapper appointment__widthAuto">
                    <div className="appointment__horizontalWrapper">
                      <p className="appointment__label">Pedijatar:</p>
                      <p className="appointment__data">
                        {sickLeave.pediatritionID.name}{" "}
                        {sickLeave.pediatritionID.surname} (
                        {sickLeave.pediatritionID.oib})
                      </p>
                    </div>
                    <div className="appointment__horizontalWrapper">
                      <div className="appointment__label">Pacijent:</div>
                      <p className="appointment__data">
                        {sickLeave.oibChild.name} {sickLeave.oibChild.surname} (
                        {sickLeave.oibChild.oib})
                      </p>
                    </div>
                    <div className="appointment__horizontalWrapper">
                      <div className="appointment__label">Dijagnoza:</div>
                      <p className="appointment__data">
                        {sickLeave.medCert.reason}
                      </p>
                    </div>
                    <div className="appointment__horizontalWrapper">
                      <div className="appointment__label">Trajanje:</div>
                      <p className="appointment__data">
                        {sickLeave.medCert.dateOfCert +
                          " - " +
                          sickLeave.medCert.endDate}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="appointment__horizontalWrapper">
                  <button
                    className="appointment__acceptButton appointment__buttonEdit"
                    onClick={() => handleAcceptSickLeave(sickLeave.id)}
                  >
                    Prihvati
                  </button>
                  <button
                    className="appointment__cancelButton appointment__buttonEdit appointment__marginTop"
                    onClick={() => handleCancelSickLeave(sickLeave.id)}
                  >
                    Odbij
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="error__text ">Nema preporuka za bolovanje na čekanju</p>
        )
      ) : (
        <p className="error__text ">Greška prilikom dohvata podataka</p>
      )}
    </div>
  );
};
