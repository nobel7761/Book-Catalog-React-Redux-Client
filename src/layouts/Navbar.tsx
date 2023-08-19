import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { signOut } from "../redux/features/user/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(signOut());
    toast.success("Signed Out Successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="relative bg-[#111827]">
      <div className="absolute inset-0 shadow z-30 pointer-events-none" />
      <div className="relative z-20">
        <div className="flex justify-between items-center px-8 py-5 space-x-5">
          <div>
            <Link to="/" className="flex items-center gap-x-2">
              <img
                className="h-10 w-auto"
                src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/128/book-bookmark-icon.png"
                width="128"
                height="128"
                alt="logo"
              />
              <span className="text-[#1ABC9C] text-2xl uppercase font-bold">
                Book Catalog
              </span>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden"></div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <div className="flex space-x-4"></div>
            <div className="flex items-center ml-12 gap-x-8">
              {/* all books */}
              <Link
                to="/all-books"
                className="text-base font-medium text-gray-500 hover:text-[#1ABC9C]"
              >
                All Books
              </Link>

              {/* sign in button */}
              {!user.email && (
                <Link to="/login">
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign in
                  </button>
                </Link>
              )}

              {/* log out button */}
              {user.email && (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
