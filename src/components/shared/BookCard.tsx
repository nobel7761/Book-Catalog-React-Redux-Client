import moment from "moment";
import { IBook } from "../../pages/AllBooks";

const BookCard = ({ book }: { book: IBook }) => {
  const ratingArray = book.reviews
    .map(
      (review: { user: string; rating: number; comment: string }) =>
        review.rating
    )
    .reduce((total: number, value: number) => total + value, 0);

  const rating = Math.floor(ratingArray / book.reviews.length);

  return (
    <div className="flex w-full rounded-lg border border-[#111827]/10 hover:bg-gray-100">
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
            <span className="font-normal text-sm ml-2">{rating}</span>
          </p>
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col justify-center items-center">
            <p className="text-gray-500 uppercase font-bold text-sm">Author</p>
            <img
              src={book.author_image}
              alt={book.author}
              className="h-16 w-16 rounded-full flex justify-center"
            />
            <p className="text-xs font-bold">{book.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
