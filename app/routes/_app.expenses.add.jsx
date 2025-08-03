import ExpenseForm from '../components/expenses/ExpenseForm';
import Modal from '../components/util/Modal.jsx';
import { redirect, useNavigate } from '@remix-run/react';
import { addExpense } from '../data/expenses.server.js';
import { validateExpenseInput } from '../data/validation.server.js';
import {requireUserSession} from "../data/auth.server.js";

export default function AddExpensesPage() {
  const navigate = useNavigate();

  const closeHandler = () => {
    navigate('/expenses');
  };
  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export const action = async ({ request }) => {

  const userId = await requireUserSession(request);

  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  if (!expenseData.date) {
    throw new Response('Date is required', { status: 400 });
  }

  try {
    await addExpense(expenseData, userId);
    return redirect('/expenses');
  } catch (error) {
    console.error('Error adding expense:', error);
    throw new Response('Failed to add expense', { status: 500 });
  }
};
