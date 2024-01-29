import "../other-components/AccountInput.css";
import { AccountInput } from "../other-components/AccountInput";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHashtag,
  faEnvelope,
  faLock,
  faLocationDot,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { useToken } from "../context/TokenProvider.js";
import axios from "axios";

export const Register = () => {
  const { login } = useToken();

  const REGEX = {
    NAME_AND_SURNAME: /^[A-Za-zšćžčđŠĆŽČĐ]{1,35}$/,
    OIB: /^\d{11}$/,
    EMAIL: /^(.+)@(.+)$/,
    PASSWORD:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
  };

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [oib, setOib] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sex, setSex] = useState("Muško");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [oibError, setOibError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);

  const [isRegisterValid, setIsRegisterValid] = useState(false);

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [formError, setFormError] = useState(false);

  const registerButtonRef = useRef(null);
  const formErrorMessageRef = useRef(null);

  useEffect(() => {
    setNameError(!new RegExp(REGEX.NAME_AND_SURNAME).test(name));
  }, [name, REGEX.NAME_AND_SURNAME]);

  useEffect(() => {
    setSurnameError(!new RegExp(REGEX.NAME_AND_SURNAME).test(surname));
  }, [surname, REGEX.NAME_AND_SURNAME]);

  useEffect(() => {
    setOibError(!new RegExp(REGEX.OIB).test(oib));
  }, [oib, REGEX.OIB]);

  useEffect(() => {
    setPasswordError(!new RegExp(REGEX.PASSWORD).test(password));
    setConfirmPasswordError(password !== confirmPassword);
  }, [password, confirmPassword, REGEX.PASSWORD]);

  useEffect(() => {
    setEmailError(!new RegExp(REGEX.EMAIL).test(email));
  }, [email, REGEX.EMAIL]);

  useEffect(() => {
    const inputDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - inputDate.getFullYear();
    const isValidDate = age >= 18 && age <= 100 ? true : false;
    setDateOfBirthError(!isValidDate);
  }, [dateOfBirth]);

  useEffect(() => {
    setIsRegisterValid(
      !nameError &&
        !surnameError &&
        !oibError &&
        !emailError &&
        !passwordError &&
        !confirmPasswordError &&
        !dateOfBirthError &&
        name !== "" &&
        surname !== "" &&
        oib !== "" &&
        email !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        dateOfBirth !== "" &&
        address !== "" &&
        sex !== ""
    );
  }, [
    nameError,
    surnameError,
    oibError,
    emailError,
    passwordError,
    confirmPasswordError,
    dateOfBirthError,
    name,
    surname,
    oib,
    email,
    password,
    confirmPassword,
    dateOfBirth,
    address,
    sex,
  ]);

  useEffect(() => {
    formErrorMessageRef.current.textContent = formErrorMessage;
    formErrorMessageRef.current.className = `account__submitError ${
      formError ? "account__showError" : "account__hideError"
    }`;
  }, [formErrorMessage, formError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegisterValid) {
      let data = {
        name: name,
        surname: surname,
        oib: oib,
        sex: sex,
        dateOfBirth: dateOfBirth,
        address: address,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      try {
        const response = await axios.post("/api/users/register", data);
        setFormError(false);
        console.log("register: ", response);
        login(response.data);
      } catch (error) {
        console.error("Failed to send data:", error);
        setFormErrorMessage(error.response.data.message);
        setFormError(true);
      }
    }
  };

  return (
    <div className="account">
      <img
        className="account__logo"
        src="../images/logoLongDark.png"
        alt="ozdraviLogo"
      ></img>

      <form className="account__form" onSubmit={handleSubmit}>
        <h2 className="account__title">REGISTRIRAJ SE</h2>
        <AccountInput
          name="name"
          type="text"
          placeholder="Ime"
          icon={faUser}
          errorMsg="Ime ne smiju sadržavati simbole ili brojke te mora biti kraće od 35 znakova!"
          value={name}
          error={nameError}
          onChange={(e) => setName(e.target.value)}
          pattern={REGEX.NAME_AND_SURNAME}
          autoComplete="given-name"
        />

        <AccountInput
          name="surname"
          type="text"
          placeholder="Prezime"
          errorMsg="Prezime ne smiju sadržavati simbole ili brojke te mora biti kraće od 35 znakova!"
          value={surname}
          error={surnameError}
          onChange={(e) => setSurname(e.target.value)}
          pattern={REGEX.NAME_AND_SURNAME}
          autoComplete="family-name"
        />

        <AccountInput
          name="oib"
          type="text"
          placeholder="OIB"
          icon={faHashtag}
          errorMsg="OIB mora sadržavati 11 znamenki!"
          value={oib}
          error={oibError}
          onChange={(e) => setOib(e.target.value)}
          pattern={REGEX.OIB}
          autoComplete="off"
        />

        <AccountInput
          name="email"
          type="email"
          placeholder="Email"
          icon={faEnvelope}
          errorMsg="Email mora biti u valjanom obliku!"
          value={email}
          error={emailError}
          onChange={(e) => setEmail(e.target.value)}
          pattern={REGEX.EMAIL}
          autoComplete="email"
        />

        <AccountInput
          name="password"
          type="password"
          placeholder="Lozinka"
          icon={faLock}
          errorMsg="Lozinka mora sadržavati: 8-32 znakova, barem jedno veliko i malo slovo, broj te specijalan znak!"
          value={password}
          error={passwordError}
          onChange={(e) => setPassword(e.target.value)}
          pattern={REGEX.PASSWORD}
          autoComplete="new-password"
        />

        <AccountInput
          name="confirmPassword"
          type="password"
          placeholder="Potvrdi lozinku"
          errorMsg="Lozinke se ne podudaraju!"
          value={confirmPassword}
          error={confirmPasswordError}
          onChange={(e) => setConfirmPassword(e.target.value)}
          pattern={password}
          autoComplete="new-password"
        />

        <div>
          <label>Spol</label>
          <div>
            <div>
              <select
                id="gender"
                name="gender"
                required={true}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="Muško">Muško</option>
                <option value="Žesko">Žesko</option>
                <option value="Drugo">Drugo</option>
              </select>
              <FontAwesomeIcon className="account__icon" icon={faVenusMars} />
            </div>
          </div>
        </div>

        <AccountInput
          name="dateOfBirth"
          type="date"
          placeholder="Datum rođenja"
          errorMsg="Datum rođenja nije valjan ili osoba nije starija od 18 godina!"
          value={dateOfBirth}
          error={dateOfBirthError}
          onChange={(e) => setDateOfBirth(e.target.value)}
          pattern=""
          autoComplete="bday"
        />

        <AccountInput
          name="address"
          type="text"
          placeholder="Adresa stanovanja"
          icon={faLocationDot}
          errorMsg=""
          value={address}
          error={false}
          onChange={(e) => setAddress(e.target.value)}
          pattern=""
          autoComplete="address"
        />

        <button
          className="account__button"
          type="submit"
          ref={registerButtonRef}
          disabled={!isRegisterValid}
        >
          Registriraj se
        </button>
        <div className="account__submitError" ref={formErrorMessageRef}></div>
        <Link to="/prijava" className="account__switchForm">
          Već imate račun? Prijavite se!
        </Link>
      </form>
    </div>
  );
};
