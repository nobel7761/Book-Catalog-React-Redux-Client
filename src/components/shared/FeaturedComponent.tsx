import { Link } from "react-router-dom";
import { useGetSingleBookQuery } from "../../redux/features/books/booksApi";
import BookCard from "./BookCard";
import { IBook } from "../../pages/AllBooks";

const FeaturedComponent = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1000,
  });

  const book: IBook = data?.data;

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Link to={`/book/${book._id}` as string}>
          <BookCard book={book} />
        </Link>
      )}
    </div>
  );
};
export default FeaturedComponent;
