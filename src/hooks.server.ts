import * as cookie from "cookie";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const handleCookie = (async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get("cookie") || "");
  // event.locals.token = cookies.token ? cookies.token : null;
  // event.locals.user = cookies.user ? JSON.parse(cookies.user) : null;
  // event.locals.user = await getUserInformation(event.cookies.get('sessionid'));

  const response = await resolve(event);
  response.headers.set("Access-Control-Allow-Origin", "*");

  return response;
}) satisfies Handle;




export const handle = sequence(handleCookie);
