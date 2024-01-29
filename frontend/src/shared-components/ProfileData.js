import {
  faSignature,
  faHashtag,
  faEnvelope,
  faLocationDot,
  faVenusMars,
  faCalendar,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export const ProfileData = [
  {
    type: "text",
    name: "name",
    placeholder: "Ime",
    icon: faHeart,
    class: "profile__input",
  },
  {
    type: "text",
    name: "surname",
    placeholder: "Prezime",
    icon: faSignature,
    class: "profile__input",
  },
  {
    type: "text",
    name: "oib",
    placeholder: "OIB",
    icon: faHashtag,
    class: "profile__input",
  },
  {
    type: "text",
    name: "sex",
    placeholder: "Spol",
    icon: faVenusMars,
    class: "profile__input",
  },
  {
    type: "text",
    name: "address",
    placeholder: "Adresa",
    icon: faLocationDot,
    class: "profile__input",
  },
  {
    type: "text",
    name: "dateOfBirth",
    placeholder: "Datum rođenja",
    icon: faCalendar,
    class: "profile__input",
  },
  {
    type: "text",
    name: "email",
    placeholder: "Email",
    icon: faEnvelope,
    class: "profile__input",
  },
];
