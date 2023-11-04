import { variables } from "$lib/utils/variables";
import Cookies from "js-cookie";

export abstract class Api {
  static async request(
    method: string,
    path: string,
    data: object = {},
  ): Promise<Response> {
    const apiPath =
      variables.env === "development" ? variables.dev_host : variables.host;

    const noData = method === "GET" || method === "DELETE";
    const auth_token: string = Cookies.get("auth_token") ?? "";
    const language: string = Cookies.get("language") ?? "";

    return fetch(`${apiPath}/${path}`, {
      method: method,
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth_token,
        "Access-Control-Allow-Origin": "*",
        "Accept-Language": language,
      },
      ...(!noData ? { body: JSON.stringify(data) } : null),
    })
      .then((response: Response) => {
        if (response.ok) {
          return response;
        }

        if (response.status === 401) {
          //refreshtoken
        }

        if (response.status >= 500) {
          // eslint-disable-next-line no-debugger
          debugger;
          throw new Error(`status code ${response.status}`);
        }

        return response;
      })
      .catch((e: Error) => {
        console.log("network error");
        throw e;
      });
  }

  static async requestBody<TResponse>(
    method: string,
    path: string,
    data: object = {},
  ): Promise<TResponse> {
    return await this.request(method, path, data)
      .then((response) => response.json())
      .then((data) => data as TResponse)
      .catch((e: Error) => {
        console.error(e);
        throw e;
      });
  }
}
