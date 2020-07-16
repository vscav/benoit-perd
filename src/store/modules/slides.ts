export const slides = [
  {
    title: "#*!?",
    subtitle: "Free Benoît",
    description:
      "Morbi tristique elementum cursus. Proin vitae neque bibendum, fringilla metus.",
    color: "#f89e4c",
    picture: {
      src: require("../../../assets/images/1.png"),
      width: 3000,
      height: 2622,
    },
    sound: require("../../../assets/sounds/1.wav"),
  },
  {
    title: "@&!*",
    subtitle: "Miaouu",
    description:
      "Morbi tristique elementum cursus. Proin vitae neque bibendum, fringilla metus.",
    color: "#f46e38",
    picture: {
      src: require("../../../assets/images/2.png"),
      width: 3000,
      height: 1873,
    },
    sound: require("../../../assets/sounds/2.wav"),
  },
  {
    title: "**!@",
    subtitle: "Satané Benny",
    description:
      "Morbi tristique elementum cursus. Proin vitae neque bibendum, fringilla metus.",
    color: "#f04647",
    picture: {
      src: require("../../../assets/images/3.png"),
      width: 3000,
      height: 2364,
    },
    sound: require("../../../assets/sounds/3.wav"),
  },
  {
    title: "@$*!#",
    subtitle: "Arbitre coquin",
    description:
      "Morbi tristique elementum cursus. Proin vitae neque bibendum, fringilla metus.",
    color: "#582841",
    picture: {
      src: require("../../../assets/images/4.png"),
      width: 3000,
      height: 1826,
    },
    sound: require("../../../assets/sounds/4.wav"),
  },
];

export const assets = slides.map((slide) => slide.picture.src);
