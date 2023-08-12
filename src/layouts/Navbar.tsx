import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="relative bg-white">
      <div className="absolute inset-0 shadow z-30 pointer-events-none" />
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <Link to="/">
              <img
                className="h-10 w-auto"
                src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/128/book-bookmark-icon.png"
                width="128"
                height="128"
                alt="logo"
              />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden"></div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <div className="flex space-x-4">
              <a
                href="/"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Docs
              </a>
            </div>
            <div className="flex items-center md:ml-12">
              <Link to="/login">
                <button> Sign in</button>
              </Link>
              <Link to="/signup">
                <button className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
