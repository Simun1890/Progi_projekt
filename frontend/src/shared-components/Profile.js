import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfileData } from "./ProfileData";
import "./Profile.css";
import { useUserData } from "../context/UserDataProvider.js";
import "../shared-components/ErrorPage";
import { useToken } from "../context/TokenProvider.js";
import axios from "axios";

export const Profile = () => {
  const { userData, setUserData } = useUserData();
  const [childData, setChildData] = useState(null);
  const { token } = useToken();

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        token: token,
      };

      try {
        let res = null;
        if (!userData.role) {
          res = await axios
            .post("/api/users/getProfile", data)
            .then((response) => response.data);
          if (res.role === "LIJECNIK_OBITELJSKE_MEDICINE") {
            res.role = "LIJEČNIK";
          }
          setUserData(res);
        }

        res = await axios
          .post("/api/children/getChildProfile", data)
          .then((response) => response.data);
        setChildData(res);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile">
      <h2 className="profile__title">MOJ PROFIL</h2>
      <div className="profile__wrapper">
        <hr className="profile__hr" />
        <div className="profile__data">
          {ProfileData.map((element) => {
            return (
              <div key={element.name}>
                <p className="profile__label">{element.placeholder}</p>
                <div>
                  <FontAwesomeIcon
                    className="profile__icon"
                    icon={element.icon}
                  />
                  <input
                    name={element.name}
                    type={element.type}
                    placeholder={element.placeholder}
                    className={element.class}
                    value={userData[element.name]}
                    readOnly
                  ></input>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {userData.role === "RODITELJ" && (
        <>
          <h2 className="profile__title">PROFILI DJECE</h2>
          <div className="profile__wrapper">
            <hr className="profile__hr" />
            <div className="profile__wrapper">
              {childData ? (
                childData.map((child, index) => (
                  <div className="profile__data" key={index}>
                    {ProfileData.map(
                      (element) =>
                        child[element.name] && (
                          <div key={element.name}>
                            <p className="profile__label">
                              {element.placeholder}
                            </p>
                            <div>
                              <FontAwesomeIcon
                                className="profile__icon"
                                icon={element.icon}
                              />
                              <input
                                name={element.name}
                                type={element.type}
                                placeholder={element.placeholder}
                                className={element.class}
                                value={child[element.name]}
                                readOnly
                              ></input>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                ))
              ) : (
                <p className="error__text">Greška prilikom dohvata podataka</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
