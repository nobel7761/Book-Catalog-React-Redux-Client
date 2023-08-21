import { Link } from "react-router-dom";
import { useGetSingleBookQuery } from "../../redux/features/books/booksApi";
import BookCard from "./BookCard";

const FeaturedComponent = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleBookQuery(id);

  const book = data?.data;

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
