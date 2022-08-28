import fetch from "node-fetch";
import { Api404Error } from "./errors.js";

// Utils
import { HTTP_CODE_MESSAGES } from "./constants.js";

export const get = async (url) => {

    try {

        const response = await fetch(url);
        const data = await response.json();
    
        switch (response.status) {
    
            case 200:
                return {
                    code: response.status,
                    data
                }
            case 201:
                return {
                    code: response.status,
                    message: HTTP_CODE_MESSAGES[response.status]
                }
            case 202:
                return {
                    code: response.status,
                    message: HTTP_CODE_MESSAGES[response.status]
                }
            default:
                return {
                    code: response.status,
                    error: HTTP_CODE_MESSAGES[response.status]
                }
        }

    } catch(error) {

        console.log("ERROR: request.js (get):", error);

        throw new Api404Error("request.js (get): Error");
    }
}
