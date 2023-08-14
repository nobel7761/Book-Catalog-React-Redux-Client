import { useLocation, useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/books/booksApi";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useAppSelector } from "../redux/hook";

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

const AddEditBook = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { user } = useAppSelector((state) => state.user);

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

    console.log(bookData);
  };

  let book;
  //   let loading;

  if (id) {
    const { data, isLoading } = useGetSingleBookQuery(id);
    book = data?.data;
    // loading = isLoading;
  }

  //   console.log(book);
  //   console.log(loading);

  return (
    <div>
      <p className="text-[#1ABC9C] underline text-5xl py-8 text-center uppercase font-bold">
        {pathname.includes("add-new-book") && "Add New Book"}
        {pathname.includes("edit-book") && "Edit Book"}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2/4 mx-auto flex flex-col space-y-2"
      >
        <div className="flex justify-between">
          <label className="text-2xl font-semibold">Title</label>
          <input
            {...register("title", { required: true })}
            defaultValue={book?.title}
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
            defaultValue={book?.author}
            placeholder="Book Title"
          />
          {errors.authorName && <span>Author Name is required</span>}
        </div>

        <div className="flex justify-between">
          <label className="text-2xl font-semibold">Author Image</label>
          <input
            {...register("authorImage")}
            defaultValue={book?.author_image}
            className="w-4/6 border border-gray-300 rounded-md px-3 py-1 outline-none"
            placeholder="Book Title"
          />
        </div>

        <div className="flex justify-between">
          <label className="text-2xl font-semibold">Genre</label>
          <select
            className="w-4/6 border border-gray-300 rounded-md px-3 py-1 outline-none"
            defaultValue={book?.genre}
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
            defaultValue={book?.publication_date}
            {...register("publicationDate", { required: true })}
          />
          {errors.publicationDate && <span>Publication Date is required</span>}
        </div>

        <div className="flex justify-between">
          <label className="text-2xl font-semibold">Book Image</label>
          <input
            {...register("bookImage", { required: true })}
            defaultValue={book?.image_link}
            className="w-4/6 border border-gray-300 rounded-md px-3 py-1 outline-none"
            placeholder="Book Title"
          />
          {errors.bookImage && <span>Book Image is required</span>}
        </div>

        <button
          type="submit"
          className="w-full py-1 px-3 bg-[#1ABC9C] hover:bg-[#1ABC9C]/70 rounded text-white uppercase"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEditBook;
