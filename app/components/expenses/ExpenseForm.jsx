import {
  Link,
  useActionData,
  Form,
  useNavigation,
  useLoaderData,
  useMatches,
  useParams,
} from '@remix-run/react';

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const navigation = useNavigation();

  // const expenseData = useLoaderData();

  // alternative to useLoaderData is to use useMatches
  // which allows us to access data from multiple routes
  const params = useParams();
  const matches = useMatches();
  const expenses = matches.find(
    (match) => match.id === 'routes/_app.expenses'
  )?.data;

  // The find method is called on the expenses array
  const expenseData = expenses?.find((item) => item.id === params.id);

  const validationErrors = useActionData();
  const isSubmitting = navigation.state !== 'idle';

  if (params.id && !expenseData) {
    // Invalid expense id!
    return (
      <div className="error-container">
        <p className="error-message">Invalid expense id.</p>
        <Link to="/expenses" className="close-btn">&times;</Link>
      </div>
    )
  }

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: new Date(expenseData.date).toISOString().slice(0, 10),
      }
    : {
        title: '',
        amount: '0.00',
        date: today,
      };

  return (
    <Form
      method={expenseData ? 'patch' : 'post'}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            defaultValue={defaultValues.amount}
            max="1000000"
            placeholder="0.00"
            pattern="^\d+(\.\d{1,2})?$"
            title="Please enter a valid amount (e.g., 10.00)"
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            defaultValue={defaultValues.date}
            required
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => {
            if (typeof error === 'object' && error !== null) {
              return <li key={error.title}>{error.title}</li>;
            }
            return <li key={error}>{error}</li>;
          })}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Saving...' : 'Save Expense'}
        </button>
        <Link to="/expenses">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
