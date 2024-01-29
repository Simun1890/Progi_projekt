import React, { useState, useEffect, useRef } from "react";
import "../other-components/AccountInput.css";
import "./NewAppointment.css";
import "../other-components/Appointment.css";
import { useToken } from "../context/TokenProvider.js";
import axios from "axios";

export const NewAppointment = () => {
  const { token } = useToken();
  const [child, setChild] = useState("Odaberi");
  const [staff, setStaff] = useState("Odaberi");
  const [isScheduling, setIsScheduling] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isFeedback, setIsFeedback] = useState(false);
  const [file, setFile] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [errorState, setErrorState] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successState, setSuccessState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messageRef = useRef(null);

  const childRef = useRef(null);
  const staffRef = useRef(null);
  const isSchedulingRef = useRef(null);
  const isUploadingRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const isFeedbackRef = useRef(null);
  const fileRef = useRef(null);

  const [childData, setChildData] = useState(null);
  const [staffData, setStaffData] = useState(null);
  const [filteredStaffData, setFilteredStaffData] = useState(null);
  const [scheduledAppointmentsData, setScheduledAppointmentsData] =
    useState(null);
  const [
    filteredScheduledAppointmentsData,
    setFilteredScheduledAppointmentsData,
  ] = useState(null);
  const [waitingAppointmentsData, setWaitingAppointmentsData] = useState(null);
  const [filteredWaitingAppointments, setFilteredWaitingAppointments] =
    useState(null);

  const handleStaffChange = (event) => {
    setStaff(event.target.value);
  };

  const handleChildChange = (event) => {
    setChild(event.target.value);
  };

  useEffect(() => {
    if (staffData) {
      const filteredData = staffData.find(
        (entry) => entry.childID.oib === child
      );
      setFilteredStaffData(filteredData);
    }
  }, [child, staffData]);

  useEffect(() => {
    if (waitingAppointmentsData && childData) {
      const filteredData = waitingAppointmentsData.filter((entry) =>
        childData.some((child) => child.oib === entry.oibChild.oib)
      );
      setFilteredWaitingAppointments(filteredData);
    }
  }, [childData, waitingAppointmentsData]);

  useEffect(() => {
    if (scheduledAppointmentsData && childData) {
      const filteredData = scheduledAppointmentsData.filter((entry) =>
        childData.some((child) => child.oib === entry.oibChild.oib)
      );
      setFilteredScheduledAppointmentsData(filteredData);
    }
  }, [childData, scheduledAppointmentsData]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.textContent = errorMessage;
      messageRef.current.className = `account__submitError account__marginTop ${
        errorState ? "account__showError" : "account__hideError"
      }`;
    }
  }, [errorState, errorMessage]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.textContent = successMessage;
      messageRef.current.className = `account__submitSuccess account__marginTop ${
        successState ? "account__showSuccess" : "account__hideSuccess"
      }`;

      if (successState) {
        childRef.current.selectedIndex = 0;
        staffRef.current.selectedIndex = 0;
        isSchedulingRef.current.checked = false;
        isUploadingRef.current.checked = false;
        dateRef.current && (dateRef.current.value = "");
        timeRef.current && (timeRef.current.value = "");
        isFeedbackRef.current && (isFeedbackRef.current.checked = false);
        fileRef.current && (fileRef.current.value = "");
      }
    }
  }, [successState, successMessage]);

  const handleSchedulingChange = (event) => {
    setIsScheduling(event.target.checked);
  };

  const handleUploadingChange = (event) => {
    setIsUploading(event.target.checked);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFeedbackChange = (event) => {
    setIsFeedback(event.target.checked);
  };

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

  const handleSendScheduleClick = async () => {
    let tempDate = new Date(date);
    tempDate = `${tempDate.getDate()}.${
      tempDate.getMonth() + 1
    }.${tempDate.getFullYear()}.`;

    let newAppointment = {
      childOib: child,
      staffOib: staff,
      date: tempDate + " " + time,
    };

    tempDate = new Date();
    tempDate = `${tempDate.getDate()}.${
      tempDate.getMonth() + 1
    }.${tempDate.getFullYear()}.`;

    let finalFeedback = false;
    if (isFeedback === true) {
      finalFeedback = null;
    }

    let newMedicalRecord = {
      childOib: child,
      staffOib: staff,
      medicalReport: "Temp text for file",
      feedback: finalFeedback,
      additionalNote: null,
      date:
        tempDate +
        " " +
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
    };

    try {
      let res = null;
      if (isScheduling) {
        await axios.post("/api/other/postNewAppointment", newAppointment);
        res = await axios
          .post("/api/other/getWaitingAppointments", {
            token: token,
          })
          .then((response) => response.data);
        setWaitingAppointmentsData(res);
      }

      if (isUploading) {
        await axios.post("/api/other/postNewMedicalReport", newMedicalRecord);
      }

      setErrorState(false);
      setSuccessMessage("Uspješno poslano!");
      setSuccessState(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccessState(false);
      setIsScheduling(false);
      setIsUploading(false);
    } catch (error) {
      console.error(error);
      setSuccessState(false);
      setErrorState(true);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (staff !== "Odaberi" && child !== "Odaberi") {
      if (
        (isScheduling && date !== "" && time !== "" && !isUploading) ||
        (isUploading && file !== null && !isScheduling) ||
        (isScheduling &&
          isUploading &&
          date !== "" &&
          time !== "" &&
          file !== null)
      ) {
        setIsButtonEnabled(true);
      } else {
        setIsButtonEnabled(false);
      }
    } else {
      setIsButtonEnabled(false);
    }
  }, [isScheduling, isUploading, date, time, file, staff, child]);

  useEffect(() => {
    if (!isScheduling) {
      setDate("");
      setTime("");
    }
    if (!isUploading) {
      setFile(null);
      setIsFeedback(false);
    }
  }, [isScheduling, isUploading]);

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
          .post("/api/children/getMedicalStaff", data)
          .then((response) => response.data);
        setStaffData(res);

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
      <h2 className="schedule__title">NOVI TERMIN / PRIJENOS NALAZA</h2>
      <hr className="schedule__hr" />
      <div className="newSchedule">
        <div className="schedule__wrapper">
          <div>
            <p className="schedule__labelLarge">
              Odabir djeteta: <em className="schedule__pRed"> *</em>
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
              {childData &&
                childData.map((child) => (
                  <option key={child.oib} value={child.oib}>
                    {`${child.name} ${child.surname}`}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <p className="schedule__labelLarge">
              Odabir osoblja: <em className="schedule__pRed"> *</em>
            </p>
            <select
              id="staff"
              name="staff"
              required={true}
              onChange={handleStaffChange}
              defaultValue=""
              ref={staffRef}
            >
              <option value="" disabled>
                Odaberi
              </option>
              {filteredStaffData && filteredStaffData.doctorID.oib && (
                <option
                  key={filteredStaffData.doctorID.oib}
                  value={filteredStaffData.doctorID.oib}
                >
                  {`${filteredStaffData.doctorID.name} ${
                    filteredStaffData.doctorID.surname
                  } (${
                    filteredStaffData.doctorID.role ===
                    "LIJECNIK_OBITELJSKE_MEDICINE"
                      ? "liječnik"
                      : filteredStaffData.doctorID.role.toLowerCase()
                  })`}
                </option>
              )}
              {filteredStaffData && filteredStaffData.pediatritionID.oib && (
                <option
                  key={filteredStaffData.pediatritionID.oib}
                  value={filteredStaffData.pediatritionID.oib}
                >
                  {`${filteredStaffData.pediatritionID.name} ${
                    filteredStaffData.pediatritionID.surname
                  } (${filteredStaffData.pediatritionID.role.toLowerCase()})`}
                </option>
              )}
            </select>
          </div>
        </div>

        <div className="schedule__checkboxDiv">
          <div className="schedule__horizontalWrapper">
            <input
              type="checkbox"
              id="newSchedule"
              name="newSchedule"
              onChange={handleSchedulingChange}
              ref={isSchedulingRef}
            />
            <label htmlFor="newSchedule" className="schedule_checkboxLabel">
              Želim zakazati termin
            </label>
          </div>
          <div className="schedule__horizontalWrapper">
            <input
              type="checkbox"
              id="newUpload"
              name="newUpload"
              onChange={handleUploadingChange}
              ref={isUploadingRef}
            />
            <label htmlFor="newUpload" className="schedule_checkboxLabel">
              Želim prenijeti nalaz
            </label>
          </div>
        </div>

        {isScheduling && (
          <div className="schedule__verticalWrapper">
            <p className="schedule__labelLarge">Termin</p>
            <hr className="schedule__hr" />

            <div className="schedule__wrapper">
              <div className="schedule__verticalWrapper">
                <p className="schedule__label">
                  Datum: <em className="schedule__pRed"> *</em>
                </p>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  max={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 10)
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={handleDateChange}
                  ref={dateRef}
                />
              </div>
              <div className="schedule__verticalWrapper">
                <p className="schedule__label">
                  Vrijeme: <em className="schedule__pRed"> *</em>
                </p>
                <input
                  type="time"
                  step={60}
                  onChange={handleTimeChange}
                  ref={timeRef}
                />
              </div>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="schedule__verticalWrapper">
            <p className="schedule__labelLarge">Nalaz</p>
            <hr className="schedule__hr" />
            <p className="schedule__label">
              Prijenos nalaza: <em className="schedule__pRed"> *</em>
            </p>
            <input
              type="file"
              accept=".txt,.doc,.docx,.pdf"
              onChange={handleFileChange}
              ref={fileRef}
            />

            <div className="schedule__horizontalWrapper">
              <input
                type="checkbox"
                id="feedback"
                name="feedback"
                onChange={handleFeedbackChange}
                ref={isFeedbackRef}
              />
              <label htmlFor="feedback" className="schedule_checkboxLabel">
                Želim povratnu informaciju
              </label>
            </div>
          </div>
        )}
        {(isScheduling || isUploading) && (
          <>
            <button
              className="schedule__sendNewSchedule schedule__button"
              onClick={handleSendScheduleClick}
              disabled={!isButtonEnabled}
            >
              Pošalji
            </button>
            <div
              className="account__submitError account__marginTop"
              ref={messageRef}
            ></div>
          </>
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
                  <div className="appointment__label">
                    {element.pediatritionID.role ===
                    "LIJECNIK_OBITELJSKE_MEDICINE"
                      ? "Liječnik"
                      : element.pediatritionID.role.charAt(0).toUpperCase() +
                        element.pediatritionID.role.slice(1).toLowerCase()}
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
      <h2 className="schedule__title">TERMINI NA ČEKANJU</h2>
      <hr className="schedule__hr" />
      <div className="pendingSchedule">
        {filteredWaitingAppointments ? (
          filteredWaitingAppointments.length > 0 ? (
            filteredWaitingAppointments.map((element) => {
              return (
                <div className="appointment" key={element.id}>
                  <div className="appointment__verticalWrapper">
                    <p className="appointment__label">Zatražen u:</p>
                    <p className="appointment__data">{element.dateOfExam}</p>
                  </div>
                  <div className="appointment__verticalWrapper">
                    <div className="appointment__label">
                      {element.pediatritionID.role ===
                      "LIJECNIK_OBITELJSKE_MEDICINE"
                        ? "Liječnik"
                        : element.pediatritionID.role.charAt(0).toUpperCase() +
                          element.pediatritionID.role.slice(1).toLowerCase()}
                      :
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
                  <button
                    className="appointment__cancelButton"
                    onClick={() => handleDeleteAppointment(element.id)}
                  >
                    Izbriši
                  </button>
                </div>
              );
            })
          ) : (
            <p className="error__text">Nema termina na čekanju</p>
          )
        ) : (
          <p className="error__text">Greška prilikom dohvata podataka</p>
        )}
      </div>
    </div>
  );
};
