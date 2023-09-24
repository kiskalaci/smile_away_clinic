import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { User } from "../../models/user";

const userDetails = browser && localStorage.getItem("user");

export const user = writable<User>(JSON.parse(userDetails || "{}"));
user.subscribe(
  (value: User) => browser && (localStorage.user = JSON.stringify(value))
);
