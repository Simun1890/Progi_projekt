import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  SidebarParent,
  SidebarDoctor,
  SidebarPediatrician,
  SidebarAdministrator,
} from "./SidebarData";
import "./Navbar.css";
import "./SidebarData.css";
import { useToken } from "../context/TokenProvider.js";
import axios from "axios";
import { useUserData } from "../context/UserDataProvider.js";

export const Navbar = () => {
  const { userData, updateUserData } = useUserData();
  const { logout, token } = useToken();
  const [sidebar, setSidebar] = useState(false);
  const [icon, setIcon] = useState(faBars);
  const navRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        token: token,
      };

      try {
        let res = await axios.post("/api/users/getProfile", data);
        res = res.data;
        if (res.role === "LIJECNIK_OBITELJSKE_MEDICINE") {
          res.role = "LIJEČNIK";
        }
        updateUserData(res);
      } catch (err) {
        console.error(err.message);
        if (err.message === "Token does not exist!") {
          logout();
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSidebar = () => {
    setIcon((prevIcon) => (prevIcon === faBars ? faXmark : faBars));
    setSidebar(!sidebar);
  };

  useEffect(() => {
    const handleMouseEnter = () => {
      setSidebar(true);
      setIcon(faXmark);
    };

    const handleMouseLeave = () => {
      setSidebar(false);
      setIcon(faBars);
    };

    const navElement = navRef.current;

    if (navElement) {
      navElement.addEventListener("mouseenter", handleMouseEnter);
      navElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        navElement.removeEventListener("mouseenter", handleMouseEnter);
        navElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  const handleLogout = async () => {
    const data = {
      token: token,
    };

    try {
      await axios.post("/api/users/logout", data);
      logout();
    } catch (err) {
      console.error(err.message);
      if (err.message === "Token does not exist!") {
        logout();
      }
    }
  };

  let sidebarRender;
  switch (userData.role) {
    case "LIJEČNIK":
      sidebarRender = SidebarDoctor;
      break;
    case "PEDIJATAR":
      sidebarRender = SidebarPediatrician;
      break;
    case "RODITELJ":
      sidebarRender = SidebarParent;
      break;
    case "ADMIN":
      sidebarRender = SidebarAdministrator;
      break;
    default:
      sidebarRender = [];
  }

  return (
    <>
      <div className="navbar">
        <h2
          className={
            userData.role ? "navbar__title" : "navbar__title navbar__error"
          }
        >
          OZDRAVI
        </h2>

        <FontAwesomeIcon
          className="navbar__icon"
          icon={icon}
          onClick={showSidebar}
        />
      </div>
      <nav
        className={sidebar ? "sidebar" : "sidebar sidebarClose"}
        ref={navRef}
      >
        <div className="sidebar__headerWrapper">
          <img
            className="sidebar__logo"
            src={
              userData.role
                ? "/images/logoShortDark.png"
                : "/images/logoShortError.png"
            }
            alt="ozdraviLogo"
          />
          <div>
            <p
              className={
                userData.role ? "sidebar__role" : "sidebar__role sidebar__error"
              }
            >
              {userData.role ? userData.role : "OZDRAVI"}
            </p>
            <p
              className={
                userData.role
                  ? "sidebar__email"
                  : "sidebar__email sidebar__error"
              }
            >
              {userData.name
                ? userData.name + " " + userData.surname
                : "Dogodila se greška!"}
            </p>
          </div>
        </div>
        <div className="sidebar__menuWrapper">
          <div className="sidebar__elementWrapper">
            {sidebarRender.map((element) => {
              return (
                <div key={element.path}>
                  <Link to={element.path} className={element.class}>
                    <FontAwesomeIcon
                      className="sidebar__icon"
                      icon={element.icon}
                    />
                    <p>{element.title}</p>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="sidebar__logoutWrapper">
            <div onClick={handleLogout}>
              <FontAwesomeIcon
                className="sidebar__icon"
                icon={faRightFromBracket}
              />
              <p className="sidebar__element">Odjava</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
