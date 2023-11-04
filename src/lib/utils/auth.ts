import Cookies from "js-cookie";
import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { AuthStatus } from "$lib/enums/auth_status";

export const handleSession = async (res: Response) => {
  if (res.status === 440) {
    await logout();
  }
};

export const logout = async () => {
  if (typeof window != "undefined") {
    Cookies.remove("user", {
      path: "",
      expires: 30,
      secure: false,
      httpOnly: true,
    });

    Cookies.remove("auth_token");

    browser && localStorage.removeItem("username");

    return window.location.replace("");
  }
};

export function setTokenCookie(token: string | null) {
  if (browser && token) {
    Cookies.set("auth_token", token);
  }
}

export const authStatus = writable(AuthStatus.unauthenticated);
