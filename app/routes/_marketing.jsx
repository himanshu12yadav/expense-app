import {Outlet} from "@remix-run/react";
import marketingStyles from '../styles/marketing.css?url';
import MainHeader from "../components/navigation/MainHeader.jsx";



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
