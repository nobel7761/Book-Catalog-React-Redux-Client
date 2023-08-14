import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../redux/features/books/booksApi";
import moment from "moment";

export type IBook = {
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
  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  console.log(data);

  return (
    <div className="py-8">
      <h1 className="text-[#1ABC9C] underline text-5xl pb-8 text-center uppercase font-bold">
        All {data?.data.length} Books
      </h1>

      <div className="grid grid-cols-2 gap-8">
        {data?.data.map((book: IBook, index: number) => (
          <Link
            key={index}
            to={book._id as string}
            className="flex w-full rounded-lg border border-[#111827]/10 hover:bg-gray-100"
          >
            <img
              className="object-cover w-1/4 rounded-tl-md rounded-bl-md h-64"
              src={book.image_link}
              alt={book.title}
            />
            <div className="w-full flex flex-col justify-between px-4 py-2">
              <div className="flex flex-col leading-normal">
                <p className="mb-2 uppercase text-3xl font-bold tracking-tight text-gray-900">
                  {book.title}
                </p>
                <p className="font-bold">
                  Genre:
                  <span className="font-normal text-sm ml-2">{book.genre}</span>
                </p>
                <p className="font-bold">
                  Published:
                  <span className="font-normal text-sm ml-2">
                    {moment(book.publication_date).format("MMMM Do YYYY")}
                  </span>
                </p>
                <p className="font-bold">
                  Total Reviews:
                  <span className="font-normal text-sm ml-2">
                    {book.reviews.length}
                  </span>
                </p>

                <p className="font-bold">
                  Rating:
                  <span className="font-normal text-sm ml-2">
                    {Math.floor(
                      book.reviews
                        .map((review) => review.rating)
                        .reduce((total, value) => total + value, 0) /
                        book.reviews.length
                    )}
                  </span>
                </p>
              </div>

              <div className="flex justify-end">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-gray-500 uppercase font-bold text-sm">
                    Author
                  </p>
                  <img
                    src={book.author_image}
                    alt={book.author}
                    className="h-16 w-16 rounded-full flex justify-center"
                  />
                  <p className="text-xs font-bold">{book.author}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
