import { useGetBooksQuery } from "../redux/features/books/booksApi";
import BookCard from "../components/shared/BookCard";
import BookCardSkeleton from "../components/skeletons/BookCardSkeleton";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomListBox from "../components/shared/CustomListBox";

export type IBook = {
  _id?: string;
  title: string;
  author: string;
  author_image: string;
  genre: string;
  user: {
    email: string;
  };
  publication_date: string;
  reviews: IReview[];
  image_link: string;
};

export type IReview = {
  name: string;
  review: string;
};

const AllBooks = () => {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const url = `searchTerm=${searchedTerm}${
    selectedGenre !== "" ? `&genre=${selectedGenre}` : ""
  }${selectedYear !== "" ? `&publication_date=${selectedYear}` : ""}`;

  const { data: BooksData, isLoading } = useGetBooksQuery(url, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1000,
  });

  const genreList = Array.from(
    new Set(BooksData?.data?.map((book: IBook) => book?.genre))
  );
  const publication_year = Array.from(
    new Set(
      BooksData?.data?.map((book: IBook) => book.publication_date.slice(0, 4))
    )
  );

  const handleChange = (value: string) => {
    setSearchedTerm(value.toLowerCase());
  };

  return (
    <div className="py-8">
      <h1 className="text-[#1ABC9C] underline text-5xl text-center uppercase font-bold">
        All {BooksData?.data.length} Books
      </h1>

      {/* search bar */}
      <div className="my-6 shadow-md shadow-black p-2 rounded-md grid grid-cols-3 gap-x-4">
        <div>
          <p className="text-gray-500 font-bold px-4 py-1">Search Book:</p>
          <input
            type="text"
            className="w-full border-2 border-gray-300 outline-none px-3 py-1 rounded"
            placeholder="Search Book Here by Title, Author or Genre..."
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        <div className="">
          <p className="text-gray-500 font-bold px-4 py-1">Filters by Genre</p>
          {!isLoading && (
            <CustomListBox
              data={genreList}
              selected={selectedGenre}
              setSelected={setSelectedGenre}
            />
          )}
        </div>

        <div>
          <p className="text-gray-500 font-bold px-4 py-1">
            Filters by Publication Year
          </p>
          {!isLoading && (
            <CustomListBox
              data={publication_year}
              selected={selectedYear}
              setSelected={setSelectedYear}
            />
          )}
        </div>
      </div>

      {/* add new book */}
      <div className="w-2/3 mx-auto mb-6">
        <Link to="/add-new-book">
          <button className="w-full text-base font-medium text-white rounded py-1 bg-[#1ABC9C] hover:bg-[#1ABC9C]/80">
            Add New Book
          </button>
        </Link>
      </div>

      {isLoading ? (
        <BookCardSkeleton />
      ) : BooksData?.data.length === 0 ? (
        <p className="text-red-500 text-3xl font-bold uppercase text-center">
          No books matched your search criteria.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {BooksData?.data.map((book: IBook, index: number) => (
            <Link to={`/book/${book._id}` as string} key={index}>
              <BookCard book={book} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
