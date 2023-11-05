import { writable } from "svelte/store";

export interface ToastDetails {
  id?: number;
  type?: "error" | "success" | "info";
  message?: string;
  dismissible?: boolean;
  timeout?: number;
}
export const toasts = writable([] as ToastDetails[]);

export const addToast = (config: ToastDetails) => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissible/has a timeout.
  const id = Math.floor(Math.random() * 10000);
  config.id = id;
  config.timeout = config.timeout ?? 10000;
  // Push the toast to the top of the list of toasts
  toasts.update((all) => [{ ...config }, ...all]);

  // If toast is dismissible, dismiss it after "timeout" amount of time.
  if (config.timeout) setTimeout(() => dismissToast(id), config.timeout);
};

export const dismissToast = (id?: number) => {
  if (id) {
    toasts.update((all) => all.filter((t: ToastDetails) => t.id !== id));
  }
};
