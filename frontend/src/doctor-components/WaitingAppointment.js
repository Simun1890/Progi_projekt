import React, { useState, useEffect } from "react";
import "../parent-components/NewAppointment.css";
import "../other-components/Appointment.css";
import axios from "axios";
import { useToken } from "../context/TokenProvider.js";
import "../other-components/AccountInput.css";
import { useUserData } from "../context/UserDataProvider.js";

export const WaitingAppointment = () => {
  const { token } = useToken();
  const { userData } = useUserData();
  const [scheduledAppointmentsData, setScheduledAppointmentsData] =
    useState(null);
  const [
    filteredScheduledAppointmentsData,
    setFilteredScheduledAppointmentsData,
  ] = useState(null);
  const [waitingAppointmentsData, setWaitingAppointmentsData] = useState(null);
  const [filteredWaitingAppointments, setFilteredWaitingAppointments] =
    useState(null);

  const handleCancelAppointment = async (id) => {
    let data = {
      token: token,
      id: id,
    };

    try {
      await axios.post("/api/other/postCancelAppointment", data);
      setScheduledAppointmentsData((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAppointment = async (id) => {
    let data = {
      token: token,
      id: id,
    };

    try {
      await axios.post("/api/other/postDeleteAppointment", data);
      setWaitingAppointmentsData((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptAppointment = async (id) => {
    let data = {
      token: token,
      id: id,
    };

    try {
      await axios.post("/api/other/postAcceptAppointment", data);
      setWaitingAppointmentsData((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );

      let res = await axios
        .post("/api/other/getScheduledAppointments", data)
        .then((response) => response.data);
      setScheduledAppointmentsData(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (waitingAppointmentsData && userData) {
      const filteredData = waitingAppointmentsData.filter(
        (entry) => userData.oib === entry.pediatritionID.oib
      );
      setFilteredWaitingAppointments(filteredData);
    }
  }, [userData, waitingAppointmentsData]);

  useEffect(() => {
    if (scheduledAppointmentsData && userData) {
      const filteredData = scheduledAppointmentsData.filter(
        (entry) => userData.oib === entry.pediatritionID.oib
      );
      setFilteredScheduledAppointmentsData(filteredData);
    }
  }, [userData, scheduledAppointmentsData]);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        token: token,
      };

      try {
        let res = null;
        res = await axios
          .post("/api/other/getScheduledAppointments", data)
          .then((response) => response.data);
        setScheduledAppointmentsData(res);

        res = await axios
          .post("/api/other/getWaitingAppointments", data)
          .then((response) => response.data);
        setWaitingAppointmentsData(res);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="schedule">
      <h2 className="schedule__title">TERMINI NA ČEKANJU</h2>
      <hr className="schedule__hr" />
      <div className="pendingSchedule">
        {filteredWaitingAppointments ? (
          filteredWaitingAppointments.length > 0 ? (
            filteredWaitingAppointments.map((element) => (
              <div className="appointmentDoctor" key={element.id}>
                <div className="appointment__verticalWrapper">
                  <p className="appointment__label">Traženo vrijeme:</p>
                  <p className="appointment__data">{element.dateOfExam}</p>
                </div>
                <div className="appointment__verticalWrapper">
                  <div className="appointment__label">Pacijent:</div>
                  <p className="appointment__data">
                    {element.oibChild.name} {element.oibChild.surname}
                  </p>
                </div>
                <button
                  className="appointment__acceptButton"
                  onClick={() => handleAcceptAppointment(element.id)}
                >
                  Prihvati
                </button>
                <button
                  className="appointment__cancelButton"
                  onClick={() => handleDeleteAppointment(element.id)}
                >
                  Odbij
                </button>
              </div>
            ))
          ) : (
            <p className="error__text">Nema termina na čekanju</p>
          )
        ) : (
          <p className="error__text">Greška prilikom dohvata podataka</p>
        )}
      </div>
      <h2 className="schedule__title">ZAKAZANI TERMINI</h2>
      <hr className="schedule__hr" />
      <div className="approvedSchedule">
        {filteredScheduledAppointmentsData ? (
          filteredScheduledAppointmentsData.length > 0 ? (
            filteredScheduledAppointmentsData.map((element) => (
              <div className="appointment" key={element.id}>
                <div className="appointment__verticalWrapper">
                  <p className="appointment__label">Zakazan u:</p>
                  <p className="appointment__data">{element.dateOfExam}</p>
                </div>
                <div className="appointment__verticalWrapper">
                  <div className="appointment__label">Pacijent:</div>
                  <p className="appointment__data">
                    {element.oibChild.name} {element.oibChild.surname}
                  </p>
                </div>
                <button
                  className="appointment__cancelButton"
                  onClick={() => handleCancelAppointment(element.id)}
                >
                  Otkaži
                </button>
              </div>
            ))
          ) : (
            <p className="error__text">Nema zakazanih termina</p>
          )
        ) : (
          <p className="error__text">Greška prilikom dohvata podataka</p>
        )}
      </div>
    </div>
  );
};
