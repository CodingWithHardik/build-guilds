import { cache } from "react";


export const getEvents = cache(async(protocol: string, host: string = "localhost", cookie: string, csrfToken: string) => {
    return await fetch(`${protocol}://${host}/api/events/getEvents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookie,
          "x-csrf-token": csrfToken
        }
    })
})