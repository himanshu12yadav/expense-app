import {Outlet} from "@remix-run/react";
import expensesStyles from "../styles/expenses.css?url";
import ExpensesHeader from "../components/navigation/ExpensesHeader.jsx";

export default function App(){
    return (
        <>
            <ExpensesHeader/>
            <Outlet/>
        </>

    )
}

export const links = () => [
    {
        rel: 'stylesheet',
        href:expensesStyles
    }
]