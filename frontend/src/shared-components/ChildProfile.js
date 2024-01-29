import React, { useState, useEffect, useRef } from "react";
import "../other-components/AccountInput.css";
import "../parent-components/NewAppointment.css";
import "../other-components/Appointment.css";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserDataProvider.js";
import axios from "axios";
import { useToken } from "../context/TokenProvider.js";

export const ChildProfile = () => {
  const navigate = useNavigate();
  const [child, setChild] = useState("Odaberi");
  const { userData } = useUserData();
  const { token } = useToken();

  const childRef = useRef(null);

  const [childData, setChildData] = useState(null);
  const [patientsData, setPatientsData] = useState(null);
  const [filteredPatientsData, setFilteredPatientsData] = useState(null);
  const [showBody, setShowBody] = useState(false);

  const [medicalRecordData, setMedicalRecordData] = useState(null);
  const [medicalCheckupData, setMedicalCheckupData] = useState(null);

  const handleChildChange = (event) => {
    setChild(event.target.value);
  };

  const handleOpenRecord = async (id) => {
    let selected = medicalRecordData.filter((obj) => obj.id === id);
    navigate(`/naslovna/nalaz/${id}`, {
      state: {
        childData: childData,
        medicalRecordData: selected[0],
      },
    });
  };

  const handleOpenCheckup = async (id) => {
    let selected = medicalCheckupData.filter((obj) => obj.id === id);
    navigate(`/naslovna/pregled/${id}`, {
      state: {
        childData: childData,
        medicalCheckupData: selected[0],
      },
    });
  };

  useEffect(() => {
    const doMedicalAsync = async () => {
      try {
        if (child !== "Odaberi") {
          let childFound = patientsData.filter(
            (childObj) => childObj.oib !== child
          );
          if (childFound) setChildData(childFound[0]);
          setShowBody(true);
          let res = null;
          res = await axios
            .post("/api/children/getMedicalReportsByChildOib", {
              childOib: childFound[0].oib,
            })
            .then((response) => response.data);
          setMedicalRecordData(res);
          res = await axios
            .post("/api/children/getMedicalExamsByChildOib", {
              childOib: childFound[0].oib,
            })
            .then((response) => response.data);
          setMedicalCheckupData(res);
        } else {
          setShowBody(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    doMedicalAsync();
  }, [child, showBody, patientsData]);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        token: token,
      };

      try {
        let res = null;
        if (userData.role === "RODITELJ") {
          res = await axios
            .post("/api/children/getChildProfile", data)
            .then((response) => response.data);
          setPatientsData(res);
        } else {
          res = await axios
            .post("/api/children/getPatients", data)
            .then((response) => response.data);
          setPatientsData(res);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (patientsData) {
      const filteredData = patientsData.filter(
        (entry, index, self) =>
          self.findIndex((t) => t.oib === entry.oib) === index
      );
      setFilteredPatientsData(filteredData);
    }
  }, [patientsData]);

  return (
    <div className="schedule">
      <h2 className="schedule__title">
        {userData.role === "RODITELJ"
          ? "POPIS PREGLEDA / NALAZA"
          : "KARTONI PACIJENATA"}
      </h2>
      <hr className="schedule__hr" />
      <div className="newSchedule">
        <div className="schedule__wrapper schedule__setOneColumn">
          <div>
            <p className="schedule__labelLarge">
              {userData.role === "RODITELJ"
                ? "Odabir djeteta:"
                : "Odabir pacijenta:"}
              <em className="schedule__pRed"> *</em>
            </p>
            <select
              id="child"
              name="child"
              required={true}
              onChange={handleChildChange}
              defaultValue=""
              ref={childRef}
            >
              <option value="" disabled>
                Odaberi
              </option>
              {filteredPatientsData &&
                filteredPatientsData.map((child) =>
                  userData.role === "RODITELJ" ? (
                    <option key={child.oib} value={child.oib}>
                      {`${child.name} ${child.surname}`}
                    </option>
                  ) : (
                    <option key={child.oib} value={child.oib}>
                      {`${child.name} ${child.surname} (${child.oib})`}
                    </option>
                  )
                )}
            </select>
          </div>
        </div>
      </div>
      {showBody && (
        <>
          <h2 className="schedule__title">POVIJEST PREGLEDA</h2>
          <hr className="schedule__hr" />
          <div className="pendingSchedule">
            {medicalCheckupData ? (
              medicalCheckupData.length > 0 ? (
                medicalCheckupData.map((element) => (
                  <div className="appointment" key={element.id}>
                    <div className="appointment__verticalWrapper">
                      <p className="appointment__label">Proveden u:</p>
                      <p className="appointment__data">{element.dateOfTest}</p>
                    </div>
                    <div className="appointment__verticalWrapper">
                      <p className="appointment__label">
                        {element.pediatritionID.role ===
                        "LIJECNIK_OBITELJSKE_MEDICINE"
                          ? "Liječnik"
                          : element.pediatritionID.role
                              .charAt(0)
                              .toUpperCase() +
                            element.pediatritionID.role.slice(1).toLowerCase()}
                      </p>
                      <p className="appointment__data">
                        {`${element.pediatritionID.name} ${element.pediatritionID.surname} (${element.pediatritionID.oib})`}
                      </p>
                    </div>
                    <button
                      className="appointment__cancelButton"
                      onClick={() => handleOpenCheckup(element.id)}
                    >
                      Otvori
                    </button>
                  </div>
                ))
              ) : (
                <p className="error__text">Nema povijest pregleda</p>
              )
            ) : (
              <p className="error__text">Greška prilikom dohvata podataka</p>
            )}
          </div>

          <h2 className="schedule__title">POVIJEST NALAZA</h2>
          <hr className="schedule__hr" />
          <div className="pendingSchedule">
            {medicalRecordData ? (
              medicalRecordData.length > 0 ? (
                medicalRecordData.map((element) => (
                  <div className="appointment" key={element.id}>
                    <div className="appointment__verticalWrapper">
                      <p className="appointment__label">Prenesen u:</p>
                      <p className="appointment__data">{element.dateOfNotif}</p>
                    </div>
                    <div className="appointment__verticalWrapper">
                      <p className="appointment__label">
                        Povratna informacija:
                      </p>
                      <p className="appointment__data">
                        {element.additionalNote === "" ? "Da" : "Ne"}
                      </p>
                    </div>
                    <button
                      className="appointment__cancelButton"
                      onClick={() => handleOpenRecord(element.id)}
                    >
                      Otvori
                    </button>
                  </div>
                ))
              ) : (
                <p className="error__text">Nema povijest nalaza</p>
              )
            ) : (
              <p className="error__text">Greška prilikom dohvata podataka</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
