import React, { useEffect, useState } from "react";
import { Navbar } from "../navigation-components/Navbar";
import { useLocation } from "react-router-dom";

export const MedicalReportComponent = () => {
  const location = useLocation();

  const [childData, setChildData] = useState(null);
  const [medicalRecordData, setMedicalRecordData] = useState(null);

  useEffect(() => {
    setChildData(location.state?.childData);
    setMedicalRecordData(location.state?.medicalRecordData);
  }, [location]);

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

  if (!medicalRecordData) {
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
          NALAZ, {medicalRecordData.dateOfNotif}
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
          <div className="newAppointmentOutcome__symptoms">
            <h2 className="newAppointmentOutcome__labelLarge">Nalaz</h2>
            <hr className="newAppointmentOutcome__hr" />
            <div>
              <p className="newAppointmentOutcome__label">Preuzmi nalaz:</p>
              <button
                className="appointment__cancelButton "
                onClick={() =>
                  handleDownloadFile(medicalRecordData.textOfNotif)
                }
              >
                Preuzmi
              </button>
            </div>
            {medicalRecordData.additionalNote !== "" && (
              <div>
                <p className="newAppointmentOutcome__label">
                  Povratna informacija:
                </p>
                <div className="newAppointmentOutcome__certificateDiv">
                  <p>{medicalRecordData.additionalNote}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
