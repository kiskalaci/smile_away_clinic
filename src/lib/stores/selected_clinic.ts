import Cookies from "js-cookie";
import { writable } from "svelte/store";

const clinicId = Cookies.get("clinic");

export const selectedClinicId = writable<string>(clinicId ?? "");

export const setClinicId = (value: string) => {
  Cookies.set("clinic", value);
  selectedClinicId.set(value);
};

export const clearClinicId = () => {
  Cookies.set("clinic", "");
  selectedClinicId.set("");
};
