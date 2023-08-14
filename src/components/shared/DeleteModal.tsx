import { useState } from "react";
import { IBook } from "../../pages/AllBooks";

const DeleteModal = ({
  book,
  closeModal,
  handleDelete,
  name,
  message,
}: {
  book: IBook;
  closeModal: () => void;
  handleDelete: () => void;
  name: string;
  message?: string;
}) => {
  const [disabled, setDisabled] = useState(true);

  const checkName = (name: String) => {
    if (name === book.title) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <div className="w-full overflow-hidden space-y-3">
      <h2 className="text-2xl font-semibold">Confirm Deletion</h2>
      <p className="text-normal">
        {message ? (
          message
        ) : (
          <>
            Please type &quot;<b>{name}</b>&ldquo; to delete.
          </>
        )}
      </p>

      <input
        className={`appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tigh focus:shadow-outline ${
          disabled ? "focus:outline-red-500" : "focus:outline-green-500"
        }`}
        autoFocus
        id="name"
        type="text"
        onChange={(e) => checkName(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleDelete}
          disabled={disabled}
          className={`w-1/4 whitespace-nowrap ${
            disabled ? "bg-red-200 cursor-not-allowed" : "bg-[#f00d00]"
          } text-white font-medium py-2 px-6 rounded focus:outline-none focus:shadow-outline`}
        >
          Delete
        </button>

        <button
          type="button"
          onClick={closeModal}
          className="w-1/4 rounded py-2 bg-blue-500 text-white/60 font-medium text-normal leading-6 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
