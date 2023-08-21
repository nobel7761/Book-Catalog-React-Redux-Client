import { toast } from "react-toastify";
import { Button } from "../shadcn/ui/button";
import LoadingIcon from "./LoadingIcon";
import { useParams } from "react-router-dom";
import { useUpdateUserFinishReadingListByEmailMutation } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hook";

const FinishReading = () => {
  const { id } = useParams();

  const { user } = useAppSelector((state) => state.user);

  const [addToFinishReadingList, { data, isLoading, isSuccess, isError }] =
    useUpdateUserFinishReadingListByEmailMutation();

  const handleFinishReadingList = () => {
    const option = {
      id: id,
      data: { email: user.email },
    };

    addToFinishReadingList(option);
  };

  if (isSuccess) {
    toast.success(data.message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  if (isError) {
    toast.error("Something Went Wrong", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div>
      <Button onClick={handleFinishReadingList}>
        {isLoading ? <LoadingIcon /> : null}Finish Reading
      </Button>
    </div>
  );
};

export default FinishReading;
