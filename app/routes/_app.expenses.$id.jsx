import ExpenseForm from '../components/expenses/ExpenseForm';
import Modal from '../components/util/Modal.jsx';
import { json, redirect, useNavigate } from '@remix-run/react';
import { deleteExpense, updateExpense } from '../data/expenses.server.js';

// import { getExpensesById } from '../data/expenses.server.js';
import { validateExpenseInput } from '../data/validation.server';

export const action = async ({ params, request }) => {
  const expenseId = params.id;
  const formData = await request.formData();

  const expenseData = {
    title: formData.get('title'),
    amount: formData.get('amount'),
    date: formData.get('date'),
  };

  if (request.method === 'PATCH') {
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return json({ errors: error }, { status: 400 });
    }

    await updateExpense(expenseId, expenseData);
    return redirect('/expenses');
  } else if (request.method === 'DELETE') {
    await deleteExpense(expenseId);
    return {deleteId: expenseId}
    // return redirect('/expenses');
  }

  // Call the updateExpense function with the ID and new data
};

export default function ExpensesId() {
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

/*
export const loader = async ({ params }) => {
  if (!params.id) {
    throw new Response('Not Found', { status: 404 });
  }

  const expenseId = params.id;
  console.log('Expense ID from params:', expenseId);

  // Validate if expenseId is a valid ObjectId (24 character hexadecimal string)
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(expenseId)) {
    console.error('Invalid expenseId format:', expenseId);
    throw new Response('Invalid expense ID format', { status: 400 });
  }

  let expense = await getExpensesById(expenseId);


  if (!expense) {
    expense = { title: '', amount: 0, date: new Date() }; // Provide default values
  }

  return json({ expense }); // No data needed for this component
};
*/
