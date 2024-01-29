import "./ErrorPage.css";

export const ErrorPage = () => {
  return (
    <div className="errorPage__div">
      <h2 className="errorPage__title">Dogodila se greška!</h2>
      <img
        className="errorPage__logo"
        src="../images/logoShortError.png"
        alt="ozdraviLogo"
      ></img>
    </div>
  );
};
