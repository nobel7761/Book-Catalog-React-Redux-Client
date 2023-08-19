import MainLayout from "./layouts/MainLayout";
import { useAppDispatch } from "./redux/hook";
import { signIn } from "./redux/features/user/userSlice";

const App = () => {
  const dispatch = useAppDispatch();

  const storedUserData = sessionStorage.getItem("user");
  if (storedUserData !== null) {
    const userData = JSON.parse(storedUserData);
    dispatch(signIn(userData.email));
  }

  return (
    <div>
      <MainLayout />
    </div>
  );
};

export default App;
