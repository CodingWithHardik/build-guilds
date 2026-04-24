import { cache } from "react";


export const getUsers = cache(async(protocol: string, host: string = "localhost", cookie: string) => {
    return await fetch(`${protocol}://${host}/api/user/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
          "Cookie": cookie
        }
    })
})