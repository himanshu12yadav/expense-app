import ExpenseForm from '../components/expenses/ExpenseForm';
import Modal from "../components/util/Modal.jsx";
import {useNavigate} from "@remix-run/react";

export default function ExpensesId(){
    const navigate = useNavigate();

    const closeHandler = ()=>{
        navigate("/expenses");
    }

    return (
        <Modal onClose={closeHandler}>
            <ExpenseForm/>
        </Modal>

    )
}