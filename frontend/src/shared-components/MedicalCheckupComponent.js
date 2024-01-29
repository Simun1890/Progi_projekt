import React, { useEffect, useState } from "react";
import { Navbar } from "../navigation-components/Navbar";
import { useLocation } from "react-router-dom";
import "../parent-components/NewAppointment.css";
import "../other-components/Appointment.css";

export const MedicalCheckupComponent = () => {
  const location = useLocation();

  const [childData, setChildData] = useState(null);
  const [medicalCheckupData, setMedicalCheckupData] = useState(null);

  useEffect(() => {
    setChildData(location.state?.childData);
    setMedicalCheckupData(location.state?.medicalCheckupData);
  }, [location]);

  const downloadExcuseLetterFile = () => {
    const textContent = `Učeni${childData.sex === "Muško" ? "k" : "ca"} ${
      childData.name
    } ${childData.surname} (${childData.oib}) bolova${
      childData.sex === "Muško" ? "o" : "la"
    } je od "${medicalCheckupData.medCert.reason}" te zbog toga nije mog${
      childData.sex === "Muško" ? "ao" : "la"
    } dolaziti u vrtić/školu od ${medicalCheckupData.medCert.dateOfCert} - ${
      medicalCheckupData.medCert.endDate
    }\nDatum: ${medicalCheckupData.dateOfTest}\n${
      medicalCheckupData.pediatritionID.role === "LIJECNIK_OBITELJSKE_MEDICINE"
        ? "Liječnik"
        : medicalCheckupData.pediatritionID.role.charAt(0).toUpperCase() +
          medicalCheckupData.pediatritionID.role.slice(1).toLowerCase()
    }: ${medicalCheckupData.pediatritionID.name} ${
      medicalCheckupData.pediatritionID.surname
    }`;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ispricnica.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const downloadSickLeaveFile = () => {
    const textContent = `Dijete ${childData.name} ${childData.surname} (${
      childData.oib
    }), rođeno ${childData.dateOfBirth}, dijagnosticirano je s "${
      medicalCheckupData.medCert.reason
    }".\nPreporučujemo odsustvo jednog od roditelja od ${
      medicalCheckupData.medCert.dateOfCert
    } do ${
      medicalCheckupData.medCert.endDate
    }. kako bi pružio/la potrebnu podršku i brigu.\n\nDatum: ${
      medicalCheckupData.dateOfTest
    }\n${
      medicalCheckupData.pediatritionID.role === "LIJECNIK_OBITELJSKE_MEDICINE"
        ? "Liječnik"
        : medicalCheckupData.pediatritionID.role.charAt(0).toUpperCase() +
          medicalCheckupData.pediatritionID.role.slice(1).toLowerCase()
    }: ${medicalCheckupData.pediatritionID.name} ${
      medicalCheckupData.pediatritionID.surname
    }`;
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "preporukaBolovanja.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!medicalCheckupData) {
    return (
      <>
        <Navbar />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <h2 className="newAppointmentOutcome__title">
          PREGLED, {medicalCheckupData.dateOfTest}
        </h2>
        <hr className="newAppointmentOutcome__hrTitle" />
        <div className="newAppointmentOutcome">
          <div className="newAppointmentOutcome__personal ignorePadding">
            <h2 className="newAppointmentOutcome__labelLarge ">
              Osobni podaci pacijenta
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
          <div className="newAppointmentOutcome__personal">
            <h2 className="newAppointmentOutcome__labelLarge">
              Podaci medicinskog osoblja:
            </h2>
            <hr className="newAppointmentOutcome__hr" />
            {medicalCheckupData && (
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
                      Uloga:
                    </p>
                  </div>
                  <div className="newAppointmentOutcome__verticaWrapper">
                    <p className="newAppointmentOutcome__labelPersonalGray">
                      {medicalCheckupData.pediatritionID.name}{" "}
                      {medicalCheckupData.pediatritionID.surname}
                    </p>
                    <p className="newAppointmentOutcome__labelPersonalGray">
                      {medicalCheckupData.pediatritionID.oib}
                    </p>
                    <p className="newAppointmentOutcome__labelPersonalGray">
                      {medicalCheckupData.pediatritionID.role ===
                      "LIJECNIK_OBITELJSKE_MEDICINE"
                        ? "liječnik"
                        : medicalCheckupData.pediatritionID.role.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="newAppointmentOutcome__symptoms">
            <h2 className="newAppointmentOutcome__labelLarge">Simptomi</h2>
            <hr className="newAppointmentOutcome__hr" />
            {medicalCheckupData.symptomsDescription && (
              <div>
                <p className="newAppointmentOutcome__label">Opis simptoma:</p>
                <div className="newAppointmentOutcome__certificateDiv">
                  <p>{medicalCheckupData.symptomsDescription}</p>
                </div>
              </div>
            )}

            {medicalCheckupData.symptomsDuration && (
              <div>
                <p className="newAppointmentOutcome__label">
                  Trajanje simptoma:
                </p>
                <div className="newAppointmentOutcome__certificateDiv">
                  <p>{medicalCheckupData.symptomsDuration}</p>
                </div>
              </div>
            )}
          </div>

          {medicalCheckupData.physicalExamDescription && (
            <div className="newAppointmentOutcome__physicalExam">
              <h2 className="newAppointmentOutcome__labelLarge">
                Fizički pregled
              </h2>
              <hr className="newAppointmentOutcome__hr" />
              <div>
                <p className="newAppointmentOutcome__label">Opis pregleda:</p>
                <div className="newAppointmentOutcome__certificateDiv">
                  <p>{medicalCheckupData.physicalExamDescription}</p>
                </div>
              </div>
            </div>
          )}

          <div className="newAppointmentOutcome__diagnosis">
            <h2 className="newAppointmentOutcome__labelLarge">Dijagnoza</h2>
            <hr className="newAppointmentOutcome__hr" />
            <div>
              {medicalCheckupData.diagnosisDescription && (
                <div>
                  <p className="newAppointmentOutcome__label">
                    Opis dijagnoze:
                  </p>
                  <div className="newAppointmentOutcome__certificateDiv">
                    <p>{medicalCheckupData.diagnosisDescription}</p>
                  </div>
                </div>
              )}
              {medicalCheckupData.diagnosisMedication && (
                <div>
                  <p className="newAppointmentOutcome__label">
                    Propisani lijekovi i doze:
                  </p>
                  <div className="newAppointmentOutcome__certificateDiv">
                    <p>{medicalCheckupData.diagnosisMedication}</p>
                  </div>
                </div>
              )}
              {medicalCheckupData.diagnosisTreatment && (
                <div>
                  <p className="newAppointmentOutcome__label">
                    Preporuke za daljnje liječenje:
                  </p>
                  <div className="newAppointmentOutcome__certificateDiv">
                    <p>{medicalCheckupData.diagnosisTreatment}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {medicalCheckupData.medCert.reason !== "" &&
            medicalCheckupData.medCert.endDate !== "" &&
            medicalCheckupData.medCert.dateOfCert !== "" && (
              <div className="newAppointmentOutcome__childCertificate">
                <h2 className="newAppointmentOutcome__labelLarge">
                  Ispričnica
                </h2>
                <hr className="newAppointmentOutcome__hr" />
                <div>
                  <p className="newAppointmentOutcome__label">
                    Prikaz ispričnice:
                  </p>
                  <div className="newAppointmentOutcome__certificateDiv">
                    <p>
                      Učeni{childData.sex === "Muško" ? "k" : "ca"}{" "}
                      {childData.name} {childData.surname} ({childData.oib})
                      bolova
                      {childData.sex === "Muško" ? "o" : "la"} je od{' "'}
                      {medicalCheckupData.medCert.reason}" te zbog toga nije mog
                      {childData.sex === "Muško" ? "ao" : "la"} dolaziti u
                      vrtić/školu od {medicalCheckupData.medCert.dateOfCert} -{" "}
                      {medicalCheckupData.medCert.endDate}
                    </p>
                    <p>Datum: {medicalCheckupData.dateOfTest}</p>
                    <p>
                      {medicalCheckupData.pediatritionID.role ===
                      "LIJECNIK_OBITELJSKE_MEDICINE"
                        ? "Liječnik"
                        : medicalCheckupData.pediatritionID.role
                            .charAt(0)
                            .toUpperCase() +
                          medicalCheckupData.pediatritionID.role
                            .slice(1)
                            .toLowerCase()}
                      : {medicalCheckupData.pediatritionID.name}{" "}
                      {medicalCheckupData.pediatritionID.surname}
                    </p>
                  </div>
                </div>
                <button
                  onClick={downloadExcuseLetterFile}
                  className="appointment__cancelButton appointment__width40 appointment__marginButton"
                >
                  Preuzmi
                </button>
              </div>
            )}

          {medicalCheckupData.medCert.reason !== "" &&
            medicalCheckupData.medCert.endDate !== "" &&
            medicalCheckupData.medCert.dateOfCert !== "" &&
            medicalCheckupData.sickLeaveLetter && (
              <div className="newAppointmentOutcome__parentCertificate">
                <h2 className="newAppointmentOutcome__labelLarge">
                  Preporuka za bolovanje
                </h2>
                <hr className="newAppointmentOutcome__hr" />
                <div>
                  <p className="newAppointmentOutcome__label">
                    Prikaz preporuke:
                  </p>
                  <div className="newAppointmentOutcome__certificateDiv">
                    <p>
                      Dijete {childData.name} {childData.surname} (
                      {childData.oib}
                      ), rođeno {childData.dateOfBirth}, dijagnosticirano je s
                      {' "'}
                      {medicalCheckupData.medCert.reason}". Preporučujemo
                      odsustvo jednog od roditelja od{" "}
                      {medicalCheckupData.medCert.dateOfCert} do{" "}
                      {medicalCheckupData.medCert.endDate}. kako bi pružio/la
                      potrebnu podršku i brigu.
                    </p>
                    <p>Datum: {medicalCheckupData.dateOfTest}</p>
                    <p>
                      {medicalCheckupData.pediatritionID.role ===
                      "LIJECNIK_OBITELJSKE_MEDICINE"
                        ? "Liječnik"
                        : medicalCheckupData.pediatritionID.role
                            .charAt(0)
                            .toUpperCase() +
                          medicalCheckupData.pediatritionID.role
                            .slice(1)
                            .toLowerCase()}
                      : {medicalCheckupData.pediatritionID.name}{" "}
                      {medicalCheckupData.pediatritionID.surname}
                    </p>
                  </div>
                </div>
                <button
                  onClick={downloadSickLeaveFile}
                  className="appointment__cancelButton appointment__width40 appointment__marginButton"
                >
                  Preuzmi
                </button>
              </div>
            )}
        </div>
      </div>
    </>
  );
};
