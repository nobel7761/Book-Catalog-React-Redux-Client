import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../redux/hook";
import { useCreateBookMutation } from "../redux/features/books/booksApi";
import { toast } from "react-toastify";
import LoadingIcon from "../components/shared/LoadingIcon";

const options = [
  { value: "Thriller", label: "Thriller" },
  { value: "Romance", label: "Romance" },
  { value: "Mystery", label: "Mystery" },
  { value: "Fantasy", label: "Fantasy" },
];

type Inputs = {
  title: string;
  bookImage: string;
  publicationDate: string;
  genre: string;
  authorImage?: string;
  authorName: string;
};

const AddNewBook = () => {
  const { user } = useAppSelector((state) => state.user);

  const [createBook, { isLoading, isSuccess, isError }] =
    useCreateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const bookData = {
      title: data.title,
      author: data.authorName,
      author_image: data.authorImage,
      genre: data.genre,
      user: {
        email: user?.email,
      },
      publication_date: data.publicationDate,
      image_link: data.bookImage,
    };

    createBook(bookData);
    console.log(bookData);

    if (isSuccess) {
      toast.success("Successfully Created The Book", {
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

  return (
    <div>
      <p className="text-[#1ABC9C] underline text-5xl py-8 text-center uppercase font-bold">
        Add New Book
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 mx-auto pb-8">
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex justify-between">
            <label className="text-2xl font-semibold">Title</label>
            <input
              {...register("title", { required: true })}
              className="w-4/6 border border-gray-300 rounded-md px-3 py-1 outline-none"
              placeholder="Book Title"
            />
            {errors.title && <span>Title is required</span>}
          </div>

          <div className="flex justify-between">
            <label className="text-2xl font-semibold">Author Name</label>
            <input
              {...register("authorName", { required: true })}
              className="w-4/6 border border-gray-300 rounded-md px-3 py-1 outline-none"
              placeholder="Book Title"
            />
            {errors.authorName && <span>Author Name is required</span>}
          </div>

          <div className="flex justify-between">
            <label className="text-2xl font-semibold">Author Image</label>
            <input
              {...register("authorImage")}
              className="w-4/6 border border-gray-300 rounded-md px-3 py-1 outline-none"
              placeholder="Book Title"
            />
          </div>

          <div className="flex justify-between">
            <label className="text-2xl font-semibold">Genre</label>
            <select
              className="w-4/6 border border-gray-300 rounded-md px-3 py-1 outline-none"
              {...register("genre", { required: true })}
            >
              {options.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {errors.genre && <span>Genre is required</span>}
          </div>

          <div className="flex justify-between">
            <label className="text-2xl font-semibold">Publication Date</label>
            <input
              type="date"
              className="w-4/6 border border-gray-300 rounded-md px-3 py-1 outline-none"
              {...register("publicationDate", { required: true })}
            />
            {errors.publicationDate && (
              <span>Publication Date is required</span>
            )}
          </div>

          <div className="flex justify-between">
            <label className="text-2xl font-semibold">Book Image</label>
            <input
              {...register("bookImage", { required: true })}
              className="w-4/6 border border-gray-300 rounded-md px-3 py-1 outline-none"
              placeholder="Book Title"
            />
            {errors.bookImage && <span>Book Image is required</span>}
          </div>

          <button
            type="submit"
            className="w-full py-1 px-3 bg-[#1ABC9C] hover:bg-[#1ABC9C]/70 rounded text-white uppercase"
          >
            {isLoading ? <LoadingIcon /> : null}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBook;
