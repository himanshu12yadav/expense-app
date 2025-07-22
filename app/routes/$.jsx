import {redirect} from "@remix-run/react";

export const loader = async ({params})=>{
    if (params['*'] === 'exp'){
        return redirect('/expenses');
    }

    throw new Response('Not Found', {status: 404, statusText: 'Not Found'});
}