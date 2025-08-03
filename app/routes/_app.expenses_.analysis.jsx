import ExpenseStatistics from "../components/expenses/ExpenseStatistics";
import Charts from "../components/expenses/Chart";
import {getExpenses} from "../data/expenses.server.js";
import {isRouteErrorResponse, json, Link, useLoaderData, useRouteError} from "@remix-run/react";
import Error from '../components/util/Error';
import styles from '../styles/error.css?url';
import {requireUserSession} from "../data/auth.server.js";

export default function _appExpenses_Analysis() {

    const expenses = useLoaderData();

    return (
        <main>
            <Charts expenses={expenses} />
            <ExpenseStatistics expenses={expenses} />
        </main>
    )
}

export const loader = async ({request})=>{

    const userId = await requireUserSession(request)

    const expenses = await getExpenses(userId);
    if (!expenses || !expenses.length) {
        throw json({
            message:'Could not load expenses for the requested analysis for this page.',
        },
            {
                status: 404,
                statusText: '404 Not Found',
            })
    }

    return expenses;
}



export const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="error-container">
        <Error title="Analysis Error">
          <p>{error.data?.message || 'Something went wrong.'}</p>
          <p>Please try again later or <Link to="/expenses">go back to the main expenses page</Link>.</p>
        </Error>
      </main>
    );
  }

  let errorTitle = 'An Error Occurred';
  let errorMessage = 'An unknown error has occurred.';

  if (error instanceof Error) {
    errorTitle = error.name;
    errorMessage = error.message;
  }

  return (
    <main className="error-container">
      <Error title={errorTitle}>
        <p>{errorMessage}</p>
        <p>Back to <Link to="/expenses">safety</Link>.</p>
      </Error>
    </main>
  );
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}