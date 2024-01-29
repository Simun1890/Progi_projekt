import React, { useState, useEffect, useRef } from "react";
import { useToken } from "../context/TokenProvider.js";
import axios from "axios";
import "./NewAppointmentOutcome.css";
import { useUserData } from "../context/UserDataProvider.js";

export const NewAppointmentOutcome = () => {
  const [appointment, setAppointment] = useState("Odaberi");
  const [showBody, setShowBody] = useState(false);
  const [symptomDesc, setSymptomDesc] = useState("");
  const [symptomDuration, setSymptomDuration] = useState("");
  const [pysicalDesc, setPysicalDesc] = useState("");
  const [diagnosisDesc, setDiagnosisDesc] = useState("");
  const [diagnosisCure, setDiagnosisCure] = useState("");
  const [diagnosisNext, setDiagnosisNext] = useState("");
  const [showChildCertificate, setShowChildCertificate] = useState(false);
  const [showParentCertificate, setShowParentCertificate] = useState(false);
  const [disease, setDisease] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [scheduledAppointmentsData, setScheduledAppointmentsData] =
    useState(null);
  const [
    filteredScheduledAppointmentsData,
    setFilteredScheduledAppointmentsData,
  ] = useState(null);
  const [childData, setChildData] = useState(null);
  const { userData } = useUserData();
  const { token } = useToken();

  const appointmentRef = useRef(null);
  const symptomDescRef = useRef(null);
  const symptomDurationRef = useRef(null);
  const pysicalDescRef = useRef(null);
  const diagnosisDescRef = useRef(null);
  const diagnosisCureRef = useRef(null);
  const diagnosisNextRef = useRef(null);
  const showChildCertificateRef = useRef(null);
  const showParentCertificateRef = useRef(null);
  const diseaseRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const [errorState, setErrorState] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successState, setSuccessState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messageRef = useRef(null);

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
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scheduledAppointmentsData && userData) {
      const filteredData = scheduledAppointmentsData.filter(
        (entry) => userData.oib === entry.pediatritionID.oib
      );
      setFilteredScheduledAppointmentsData(filteredData);
    }
  }, [scheduledAppointmentsData, userData]);

  useEffect(() => {
    if (
      appointment !== "Odaberi" &&
      symptomDesc &&
      symptomDuration &&
      diagnosisDesc
    ) {
      if (
        !showChildCertificate ||
        (showChildCertificate && disease && startDate && endDate)
      ) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    } else {
      setIsButtonDisabled(true);
    }
  }, [
    appointment,
    symptomDesc,
    symptomDuration,
    diagnosisDesc,
    showChildCertificate,
    disease,
    startDate,
    endDate,
  ]);

  const handleAppointmentChange = (event) => {
    setAppointment(event.target.value);
  };

  useEffect(() => {
    const getChildData = async () => {
      try {
        let targettedChild = filteredScheduledAppointmentsData.filter(
          (appointmentData) =>
            parseInt(appointmentData.id) === parseInt(appointment)
        );
        targettedChild = targettedChild[0].oibChild.oib;

        let res = await axios
          .post("/api/children/getChildProfileByOib", {
            oib: targettedChild,
          })
          .then((response) => response.data);
        setChildData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (appointment !== "Odaberi") {
      getChildData();
    }
  }, [appointment, filteredScheduledAppointmentsData]);

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
      }
    }
  }, [successState, successMessage]);

  const handleSendMedicalCheckClick = async () => {
    let selectedAppointment = scheduledAppointmentsData.filter(
      (appointmentObj) => parseInt(appointmentObj.id) === parseInt(appointment)
    );

    try {
      let doctorOib = await axios
        .post("/api/children/getDoctorProfileByChildOib", {
          childOib: childData.oib,
        })
        .then((response) => response.data);

      let parentCertificateFinal = false;
      if (showParentCertificate && userData.role !== "LIJEČNIK") {
        parentCertificateFinal = null;
      }

      let startDateFinal = "";
      let endDateFinal = "";

      if (startDate) {
        startDateFinal =
          new Date(startDate).toLocaleDateString("en-GB").replace(/\//g, ".") +
          ".";
      }

      if (endDate) {
        endDateFinal =
          new Date(endDate).toLocaleDateString("en-GB").replace(/\//g, ".") +
          ".";
      }

      await axios.post("/api/other/postNewMedicalExam", {
        childOib: childData.oib,
        staffOib: userData.oib,
        symptomsDescription: symptomDesc,
        symptomsDuration: symptomDuration,
        physicalExamDescription: pysicalDesc,
        diagnosisDescription: diagnosisDesc,
        diagnosisMedication: diagnosisCure,
        diagnosisTreatment: diagnosisNext,
        date: selectedAppointment[0].dateOfExam,
        isExcuseLetterGiven: showChildCertificate,
        diagnosisName: disease,
        startDate: startDateFinal,
        endDate: endDateFinal,
        isSickLeaveGiven: parentCertificateFinal,
        childDoctorOib: doctorOib.oib,
      });

      let data = {
        token: token,
        id: parseInt(appointment),
      };

      await axios.post("/api/other/postCancelAppointment", data);

      setScheduledAppointmentsData((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => parseInt(appointment.id) !== parseInt(appointment)
        )
      );

      setErrorState(false);
      setSuccessMessage("Uspješno poslano!");
      setSuccessState(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAppointment("");
      setShowChildCertificate(false);
      setShowParentCertificate(false);
      appointmentRef.current.selectedIndex = 0;
      setAppointment("Odaberi");
      setSuccessState(false);
    } catch (error) {
      console.error(error);
      setSuccessState(false);
      setErrorState(true);
      setErrorMessage(error.message);
    }
  };

  const handleSymptomDescChange = (event) => {
    setSymptomDesc(event.target.value);
  };

  const handleSymptomDurationChange = (event) => {
    setSymptomDuration(event.target.value);
  };

  const handlePysicalDescChange = (event) => {
    setPysicalDesc(event.target.value);
  };

  const handleDiagnosisDescChange = (event) => {
    setDiagnosisDesc(event.target.value);
  };

  const handleDiagnosisCureChange = (event) => {
    setDiagnosisCure(event.target.value);
  };

  const handleDiagnosisNextChange = (event) => {
    setDiagnosisNext(event.target.value);
  };

  const handleShowChildCertificateChange = (event) => {
    setShowChildCertificate(event.target.checked);
  };

  const handleShowParentCertificateChange = (event) => {
    setShowParentCertificate(event.target.checked);
  };

  const handleDiseaseChange = (event) => {
    setDisease(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    if (appointment !== "Odaberi") {
      setShowBody(true);
    } else {
      setShowBody(false);
    }
  }, [appointment]);

  useEffect(() => {
    if (!showChildCertificate) {
      setDisease("");
      setEndDate("");
      setStartDate("");
    }
  }, [showChildCertificate]);

  return (
    <div className="wrapper">
      <h2 className="newAppointmentOutcome__title">NOVI PREGLED</h2>
      <hr className="newAppointmentOutcome__hrTitle" />
      <div className="newAppointmentOutcome">
        <div className="newAppointmentOutcome__selection">
          <div>
            <p className="newAppointmentOutcome__labelLarge">
              Odabir trenutnog termina:
              <em className="newAppointmentOutcome__pRed"> *</em>
            </p>
            <select
              id="appointment"
              name="appointment"
              required={true}
              onChange={handleAppointmentChange}
              defaultValue=""
              ref={appointmentRef}
            >
              <option value="" disabled>
                Odaberi
              </option>
              {filteredScheduledAppointmentsData &&
                filteredScheduledAppointmentsData.map((appointment) => (
                  <option key={appointment.id} value={appointment.id}>
                    {` ${appointment.dateOfExam}, ${appointment.oibChild.name} ${appointment.oibChild.surname} (${appointment.oibChild.oib})`}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {showBody && (
          <>
            <div className="newAppointmentOutcome__personal">
              <h2 className="newAppointmentOutcome__labelLarge">
                Osobni podaci
              </h2>
              <hr className="newAppointmentOutcome__hr" />
              {childData && (
                <div className="newAppointmentOutcome__personal__div">
                  <div className="newAppointmentOutcome__horizontalWrapper">
                    <div className="newAppointmentOutcome__verticaWrapper">
                      <p className="newAppointmentOutcome__labelPersonalDark">
                        Ime i prezime:
                      </p>
                      <p className="newAppointmentOutcome__labelPersonalDark">
                        OIB:
                      </p>
                      <p className="newAppointmentOutcome__labelPersonalDark">
                        Spol:
                      </p>
                      <p className="newAppointmentOutcome__labelPersonalDark">
                        Datum rođenja:
                      </p>
                    </div>
                    <div className="newAppointmentOutcome__verticaWrapper">
                      <p className="newAppointmentOutcome__labelPersonalGray">
                        {childData.name} {childData.surname}
                      </p>
                      <p className="newAppointmentOutcome__labelPersonalGray">
                        {childData.oib}
                      </p>
                      <p className="newAppointmentOutcome__labelPersonalGray">
                        {childData.sex}
                      </p>
                      <p className="newAppointmentOutcome__labelPersonalGray">
                        {childData.dateOfBirth}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="newAppointmentOutcome__symptoms">
              <h2 className="newAppointmentOutcome__labelLarge">Simptomi</h2>
              <hr className="newAppointmentOutcome__hr" />
              <div>
                <p className="newAppointmentOutcome__label">
                  Opis simptoma:
                  <em className="newAppointmentOutcome__pRed"> *</em>
                </p>
                <textarea
                  rows="5"
                  placeholder="Unesite simptome..."
                  onChange={handleSymptomDescChange}
                  ref={symptomDescRef}
                ></textarea>
              </div>
              <div>
                <p className="newAppointmentOutcome__label">
                  Trajanje simptoma:
                  <em className="newAppointmentOutcome__pRed"> *</em>
                </p>
                <textarea
                  rows="2"
                  placeholder="Unesite trajanje..."
                  onChange={handleSymptomDurationChange}
                  ref={symptomDurationRef}
                ></textarea>
              </div>
            </div>

            <div className="newAppointmentOutcome__physicalExam">
              <h2 className="newAppointmentOutcome__labelLarge">
                Fizički pregled
              </h2>
              <hr className="newAppointmentOutcome__hr" />
              <div>
                <p className="newAppointmentOutcome__label">Opis pregleda:</p>
                <textarea
                  rows="5"
                  placeholder="Unesite opis pregleda..."
                  onChange={handlePysicalDescChange}
                  ref={pysicalDescRef}
                ></textarea>
              </div>
            </div>

            <div className="newAppointmentOutcome__diagnosis">
              <h2 className="newAppointmentOutcome__labelLarge">Dijagnoza</h2>
              <hr className="newAppointmentOutcome__hr" />
              <div>
                <p className="newAppointmentOutcome__label">
                  Opis dijagnoze:
                  <em className="newAppointmentOutcome__pRed"> *</em>
                </p>
                <textarea
                  rows="5"
                  placeholder="Unesite dijagnozu..."
                  onChange={handleDiagnosisDescChange}
                  ref={diagnosisDescRef}
                ></textarea>
                <p className="newAppointmentOutcome__label">
                  Propisani lijekovi i doze:
                </p>
                <textarea
                  rows="5"
                  placeholder="Unesite lijekove i doze..."
                  onChange={handleDiagnosisCureChange}
                  ref={diagnosisCureRef}
                ></textarea>
                <p className="newAppointmentOutcome__label">
                  Preporuke za daljnje liječenje:
                </p>
                <textarea
                  rows="5"
                  placeholder="Unesite preporuke..."
                  onChange={handleDiagnosisNextChange}
                  ref={diagnosisNextRef}
                ></textarea>
              </div>
            </div>

            <div className="newAppointmentOutcome__additional">
              <h2 className="newAppointmentOutcome__labelLarge">Dodatno</h2>
              <hr className="newAppointmentOutcome__hr" />
              <div className="newAppointmentOutcome__checkboxDiv">
                <div className="newAppointmentOutcome__horizontalWrapper">
                  <input
                    type="checkbox"
                    id="childCertificate"
                    name="childCertificate"
                    onChange={handleShowChildCertificateChange}
                    ref={showChildCertificateRef}
                  />
                  <label
                    htmlFor="childCertificate"
                    className="newAppointmentOutcome__checkboxLabel"
                  >
                    Izdaj ispričnicu
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        {showChildCertificate && (
          <div className="newAppointmentOutcome__childCertificate">
            <h2 className="newAppointmentOutcome__labelLarge">Ispričnica</h2>
            <hr className="newAppointmentOutcome__hr" />
            <div>
              <p className="newAppointmentOutcome__label">
                Boluje od:
                <em className="newAppointmentOutcome__pRed"> *</em>
              </p>
              <textarea
                rows="2"
                placeholder="Unesite bolest..."
                onChange={handleDiseaseChange}
                ref={diseaseRef}
              ></textarea>
              <p className="newAppointmentOutcome__label">
                Datum početka:
                <em className="newAppointmentOutcome__pRed"> *</em>
              </p>
              <input
                type="date"
                onChange={handleStartDateChange}
                ref={startDateRef}
              />
              <p className="newAppointmentOutcome__label">
                Datum kraja:
                <em className="newAppointmentOutcome__pRed"> *</em>
              </p>
              <input
                type="date"
                onChange={handleEndDateChange}
                ref={endDateRef}
              />
              <p className="newAppointmentOutcome__label">Prikaz ispričnice:</p>
              <div className="newAppointmentOutcome__certificateDiv">
                <p>
                  Učeni{childData.sex === "Muško" ? "k" : "ca"} {childData.name}{" "}
                  {childData.surname} ({childData.oib}) bolova
                  {childData.sex === "Muško" ? "o" : "la"} je od{" "}
                  {disease === "" ? "_____" : disease} te zbog toga nije mog
                  {childData.sex === "Muško" ? "ao" : "la"} dolaziti u
                  vrtić/školu od{" "}
                  {startDate === ""
                    ? "_____"
                    : new Intl.DateTimeFormat("en-GB")
                        .format(new Date(startDate))
                        .replace(/\//g, ".")}
                  . do{" "}
                  {endDate === ""
                    ? "_____"
                    : new Intl.DateTimeFormat("en-GB")
                        .format(new Date(endDate))
                        .replace(/\//g, ".")}
                  .
                </p>
                <p>
                  Datum:{" "}
                  {`${new Date().getDate()}.${
                    new Date().getMonth() + 1
                  }.${new Date().getFullYear()}.`}
                </p>
                <p>
                  {userData.role.charAt(0).toUpperCase() +
                    userData.role.slice(1).toLowerCase()}
                  : {userData.name} {userData.surname}
                </p>
              </div>
              <div className="newAppointmentOutcome__horizontalWrapper">
                <input
                  type="checkbox"
                  id="parentCertificate"
                  name="parentCertificate"
                  onChange={handleShowParentCertificateChange}
                  ref={showParentCertificateRef}
                />
                <label
                  htmlFor="parentCertificate"
                  className="newAppointmentOutcome__checkboxLabel"
                >
                  Izdaj preporuku za bolovanje
                </label>
              </div>
            </div>
          </div>
        )}

        {showChildCertificate && showParentCertificate && (
          <div className="newAppointmentOutcome__parentCertificate">
            <h2 className="newAppointmentOutcome__labelLarge">
              Preporuka za bolovanje
            </h2>
            <hr className="newAppointmentOutcome__hr" />
            <div>
              <p className="newAppointmentOutcome__label">Prikaz preporuke:</p>
              <div className="newAppointmentOutcome__certificateDiv">
                <p>
                  Dijete {childData.name} {childData.surname} ({childData.oib}),
                  rođeno {childData.dateOfBirth}, dijagnosticirano je s{" "}
                  {disease === "" ? "_____" : disease}. Preporučujemo odsustvo
                  jednog od roditelja od{" "}
                  {startDate === ""
                    ? "_____"
                    : new Intl.DateTimeFormat("en-GB")
                        .format(new Date(startDate))
                        .replace(/\//g, ".")}
                  . do{" "}
                  {endDate === ""
                    ? "_____"
                    : new Intl.DateTimeFormat("en-GB")
                        .format(new Date(endDate))
                        .replace(/\//g, ".")}
                  . kako bi pružio/la potrebnu podršku i brigu.
                </p>
                <p>
                  Datum:{" "}
                  {`${new Date().getDate()}.${
                    new Date().getMonth() + 1
                  }.${new Date().getFullYear()}.`}
                </p>
                <p>
                  {userData.role.charAt(0).toUpperCase() +
                    userData.role.slice(1).toLowerCase()}
                  : {userData.name} {userData.surname}
                </p>
              </div>
            </div>
          </div>
        )}

        {showBody && (
          <button
            className="newAppointmentOutcome__button"
            onClick={handleSendMedicalCheckClick}
            disabled={isButtonDisabled}
          >
            Pohrani
          </button>
        )}
        <div
          className="account__submitError account__marginTop"
          ref={messageRef}
        ></div>
      </div>
    </div>
  );
};
