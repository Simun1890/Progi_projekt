import "../other-components/AccountInput.css";
import { AccountInput } from "../other-components/AccountInput";
import { useState, useRef, useEffect } from "react";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useToken } from "../context/TokenProvider.js";
import axios from "axios";

export const Login = () => {
  const { login } = useToken();

  const REGEX = {
    EMAIL: /^(.+)@(.+)$/,
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [formError, setFormError] = useState(false);
  const loginButtonRef = useRef(null);
  const formErrorMessageRef = useRef(null);

  useEffect(() => {
    setEmailError(!new RegExp(REGEX.EMAIL).test(email));
  }, [email, REGEX.EMAIL]);

  useEffect(() => {
    setIsLoginValid(!emailError && email !== "" && password !== "");
  }, [emailError, email, password]);

  useEffect(() => {
    formErrorMessageRef.current.textContent = formErrorMessage;
    formErrorMessageRef.current.className = `account__submitError ${
      formError ? "account__showError" : "account__hideError"
    }`;
  }, [formErrorMessage, formError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginValid) {
      let data = {
        email: email,
        password: password,
      };

      try {
        const response = await axios.post("/api/users/login", data);
        setFormError(false);
        console.log("login: ", response);
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
        <h2 className="account__title">PRIJAVI SE</h2>
        <AccountInput
          name="email"
          type="email"
          placeholder="Email"
          icon={faEnvelope}
          errorMsg="Email nije valjani!"
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
          errorMsg=""
          value={password}
          error={false}
          onChange={(e) => setPassword(e.target.value)}
          pattern=""
          autoComplete="password"
        />

        <button
          className="account__button"
          type="submit"
          ref={loginButtonRef}
          disabled={!isLoginValid}
        >
          Prijavi se
        </button>
        <div className="account__submitError" ref={formErrorMessageRef}></div>
        <Link to="/registracija" className="account__switchForm">
          Nemate račun? Registrirajte se!
        </Link>
      </form>
    </div>
  );
};
