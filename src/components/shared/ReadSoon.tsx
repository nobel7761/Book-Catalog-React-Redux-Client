import { useParams } from "react-router-dom";
import { Button } from "../shadcn/ui/button";
import { useUpdateUserReadSoonListByEmailMutation } from "../../redux/features/user/userApi";
import LoadingIcon from "./LoadingIcon";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hook";

const ReadSoon = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);

  const [addToReadSoonList, { data, isLoading, isSuccess, isError }] =
    useUpdateUserReadSoonListByEmailMutation();

  const handleReadSoonList = () => {
    const option = {
      id: id,
      data: { email: user.email },
    };

    addToReadSoonList(option);
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
      <Button onClick={handleReadSoonList}>
        {isLoading ? <LoadingIcon /> : null}Read Soon
      </Button>
    </div>
  );
};

export default ReadSoon;
