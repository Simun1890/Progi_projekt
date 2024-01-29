import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHashtag,
  faEnvelope,
  faLocationDot,
  faVenusMars,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";
import "../shared-components/Profile.css";
import "../shared-components/ErrorPage";
import "../other-components/AccountInput.css";
import { useToken } from "../context/TokenProvider.js";
import axios from "axios";

export const AccountEdit = () => {
  const { token } = useToken();
  let userDataTemplate = {
    name: "",
    surname: "",
    oib: "",
    sex: "",
    role: "",
    address: "",
    email: "",
    dateOfBirth: "",
  };
  const [userDataOriginal, setUserDataOriginal] = useState(userDataTemplate);
  const [oibInput, setOibInput] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [oib, setOib] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("Muško");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("Roditelj");
  const [correctFetch, setCorrectFetch] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(
    "Unesite OIB za prikaz korisničkih podataka!"
  );

  const [errorState, setErrorState] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successState, setSuccessState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messageRef = useRef(null);

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

  const nameRef = useRef();
  const surnameRef = useRef();
  const oibRef = useRef();
  const emailRef = useRef();
  const sexRef = useRef();
  const dateOfBirthRef = useRef();
  const addressRef = useRef();
  const roleRef = useRef();

  useEffect(() => {
    setName(userDataOriginal.name);
    nameRef.current && (nameRef.current.value = userDataOriginal.name);

    setSurname(userDataOriginal.surname);
    surnameRef.current && (surnameRef.current.value = userDataOriginal.surname);

    setOib(userDataOriginal.oib);
    oibRef.current && (oibRef.current.value = userDataOriginal.oib);

    setEmail(userDataOriginal.email);
    emailRef.current && (emailRef.current.value = userDataOriginal.email);

    const parts = userDataOriginal.dateOfBirth.split(".");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    console.log(formattedDate);
    setDateOfBirth(formattedDate);
    dateOfBirthRef.current && (dateOfBirthRef.current.value = formattedDate);

    setAddress(userDataOriginal.address);
    addressRef.current && (addressRef.current.value = userDataOriginal.address);

    if (roleRef.current) {
      const roleIndex = Array.from(roleRef.current.options).findIndex(
        (option) => option.value === userDataOriginal.role
      );
      roleRef.current.selectedIndex = roleIndex !== -1 ? roleIndex : 0;
    }

    if (sexRef.current) {
      const sexIndex = Array.from(sexRef.current.options).findIndex(
        (option) => option.value === userDataOriginal.sex
      );
      sexRef.current.selectedIndex = sexIndex !== -1 ? sexIndex : 0;
    }
  }, [userDataOriginal]);

  const handleGetAccountData = async () => {
    let isCorrectOib = new RegExp(/^\d{11}$/).test(oibInput);
    if (!isCorrectOib) {
      setDisplayMessage("OIB mora sadržavati 11 znamenki!");
      setCorrectFetch(false);
    } else {
      try {
        let res = await axios.post("/api/users/getUserProfileByOib", {
          token: token,
          oib: oibInput,
        });
        setUserDataOriginal(res.data);
        setCorrectFetch(true);
      } catch (err) {
        setDisplayMessage(err.response.data.message);
        console.error(err);
      }
    }
  };

  const handleSaveChanges = async () => {
    let userData = {
      token: token,
      name: name,
      surname: surname,
      oib: oib,
      sex: sex,
      role: role,
      adress: address,
      email: email,
      dateOfBirth: dateOfBirth,
    };

    try {
      await axios.post("/api/users/editUserProfileByOib", userData);

      setErrorState(false);
      setSuccessMessage("Uspješno pohranjeno!");
      setSuccessState(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCorrectFetch(false);
      setSuccessState(false);
    } catch (error) {
      console.error(error);
      setSuccessState(false);
      setErrorState(true);
      setErrorMessage(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.post("/api/users/deleteUserProfileByOib", {
        token: token,
        oib: oibInput,
      });

      setErrorState(false);
      setSuccessMessage("Uspješno obrisano!");
      setSuccessState(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCorrectFetch(false);
      setSuccessState(false);
    } catch (error) {
      console.error(error);
      setSuccessState(false);
      setErrorState(true);
      setErrorMessage(error.message);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setErrorState(false);
    }
  };

  return (
    <>
      <div className="schedule__admin">
        <h2 className="schedule__title">UPRAVLJANJE RAČUNIMA</h2>
        <hr className="schedule__hr" />
        <div className="newSchedule__Admin">
          <p className="schedule__labelLarge  schedule__alignTextCenter">
            Unesite OIB korisnika računa:<em className="schedule__pRed"> *</em>
          </p>
          <div className="schedule__wrapper schedule__columnsThree">
            <input
              name="OIB"
              type="text"
              placeholder="OIB"
              className="account__formAdmin"
              onChange={(e) => setOibInput(e.target.value)}
            ></input>
            <button
              className="appointment__cancelButton schedule__editButton"
              onClick={handleGetAccountData}
            >
              Prikaži
            </button>
          </div>
        </div>

        <h2 className="schedule__title">KORISNIČKI PODACI</h2>
        <hr className="schedule__hr" />
        {correctFetch ? (
          <>
            <div className="account__form">
              <div>
                <label>Ime</label>
                <div>
                  <div>
                    <input
                      name="name"
                      type="text"
                      placeholder="Ime"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="given-name"
                      ref={nameRef}
                    />
                    <FontAwesomeIcon className="account__icon" icon={faUser} />
                  </div>
                </div>
              </div>

              <div>
                <label>Prezime</label>
                <div>
                  <div>
                    <input
                      name="surname"
                      type="text"
                      placeholder="Prezime"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      autoComplete="family-name"
                      ref={surnameRef}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label>Oib</label>
                <div>
                  <div>
                    <input
                      name="oib"
                      type="text"
                      placeholder="OIB"
                      value={oib}
                      onChange={(e) => setOib(e.target.value)}
                      autoComplete="off"
                      ref={oibRef}
                      disabled={true}
                    />
                    <FontAwesomeIcon
                      className="account__icon"
                      icon={faHashtag}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label>Uloga</label>
                <div>
                  <div>
                    <select
                      id="role"
                      name="role"
                      onChange={(e) => setRole(e.target.value)}
                      ref={roleRef}
                    >
                      <option value="RODITELJ">Roditelj</option>
                      <option value="LIJEČNIK">Liječnik</option>
                      <option value="PEDIJATAR">Pedijatar</option>
                      <option value="ADMINISTRATOR">Administrator</option>
                    </select>
                    <FontAwesomeIcon
                      className="account__icon"
                      icon={faScroll}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label>Email</label>
                <div>
                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      ref={emailRef}
                    />
                    <FontAwesomeIcon
                      className="account__icon"
                      icon={faEnvelope}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label>Spol</label>
                <div>
                  <div>
                    <select
                      id="gender"
                      name="gender"
                      onChange={(e) => setSex(e.target.value)}
                      ref={sexRef}
                    >
                      <option value="Muško">Muško</option>
                      <option value="Žensko">Žensko</option>
                      <option value="Drugo">Drugo</option>
                    </select>
                    <FontAwesomeIcon
                      className="account__icon"
                      icon={faVenusMars}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label>Datum rođenja</label>
                <div>
                  <div>
                    <input
                      name="dateOfBirth"
                      type="date"
                      placeholder="Datum rođenja"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      autoComplete="bday"
                      ref={dateOfBirthRef}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label>Adresa stanovanja</label>
                <div>
                  <div>
                    <input
                      name="address"
                      type="text"
                      placeholder="Adresa stanovanja"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      autoComplete="address"
                      ref={addressRef}
                    />
                    <FontAwesomeIcon
                      className="account__icon"
                      icon={faLocationDot}
                    />
                  </div>
                </div>
              </div>

              <button
                className="account__buttonAdmin account_greenButton"
                onClick={handleSaveChanges}
              >
                Spremi promjene
              </button>
              <button
                className="account__buttonAdmin"
                onClick={handleDeleteAccount}
              >
                Izbriši račun
              </button>
              <div
                className="account__submitError account__marginTop"
                ref={messageRef}
              ></div>
            </div>
          </>
        ) : (
          <p className="error__text">{displayMessage}</p>
        )}
      </div>
    </>
  );
};
