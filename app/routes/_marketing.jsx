import {Outlet} from "@remix-run/react";
import marketingStyles from '../styles/marketing.css?url';
import MainHeader from "../components/navigation/MainHeader.jsx";
import {getUserFromSession} from "../data/auth.server.js";

export const loader = ({request})=>{
  return getUserFromSession(request)
}

export default function marketing() {
    return (
        <>
            <MainHeader/>
            <Outlet/>
        </>

    )
}

export const links = ()=>{
    return [
        {
            rel: 'stylesheet',
            href:marketingStyles
        }
    ]
}

export const meta = ()=>{
    return [
        {
            title: 'RemixExpenses - Manage Your Expenses',
            description: 'An app to track and manage your expenses with ease.'
        }
    ]
}