import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetReviewsQuery,
  useGetSingleBookQuery,
  usePostReviewMutation,
} from "../redux/features/books/booksApi";
import { useAppSelector } from "../redux/hook";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import { useState } from "react";
import Modal from "../components/shared/Modal";
import { IBook, IReview } from "./AllBooks";
import DeleteModal from "../components/shared/DeleteModal";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  review: string;
}

const BookDetails = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook>();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleAction = (item: IBook) => {
    openModal();
    setSelectedBook(item);
  };

  const { data } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1000,
  });

  const [deleteBook, { isSuccess, isError }] = useDeleteBookMutation();
  const { data: reviews } = useGetReviewsQuery(id);

  const ratingArray = data?.data?.reviews
    .map(
      (review: { user: string; rating: number; comment: string }) =>
        review.rating
    )
    .reduce((total: number, value: number) => total + value, 0);

  const rating = Math.floor(ratingArray / data?.data?.reviews.length);

  const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteBook(selectedBook._id);

    if (isSuccess) {
      navigate("/all-books");
      toast.success("Successfully Deleted The Book", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (isError) {
      toast.error("Something went wrong", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const { register, handleSubmit } = useForm<Inputs>();
  const [postReview, { isSuccess: ReviewSuccess, isError: ReviewError }] =
    usePostReviewMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const bookData = {
      name: user.email,
      review: data.review,
    };

    const options = {
      id: id,
      review: bookData,
    };

    postReview(options);
    console.log("review", options);

    if (ReviewSuccess) {
      toast.success("Review Posted Successfully", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (ReviewError) {
      toast.error("Something Went Wrong!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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
                  <MdDelete
                    className="text-5xl hover:text-red-500 cursor-pointer"
                    onClick={() => handleAction(data?.data)}
                  />
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
            <span className="font-normal text-base ml-2">
              {rating ? rating : "-"}
            </span>
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

      <div>
        <p className="uppercase text-center font-bold text-2xl py-4">Reviews</p>
        {reviews?.data.map((review: IReview, index: number) => (
          <div
            key={index}
            className={`flex gap-x-2 items-center pb-6 border-b border-black ${
              user.email === review.name ? "justify-end" : "justify-start"
            }`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="avatar"
              className={`w-16 h-16 ${
                user.email === review.name ? "order-2" : ""
              }`}
            />
            <div>
              <p className="uppercase font-bold text-[#1ABC9C]">
                {review.name}
              </p>
              <p
                className={`text-sm font-bold flex ${
                  user.email === review.name ? "justify-end" : ""
                }`}
              >
                {review.review}
              </p>
              {/* <p>{review.rating}</p> */}
            </div>
          </div>
        ))}
      </div>

      {user.email && (
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register("review", { required: true })}
              className="border border-[#111827]/30 rounded w-full h-auto outline-none px-3 py-1"
              placeholder="type your review here..."
            ></textarea>

            <button
              type="submit"
              className="bg-[#1ABC9C]/70 hover:bg-[#1ABC9C] text-black hover:text-white py-1 rounded-md w-full"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <DeleteModal
          book={selectedBook!}
          closeModal={closeModal}
          handleDelete={handleDelete}
          name={data?.data?.title}
        />
      </Modal>
    </div>
  );
};

export default BookDetails;
