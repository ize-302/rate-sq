import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

export function saveTokenInCookies(name, token) {
  return Cookies.set(name, token);
}

export function getTokenFromCookies(name) {
  return Cookies.get(name);
}

export function removeTokenFromCookies() {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
  return;
}