/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" },
];

export const firebaseConfig = {
  apiKey: "AIzaSyBYy4CVORzS8l_4uYTW4uMKccXUdls7kWU",
  authDomain: "hardy-scarab-321715.firebaseapp.com",
  projectId: "hardy-scarab-321715",
  storageBucket: "hardy-scarab-321715.appspot.com",
  messagingSenderId: "183145319877",
  appId: "1:183145319877:web:734c19c639657cf9158fac",
  measurementId: "G-8Y01YY9KPL"
}

export const searchPath = "/app/pages/search";
export const servicePath = process.env.REACT_APP_API_URL;

/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const themeColorStorageKey = "__theme_color";
export const isMultiColorActive = true;
export const isDarkSwitchActive = true;
export const defaultColor = "light.purple";
export const defaultDirection = "ltr";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = true;
