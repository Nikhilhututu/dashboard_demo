import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logInApi } from "../../api/authApi";
import { reset } from "../../redux/slice/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const status = useSelector((state: RootState) => state.auth.status);
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  // console.log(isAuth,"dDSDSDS");
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logInApi(loginData));
  };
  React.useEffect(() => {
    if (status ==="succeed") {
      navigate("/dashboard");
      dispatch(reset());
    }
    if (status === "failed") {
      setShow(true);
      const tout = setTimeout(() => {
        clearTimeout(tout);
        setShow(false);
      }, 2000);
    }
  }, [status]);
  return (
    <div className="block  text-center py-20 ">
      <h2 className="text-2xl mb-8">Login to your account</h2>
      <div className=" w-fit mx-auto">
        <form
          className="flex flex-col gap-4 items-center justify-center"
          onSubmit={(e) => handleLogin(e)}
        >
          <div className="flex flex-col capitalize text-gray-600">
            <label className="text-gray-700 font-normal text-sm self-start justify-self-start">
              email
            </label>
            <input
              className="capitalize w-80 border-[1px] text-sm  border-gray-500 text-gray-600 rounded-md py-1.5 px-4 placeholder:text-gray-400"
              type="email"
              name="email"
              value={loginData.email}
              placeholder="enter your name"
              required
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col capitalize text-gray-600">
            <label className="text-gray-700 font-normal text-sm self-start justify-self-start">
              Password
            </label>
            <input
              className="capitalize w-80 border-[1px] text-sm border-gray-500 text-gray-600 rounded-md py-1.5 px-4 placeholder:text-gray-400"
              type="password"
              name="password"
              value={loginData.password}
              placeholder="enter your password"
              required
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full capitalize bg-blue-600 text-white py-2 px-8 rounded-xl hover:scale-90 transition-transform duration-300"
          >
            login
          </button>
          <div className="font-normal">
            Don't have an account?
            <Link to={"/signup"}>
              <label
                className="mx-2 cursor-pointer text-blue-600"
                htmlFor="sign up"
              >
                Sign up
              </label>
            </Link>
          </div>
        </form>
        {status === "failed" && (
          <div
            className={`rounded-md bg-red-400 text-white p-4 ${
              show ? "block" : "hidden"
            }`}
          >
            please enter correct details
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
