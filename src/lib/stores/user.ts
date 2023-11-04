import { browser } from "$app/environment";
import type { User } from "$lib/models/user";
import { writable } from "svelte/store";

const userDetails = browser && localStorage.getItem("user");

export const user = writable<User>(JSON.parse(userDetails || "{}"));
user.subscribe(
  (value: User) => browser && (localStorage.user = JSON.stringify(value)),
);
