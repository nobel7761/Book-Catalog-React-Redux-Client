import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import { useAppDispatch } from "./redux/hook";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    //! doing this for user persistency. which means, setting the user in state so that when changing route the user do not logged out automatically
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <MainLayout />
    </div>
  );
};

export default App;
