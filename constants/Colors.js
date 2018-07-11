import { StatusBar } from "react-native";

const tintColor = "#2f95dc";
const themeColor = "#d96a5f";
const rgbThemeColor = "217,106,5";

const darkFontColor = "#2c2c2c";
const primaryFontColor = "#414141";
const tintFontColor = "#8a8a8a";
const lightFontColor = "#bfbfbf";

const darkBorderColor = "#707070";
const primaryBorderColor = "#969696";
const tintBorderColor = "#d9d9d9";
const lightBorderColor = "#f0f0f0";

const weixinColor = "#42c02e";
const weiboColor = "#E54438";
const qqColor = "#407FCF";
const qqzoneColor = "#FFC706";
const linkColor = "#2B89CA";
const skyBlue = "#00CCFF";
const nattierBlue = "#CAD4FF";
const blueViolet = "#9966FF";
const thinViolet = "#BBB6CE";
const softPink = "#FF9999";
const hotPink = "#FF6666";
const darkGray = "#ececec";
const tintGray = "#f0f0f0";
const lightGray = "#f7f7f7";
const skinColor = "#ffffff";
const nightColor = "#414141";

const resetStatusBar = () => {
  StatusBar.setTranslucent(false);
  StatusBar.setBackgroundColor("#ffffff");
  StatusBar.setBarStyle("dark-content");
};

export default {
  resetStatusBar,
  tintColor,
  themeColor,
  rgbThemeColor,
  darkFontColor,
  primaryFontColor,
  tintFontColor,
  lightFontColor,
  darkBorderColor,
  primaryBorderColor,
  tintBorderColor,
  lightBorderColor,
  weixinColor,
  weiboColor,
  qqColor,
  qqzoneColor,
  linkColor,
  skyBlue,
  nattierBlue,
  blueViolet,
  thinViolet,
  softPink,
  hotPink,
  darkGray,
  tintGray,
  lightGray,
  skinColor,
  nightColor,
  tabIconDefault: "#ccc",
  tabIconSelected: tintColor,
  tabBar: "#fefefe",
  errorBackground: "red",
  errorText: "#fff",
  warningBackground: "#EAEB5E",
  warningText: "#666804",
  noticeBackground: tintColor,
  noticeText: "#fff"
};
