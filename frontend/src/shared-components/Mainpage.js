import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faClock } from "@fortawesome/free-solid-svg-icons";
import "./Mainpage.css";
import { useUserData } from "../context/UserDataProvider.js";
import { ErrorPage } from "../shared-components/ErrorPage.js";
import axios from "axios";
import { useToken } from "../context/TokenProvider.js";

export const Mainpage = () => {
  const { token } = useToken();
  const [greeting, setGreeting] = useState("");
  const { userData } = useUserData();
  const [scheduledAppointmentsData, setScheduledAppointmentsData] =
    useState(null);
  const [
    filteredScheduledAppointmentsData,
    setFilteredScheduledAppointmentsData,
  ] = useState(null);
  const [childData, setChildData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        token: token,
      };

      try {
        let res = null;
        res = await axios
          .post("/api/children/getChildProfile", data)
          .then((response) => response.data);
        setChildData(res);

        res = await axios
          .post("/api/other/getScheduledAppointments", data)
          .then((response) => response.data);
        setScheduledAppointmentsData(res);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      scheduledAppointmentsData &&
      childData &&
      userData &&
      userData.role === "RODITELJ"
    ) {
      const filteredData = scheduledAppointmentsData.filter((entry) =>
        childData.some((child) => child.oib === entry.oibChild.oib)
      );
      setFilteredScheduledAppointmentsData(filteredData);
    } else if (
      scheduledAppointmentsData &&
      userData &&
      (userData.role === "LIJEČNIK" || userData.role === "PEDIJATAR")
    ) {
      const filteredData = scheduledAppointmentsData.filter(
        (entry) => userData.oib === entry.pediatritionID.oib
      );
      setFilteredScheduledAppointmentsData(filteredData);
    }
  }, [childData, scheduledAppointmentsData, userData]);

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting(
          userData.name ? `Dobro jutro, ${userData.name}!` : `Dobro jutro!`
        );
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting(
          userData.name ? `Dobar dan, ${userData.name}!` : `Dobar dan!`
        );
      } else {
        setGreeting(
          userData.name ? `Dobra večer, ${userData.name}!` : `Dobra večer!`
        );
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000);
    return () => clearInterval(intervalId);
  }, [userData.name]);

  if (!userData.role) {
    return <ErrorPage />;
  }

  return (
    <div className="mainpage">
      <h1 className="mainpage__title">NASLOVNA</h1>
      <h2 className="mainpage__greeting">{greeting}</h2>
      <div className="mainpage__wrapper">
        {userData.role !== "ADMIN" && userData.role === "RODITELJ" && (
          <div className="mainpage__schedule">
            <div className="mainpage__schedule__header">
              <p className="mainpage__schedule__headerTitle">
                Zakazani termini
              </p>
              <FontAwesomeIcon
                className="mainpage__schedule__headerIcon"
                icon={faClock}
              />
            </div>
            <div className="approvedSchedule mainpage__divFull">
              {filteredScheduledAppointmentsData ? (
                filteredScheduledAppointmentsData.length > 0 ? (
                  filteredScheduledAppointmentsData.map((element) => (
                    <div
                      className="appointment mainpage__changeColour"
                      key={element.id}
                    >
                      <div className="appointment__verticalWrapper">
                        <p className="appointment__label">Zakazan u:</p>
                        <p className="appointment__data">
                          {element.dateOfExam}
                        </p>
                      </div>
                      <div className="appointment__verticalWrapper">
                        <div className="appointment__label">
                          {element.pediatritionID.role ===
                          "LIJECNIK_OBITELJSKE_MEDICINE"
                            ? "Liječnik"
                            : element.pediatritionID.role
                                .charAt(0)
                                .toUpperCase() +
                              element.pediatritionID.role
                                .slice(1)
                                .toLowerCase()}
                        </div>
                        <p className="appointment__data">
                          {element.pediatritionID.name}{" "}
                          {element.pediatritionID.surname}
                        </p>
                      </div>
                      <div className="appointment__verticalWrapper">
                        <div className="appointment__label">Pacijent:</div>
                        <p className="appointment__data">
                          {element.oibChild.name} {element.oibChild.surname}
                        </p>
                      </div>
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
        )}
        {userData.role !== "ADMIN" &&
          (userData.role === "PEDIJATAR" || userData.role === "LIJEČNIK") && (
            <div className="mainpage__schedule">
              <div className="mainpage__schedule__header">
                <p className="mainpage__schedule__headerTitle">
                  Zakazani termini
                </p>
                <FontAwesomeIcon
                  className="mainpage__schedule__headerIcon"
                  icon={faClock}
                />
              </div>
              <div className="approvedSchedule mainpage__divFull">
                {filteredScheduledAppointmentsData ? (
                  filteredScheduledAppointmentsData.length > 0 ? (
                    filteredScheduledAppointmentsData.map((element) => (
                      <div
                        className="appointment mainpage__changeColour"
                        key={element.id}
                      >
                        <div className="appointment__verticalWrapper">
                          <p className="appointment__label">Zakazan u:</p>
                          <p className="appointment__data">
                            {element.dateOfExam}
                          </p>
                        </div>
                        <div className="appointment__verticalWrapper">
                          <div className="appointment__label">Pacijent:</div>
                          <p className="appointment__data">
                            {element.oibChild.name} {element.oibChild.surname} (
                            {element.oibChild.oib})
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="error__text">Nema zakazanih termina</p>
                  )
                ) : (
                  <p className="error__text">
                    Greška prilikom dohvata podataka
                  </p>
                )}
              </div>
            </div>
          )}
        <div className="mainpage__schedule">
          <div className="mainpage__schedule__header">
            <p className="mainpage__schedule__headerTitle">Nove obavijesti</p>
            <FontAwesomeIcon
              className="mainpage__schedule__headerIcon"
              icon={faBell}
            />
          </div>
          <div className="mainpage__body mainpage__divFull">
            <p className="error__text">Nema novih obavijesti</p>
          </div>
        </div>
      </div>
    </div>
  );
};
