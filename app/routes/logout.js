import {json} from "@remix-run/react";
import {destroyUserSession} from "../data/auth.server.js";

export const action = async ({request})=>{
    if (request.method !== 'POST'){
        throw json({message: 'Invalid request method'},{
            status: 404,
        })
    }

    return destroyUserSession(
        request
    )
}