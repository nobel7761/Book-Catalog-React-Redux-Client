import { Link, useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/books/booksApi";
import { useAppSelector } from "../redux/hook";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import moment from "moment";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);

  const ratingArray = data?.data?.reviews
    .map(
      (review: { user: string; rating: number; comment: string }) =>
        review.rating
    )
    .reduce((total: number, value: number) => total + value, 0);

  const rating = Math.floor(ratingArray / data?.data?.reviews.length);

  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="py-8">
      <div className="mx-auto flex gap-x-4">
        <img
          src={data?.data?.image_link}
          alt={data?.data?.title}
          className="w-1/4"
        />
        <div className="w-full">
          <div className="w-full flex justify-between items-center">
            <p className="text-[#1ABC9C] underline text-5xl pb-8 flex justify-end uppercase font-bold">
              {data?.data?.title}
            </p>
            <div className="flex justify-between gap-x-2 items-center">
              {user.email === data?.data?.user.email && (
                <>
                  <Link to={`/edit-book/${data?.data?._id}`}>
                    <FiEdit className="text-5xl hover:text-[#1ABC9C]" />
                  </Link>
                  <MdDelete className="text-5xl hover:text-red-500" />
                </>
              )}
            </div>
          </div>

          <p className="font-bold text-xl">
            Genre:
            <span className="font-normal text-base ml-2">
              {data?.data?.genre}
            </span>
          </p>

          <p className="font-bold text-xl">
            Published:
            <span className="font-normal text-base ml-2">
              {moment(data?.data?.publication_date).format("MMMM Do YYYY")}
            </span>
          </p>
          <p className="font-bold text-xl">
            Total Reviews:
            <span className="font-normal text-base ml-2">
              {data?.data?.reviews.length}
            </span>
          </p>

          <p className="font-bold text-xl">
            Rating:
            <span className="font-normal text-base ml-2">{rating}</span>
          </p>

          <div className="flex justify-end">
            <div className="flex flex-col justify-center items-center">
              <p className="text-gray-500 uppercase font-bold text-base">
                Author
              </p>
              <img
                src={data?.data?.author_image}
                alt={data?.data?.author}
                className="h-32 w-32 rounded-full flex justify-center"
              />
              <p className="text-xl font-bold">{data?.data?.author}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
