import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-purple-600 py-6">
      <div className="container mx-auto flex justify-between px-4">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">StayEasy</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-purple-600 px-3 bg-white font-bold hover:bg-slate-200 rounded "
            >
              Sign in
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
