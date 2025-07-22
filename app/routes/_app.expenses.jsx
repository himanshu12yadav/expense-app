import {Link, Outlet} from "@remix-run/react";
import ExpensesList from "../components/expenses/ExpensesList.jsx";
import {FaPlus, FaDownload} from "react-icons/fa";

const sampleExpenses = [
    { id: 1, title: "Groceries", amount: 120.50, date: "2025-01-15" },
    { id: 2, title: "Gas", amount: 65.00, date: "2025-01-14" },
    { id: 3, title: "Coffee", amount: 4.25, date: "2025-01-13" },
    { id: 4, title: "Rent", amount: 1200.00, date: "2025-01-01" },
    { id: 5, title: "Internet", amount: 80.00, date: "2025-01-05" },
    { id: 6, title: "Lunch", amount: 12.75, date: "2025-01-12" },
    { id: 7, title: "Phone Bill", amount: 55.00, date: "2025-01-10" },
    { id: 8, title: "Gym Membership", amount: 35.00, date: "2025-01-08" },
    { id: 9, title: "Movies", amount: 25.00, date: "2025-01-11" },
    { id: 10, title: "Utilities", amount: 150.00, date: "2025-01-03" }
];



export default function _appExpenses() {
    return (
        <main>
            <Outlet/>
            <main>
                <section id={"expenses-actions"}>
                    <Link to="add">
                        <FaPlus/>
                        <span>
                            Add Expense
                        </span>
                    </Link>
                    <a href={"/expenses/raw"}>
                        <FaDownload/>
                        <span>
                            Load Raw Data
                        </span>
                    </a>
                </section>
                <ExpensesList expenses={sampleExpenses} />
            </main>
        </main>

    )
}