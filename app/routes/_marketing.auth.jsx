import authStyles from '../styles/auth.css?url';
import AuthForm from '../components/auth/AuthForm';
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

    if (authMode){

    }else{

    }
}