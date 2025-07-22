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