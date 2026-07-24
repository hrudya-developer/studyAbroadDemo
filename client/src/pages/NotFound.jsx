import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Medcity Study Abroad</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-black text-darkPrimary">
          Page Not Found
        </h1>

        <p className="mt-4 text-slate-600">
          The page you requested could not be found.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-xl bg-primary px-5 py-3 font-bold text-white"
        >
          Return Home
        </Link>
      </main>
    </>
  );
};

export default NotFound;