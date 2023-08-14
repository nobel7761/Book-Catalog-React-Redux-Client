import { useGetBooksQuery } from "../redux/features/books/booksApi";
import BookCard from "../components/shared/BookCard";
import BookCardSkeleton from "../components/skeletons/BookCardSkeleton";
import { Link } from "react-router-dom";

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
  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1000,
  });

  return (
    <div className="py-8">
      <h1 className="text-[#1ABC9C] underline text-5xl pb-8 text-center uppercase font-bold">
        All {data?.data.length} Books
      </h1>

      {isLoading ? (
        <BookCardSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {data?.data.map((book: IBook, index: number) => (
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
