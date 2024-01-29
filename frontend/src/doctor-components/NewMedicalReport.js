import React, { useState, useEffect, useRef } from "react";
import "../parent-components/NewAppointment.css";
import "../other-components/Appointment.css";
import { useToken } from "../context/TokenProvider.js";
import axios from "axios";
import { useUserData } from "../context/UserDataProvider.js";

export const NewMedicalReport = () => {
  const { token } = useToken();
  const { userData } = useUserData();

  const [child, setChild] = useState("Odaberi");
  const [file, setFile] = useState(null);
  const [uploadText, setUploadText] = useState("");
  const [uploadText2, setUploadText2] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isButtonEnabled2, setIsButtonEnabled2] = useState(false);

  const childRef = useRef(null);
  const uploadTextRef = useRef(null);
  const uploadTextRef2 = useRef(null);
  const fileRef = useRef(null);

  const [errorState, setErrorState] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successState, setSuccessState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messageRef = useRef(null);

  const [patientData, setPatientData] = useState(null);
  const [waitingAppointmentsData, setWaitingAppointmentsData] = useState(null);
  const [filteredPatientData, setFilteredPatientData] = useState(null);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleMoreButtonClick = (appointmentId) => {
    setSelectedAppointment((prevSelected) =>
      prevSelected === appointmentId ? null : appointmentId
    );
    setUploadText2("");
  };

  const isAdditionalContentVisible = (appointmentId) =>
    selectedAppointment === appointmentId;

  const handleChildChange = (event) => {
    setChild(event.target.value);
  };

  const handleUploadTextChange = (event) => {
    setUploadText(event.target.value);
  };

  const handleUploadTextChange2 = (event) => {
    setUploadText2(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (child !== "Odaberi" && file !== null) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [file, child]);

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
    }

    if (successState) {
      childRef.current.selectedIndex = 0;
      uploadTextRef.current && (uploadTextRef.current.value = "");
      fileRef.current && (fileRef.current.value = "");
    }
  }, [successState, successMessage]);

  useEffect(() => {
    if (uploadText2 !== "") {
      setIsButtonEnabled2(true);
    } else {
      setIsButtonEnabled2(false);
    }
  }, [isButtonEnabled2, uploadText2]);

  const handleSendScheduleClick = async () => {
    let tempDate = new Date();
    tempDate = `${tempDate.getDate()}.${
      tempDate.getMonth() + 1
    }.${tempDate.getFullYear()}.`;
    let tempTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());

    try {
      await axios.post("/api/other/postNewMedicalReport", {
        childOib: child,
        date: (tempDate + " " + tempTime).toString(),
        staffOib: userData.oib,
        medicalReport: "temp text for file",
        feedback: false,
        additionalNote: uploadText,
      });

      setErrorState(false);
      setSuccessMessage("Uspješno poslano!");
      setSuccessState(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setChild("Odaberi");
      setSuccessState(false);
    } catch (error) {
      console.error(error);
      setSuccessState(false);
      setErrorState(true);
      setErrorMessage(error.message);
    }
  };

  const handleSendMedicalReply = async (id) => {
    try {
      await axios
        .post("/api/other/postMedicalReportReply", {
          id: id,
          additionalNote: uploadText2,
        })
        .then(() => {
          setWaitingAppointmentsData((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.id !== id)
          );
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadFile = (file) => {
    const blob = new Blob([file.content], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        token: token,
      };

      try {
        let res = null;
        res = await axios
          .post("/api/children/getPatients", data)
          .then((response) => response.data);
        setPatientData(res);

        res = await axios
          .post("/api/other/getWaitingMedicalReports", data)
          .then((response) => response.data);
        setWaitingAppointmentsData(res);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (patientData) {
      const filteredData = patientData.filter(
        (entry, index, self) =>
          self.findIndex((t) => t.oib === entry.oib) === index
      );
      setFilteredPatientData(filteredData);
    }
  }, [patientData]);

  return (
    <div className="schedule">
      <h2 className="schedule__title">NOVI PRIJENOS NALAZA</h2>
      <hr className="schedule__hr" />
      <div className="newSchedule">
        <div className="schedule__verticalWrapper schedule__marginNone">
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
              {filteredPatientData &&
                filteredPatientData.map((patient) => (
                  <option key={patient.oib} value={patient.oib}>
                    {`${patient.name} ${patient.surname} (${patient.oib})`}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {child !== "Odaberi" && (
          <>
            <div className="schedule__verticalWrapper ">
              <p className="schedule__labelLarge">Nalaz</p>
              <hr className="schedule__hr" />
              <p className="schedule__label">
                Prijenos nalaza: <em className="schedule__pRed"> *</em>
              </p>
              <input
                type="file"
                accept=".txt,.doc,.docx,.pdf"
                onChange={handleFileChange}
                className="schedule__paddingBottomNone"
                ref={fileRef}
              />

              <div className="schedule__textAreaDiv">
                <p className="schedule__label">Dodatna napomena:</p>
                <textarea
                  rows="5"
                  placeholder="Unesite dodatne napomene..."
                  onChange={handleUploadTextChange}
                  ref={uploadTextRef}
                ></textarea>
              </div>
            </div>
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

      <h2 className="schedule__title">NALAZI NA ČEKANJU</h2>
      <hr className="schedule__hr" />
      <div className="pendingSchedule">
        {waitingAppointmentsData ? (
          waitingAppointmentsData.length > 0 ? (
            waitingAppointmentsData.map((appointment) => (
              <div className="appointment" key={appointment.id}>
                <div className="appointment__verticalWrapper">
                  <div className="appointment__horizontalWrapper appointment__horizontalWrapperForceGap">
                    <div className="appointment__verticalWrapper">
                      <p className="appointment__label">Poslan u:</p>
                      <p className="appointment__data">
                        {appointment.dateOfNotif}
                      </p>
                    </div>
                    <div className="appointment__verticalWrapper">
                      <div className="appointment__label">Pacijent:</div>
                      <p className="appointment__data">
                        {appointment.childOib.name}{" "}
                        {appointment.childOib.surname} (
                        {appointment.childOib.oib})
                      </p>
                    </div>
                    <button
                      className="appointment__cancelButton"
                      onClick={() => handleMoreButtonClick(appointment.id)}
                    >
                      {isAdditionalContentVisible(appointment.id)
                        ? "Manje"
                        : "Više"}
                    </button>
                  </div>
                  <div className="appointment__verticalWrapper">
                    {selectedAppointment === appointment.id && (
                      <>
                        <div className="schedule__verticalWrapper appointment__paddingTop appointment__alignCenter">
                          <p className="schedule__labelLarge">
                            Pošalji odgovor
                          </p>
                          <hr className="schedule__hr" />
                          <p className="schedule__label">Preuzmi nalaz:</p>
                          <button
                            className="appointment__cancelButton"
                            onClick={() =>
                              handleDownloadFile(appointment.textOfNotif)
                            }
                          >
                            Preuzmi
                          </button>

                          <div className="schedule__textAreaDiv">
                            <p className="schedule__label">
                              Povratna informacija:
                            </p>
                            <textarea
                              rows="5"
                              placeholder="Unesite povratnu informaciju..."
                              onChange={handleUploadTextChange2}
                              ref={uploadTextRef2}
                            ></textarea>
                          </div>
                        </div>
                        <button
                          className="appointment__acceptButton appointment__width100"
                          onClick={() => handleSendMedicalReply(appointment.id)}
                          disabled={!isButtonEnabled2}
                        >
                          Pošalji
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="error__text">Nema nalaza na čekanju</p>
          )
        ) : (
          <p className="error__text">Greška prilikom dohvata podataka</p>
        )}
      </div>
    </div>
  );
};
