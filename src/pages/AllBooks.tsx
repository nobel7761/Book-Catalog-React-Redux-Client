import { useGetBooksQuery } from "../redux/features/books/booksApi";
import BookCard from "../components/shared/BookCard";
import BookCardSkeleton from "../components/skeletons/BookCardSkeleton";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { searchTerm } from "../redux/features/books/booksSlice";

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
  user: string;
  rating: number;
  comment: string;
};

const AllBooks = () => {
  const { book } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetBooksQuery(book.searchTerm, {
    refetchOnMountOrArgChange: true,
    // pollingInterval: 1000,
  });

  console.log("books here", data);

  const handleChange = (value: string) => {
    if (value === "") {
      dispatch(searchTerm(null));
    } else {
      dispatch(searchTerm(value));
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-[#1ABC9C] underline text-5xl text-center uppercase font-bold">
        All {data?.data.length} Books
      </h1>

      <div className="my-6">
        <input
          type="text"
          className="w-1/4 border-2 border-gray-300 outline-none px-3 py-1 rounded"
          placeholder="Search Book Here..."
          onChange={(e) => handleChange(e.target.value)}
        />
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
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {data?.data.length === 0 ? (
            <p>No books matched your search criteria.</p>
          ) : (
            data?.data.map((book: IBook, index: number) => (
              <Link to={`/book/${book._id}` as string} key={index}>
                <BookCard book={book} />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
