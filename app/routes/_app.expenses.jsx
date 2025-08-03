import {isRouteErrorResponse, Link, Outlet, useLoaderData, useRouteError} from '@remix-run/react';
import ExpensesList from '../components/expenses/ExpensesList.jsx';
import {FaDownload, FaPlus} from 'react-icons/fa';
import {getExpenses} from '../data/expenses.server.js';

import Error from '../components/util/Error';
import styles from '../styles/error.css?url';
import {requireUserSession} from "../data/auth.server.js";

export default function _appExpenses() {
  const loadData = useLoaderData();
  const expenses = loadData || [];

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <main>
      <Outlet />
      <main>
        <section id={'expenses-actions'}>
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href={'/expenses/raw'}>
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {
          hasExpenses && <ExpensesList expenses={expenses} />
        }
        {
          !hasExpenses && (
              <section className={"error-container"}>
                <h2>No Expenses Found</h2>
                <p>Start <Link to={'add'}>adding some</Link> today.</p>
              </section>
            )
        }

      </main>
    </main>
  );
}

export const loader = async ({request}) => {
  const userId = await requireUserSession(request)

  return await getExpenses(userId);
};

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="error-container">
        <Error title={`${error.status} ${error.statusText}`}>
          <p>{error.data?.message || 'An error occurred.'}</p>
          <p>
            Back To <Link to="/expenses">Safety</Link>
          </p>
        </Error>
      </main>
    );
  }

  let errorTitle = 'An error occurred';
  let errorMessage = 'An unknown error has occurred.';

  if (error instanceof Error) {
    errorTitle = error.name;
    errorMessage = error.message;
  }

  return (
    <main className="error-container">
      <Error title={errorTitle}>
        <p>{errorMessage}</p>
        <p>
          Back To <Link to="/expenses">Safety</Link>
        </p>
      </Error>
    </main>
  );
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

