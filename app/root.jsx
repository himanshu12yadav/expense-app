import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useRouteError,
} from "@remix-run/react";


import sharedStyles from './styles/shared.css?url';
import Error from './components/util/Error';
import "./tailwind.css";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel:"stylesheet",
    href: sharedStyles
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout() {
  return (
    <Document>
      <Outlet/>
    </Document>
  );
}

function Document({title, children}){
  return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <title>{title}</title>
        <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
            rel="stylesheet"
        />
        <Links />
      </head>
      <body>

      {children}
      <ScrollRestoration />
      <Scripts />
      </body>
      </html>
  )
}

export const ErrorBoundary = () => {
  const error = useRouteError();

  // Handle errors that are thrown Responses (e.g., 404s)
  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`Error: ${error.status}`}>
        <Error title={`${error.status} ${error.statusText}`}>
          {/* The 'data' property often contains a useful message */}
          <p>{error.data?.message || 'An error occurred.'}</p>
          <p>
            Back To <Link to="/">Safety</Link>
          </p>
        </Error>
      </Document>
    );
  }

  // Handle standard JavaScript Errors
  let errorTitle = 'An error occurred';
  let errorMessage = 'An unknown error has occurred.';

  if (error instanceof Error) {
    errorTitle = error.name;
    errorMessage = error.message;
  }

  return (
    <Document title={'Error - Something went wrong'}>
      <Error title={errorTitle}>
        <p>{errorMessage}</p>
        <p>
          Back To <Link to="/">Safety</Link>
        </p>
      </Error>
    </Document>
  );
};


export default function App() {
  return (
      <Document>
        <Outlet />
      </Document>

  );
}
