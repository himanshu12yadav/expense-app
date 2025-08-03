import authStyles from '../styles/auth.css?url';
import AuthForm from '../components/auth/AuthForm';
import {validateCredentials} from "../data/validation.server.js";
import {login, signup} from "../data/auth.server.js.jsx";
import {useRouteError} from "@remix-run/react";
import Error from "../components/util/Error.jsx";
export const links = ()=>{
    return [{
        rel: 'stylesheet',
        href:authStyles,
    }]
}

export default function _marketingAuth(){
    return (
        <AuthForm />
    )
}

export const action = async ({request})=>{

    const searchParams = new URL(request.url).searchParams;

    const authMode = searchParams.get('mode') || 'login';

    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    try {
        validateCredentials(credentials);
    }catch (err){
        return err;
    }


    try{
        if (authMode === 'login') {
           return await login(credentials);
        }else{
            return await signup(credentials);
        }
    }catch(err){
        if (err.status === 422){
            return {
                credentials: err.message,
            }
        }

        throw err;
    }

}

export function ErrorBoundary(){
    const error = useRouteError();
    return (
        <>
            <main>
                <Error title={error.message}>
                    <p>
                        {error.message || 'Something went wrong. Please try again later.'}
                    </p>
                </Error>
            </main>
        </>
    )
}