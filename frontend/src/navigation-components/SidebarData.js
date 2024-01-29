import {
  faHourglassHalf,
  faHouse,
  faBookMedical,
  faAddressCard,
  faPersonBreastfeeding,
  faFileWaveform,
  faFileMedical,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

export const SidebarParent = [
  {
    path: "/naslovna",
    title: "Naslovna",
    icon: faHouse,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/profil",
    title: "Profil",
    icon: faAddressCard,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/popisPregleda",
    title: "Popis pregleda",
    icon: faBookMedical,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/noviTermin",
    title: "Novi Termin",
    icon: faFileWaveform,
    class: "sidebar__element",
  },
];

export const SidebarDoctor = [
  {
    path: "/naslovna",
    title: "Naslovna",
    icon: faHouse,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/profil",
    title: "Profil",
    icon: faAddressCard,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/popisPregleda",
    title: "Kartoni pacijenata",
    icon: faBookMedical,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/terminiNaCekanju",
    title: "Termina na čekanju",
    icon: faHourglassHalf,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/noviPregled",
    title: "Novi pregled",
    icon: faFileWaveform,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/noviNalaz",
    title: "Novi Nalaz",
    icon: faFileMedical,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/preporukeZaBolovanje",
    title: "Preporuke za bolovanje",
    icon: faPersonBreastfeeding,
    class: "sidebar__element",
  },
];

export const SidebarPediatrician = [
  {
    path: "/naslovna",
    title: "Naslovna",
    icon: faHouse,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/profil",
    title: "Profil",
    icon: faAddressCard,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/popisPregleda",
    title: "Kartoni pacijenata",
    icon: faBookMedical,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/terminiNaCekanju",
    title: "Termina na čekanju",
    icon: faHourglassHalf,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/noviPregled",
    title: "Novi pregled",
    icon: faFileWaveform,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/noviNalaz",
    title: "Novi Nalaz",
    icon: faFileMedical,
    class: "sidebar__element",
  },
];

export const SidebarAdministrator = [
  {
    path: "/naslovna",
    title: "Naslovna",
    icon: faHouse,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/profil",
    title: "Profil",
    icon: faAddressCard,
    class: "sidebar__element",
  },
  {
    path: "/naslovna/upravljanjeRacunima",
    title: "Upravljanje računima",
    icon: faWrench,
    class: "sidebar__element",
  },
];
