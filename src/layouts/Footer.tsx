import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full fixed bottom-0">
      <hr className="border-gray-200" />
      <footer className="bg-white px-8 py-4">
        <div className="flex justify-between">
          <Link to="/" className="flex">
            <img
              src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/128/book-bookmark-icon.png"
              className="h-8 mr-3"
              alt="Book Catalog Logo"
            />
            <span className="text-[#1ABC9C] text-2xl uppercase font-bold">
              Book Catalog
            </span>
          </Link>

          <div className="">
            © {new Date().getFullYear()}
            <Link
              target="_blank"
              to="https://www.linkedin.com/in/habibur-rahaman-nobel/"
              className="text-blue-500 hover:underline px-2"
            >
              Md. Habibur Rahaman.
            </Link>
            All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
