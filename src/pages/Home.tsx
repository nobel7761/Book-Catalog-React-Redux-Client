import BookCard from "../components/shared/BookCard";
import BookCardSkeleton from "../components/skeletons/BookCardSkeleton";
import { useGetBooksQuery } from "../redux/features/books/booksApi";
import { IBook } from "./AllBooks";

const Home = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  return (
    <div className="py-8">
      <h1 className="text-[#1ABC9C] underline text-5xl pb-8 text-center uppercase font-bold">
        Top 10 Books
      </h1>

      {isLoading ? (
        <BookCardSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {data?.data.slice(0, 10).map((book: IBook, index: number) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
