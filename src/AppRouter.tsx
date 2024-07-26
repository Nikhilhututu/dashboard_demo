import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import AdminDashboard from "./components/dhashboard/admin";
import Customer from "./components/dhashboard/customer";
import { RootState } from "./redux/store";
const AppRouter = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticate);
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/login"} element={<Login />} />
        {/* <Route path="/dashboard">
          {isAuth && user ? (
            user.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <></>
            )
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Route> */}
        {isAuth && user ? (
          user.role === "admin" ? (
            <Route path="/dashboard" element={<AdminDashboard />} />
          ) : (
            <Route path="/dashboard" element={<Customer />} />
          )
        ) : (
          <Route path={"/login"} element={<Login />} />
        )}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
