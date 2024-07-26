import React from "react";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/slice/authSlice";
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.auth.status);
  const error = useSelector((state: RootState) => state.auth.error);
  const [signUpData, setSignUpData] = React.useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role:"admin",
  });
  React.useEffect(() => {
    if (status === "succeed") {
      navigate("/login");
      dispatch(reset());
    }
  }, [status, navigate]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      ...signUpData,
      id: new Date().getTime() + "",
    };
    console.log(user);
    dispatch(signUp(user));
  };
  const onValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="block  text-center py-20 ">
      <h2 className="text-2xl">Create your account</h2>
      <h4 className="text-gray-500 font-light text-sm  mb-8">
        Register your account
      </h4>
      <div className=" w-fit mx-auto">
        <form
          className="flex flex-col gap-4 items-center justify-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col capitalize text-gray-600">
            <label className="text-gray-700 font-normal text-sm self-start justify-self-start">
              first name
            </label>
            <input
              className="capitalize w-80 border-[1px] text-sm  border-gray-500 text-gray-600 rounded-md py-1.5 px-4 placeholder:text-gray-400"
              type="text"
              name="firstname"
              value={signUpData.firstname}
              placeholder="enter your name"
              required
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div className="flex flex-col capitalize text-gray-600">
            <label className="text-gray-700 font-normal text-sm self-start justify-self-start">
              last name
            </label>
            <input
              className="capitalize w-80 border-[1px] text-sm border-gray-500 text-gray-600 rounded-md py-1.5 px-4 placeholder:text-gray-400"
              type="text"
              name="lastname"
              value={signUpData.lastname}
              placeholder="enter your last name"
              required
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div className="flex flex-col capitalize text-gray-600">
            <label className="text-gray-700 font-normal text-sm self-start justify-self-start">
              email
            </label>
            <input
              className="capitalize w-80 border-[1px] text-sm border-gray-500 text-gray-600 rounded-md py-1.5 px-4 placeholder:text-gray-400"
              type="email"
              name="email"
              value={signUpData.email}
              placeholder="enter your email"
              required
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div className="flex flex-col capitalize text-gray-600">
            <label className="text-gray-700 font-normal text-sm self-start justify-self-start">
              password
            </label>
            <input
              className="capitalize w-80 border-[1px] text-sm border-gray-500 text-gray-600 rounded-md py-1.5 px-4 placeholder:text-gray-400"
              type="password"
              name="password"
              value={signUpData.password}
              placeholder="enter your password"
              required
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div className="flex flex-col capitalize text-gray-600">
            <label className="text-gray-700 font-normal text-sm self-start justify-self-start">
              phone
            </label>
            <input
              className="capitalize w-80 border-[1px] text-sm border-gray-500 text-gray-600 rounded-md py-1.5 px-4 placeholder:text-gray-400"
              type="number"
              name="phone"
              value={signUpData.phone}
              placeholder="enter your phone number"
              required
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div className="flex flex-col capitalize text-gray-600">
            <label className="text-gray-700 font-normal text-sm self-start justify-self-start">
              address
            </label>
            <input
              className="capitalize w-80 border-[1px] text-sm border-gray-500 text-gray-600 rounded-md py-1.5 px-4 placeholder:text-gray-400"
              type="text"
              name="address"
              value={signUpData.address}
              placeholder="enter your phone address"
              required
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div className="w-full">
            <select
              className="w-full border-[1px] border-gray-500 py-1.5 px-4 capitalize rounded-md"
              onChange={(e) => {
                setSignUpData({
                  ...signUpData,
                  role: e.target.value,
                });
              }}
            >
              <option value="admin">admin</option>
              <option value="customer">customer</option>
              <option value="" disabled></option>
            </select>
          </div>
          <button className="w-full capitalize bg-blue-600 text-white py-2 px-8 rounded-xl active:scale-90 transition-transform duration-300">
            sign up
          </button>
          <div className="font-normal">
            Already have an account?
            <Link to={"/login"}>
              <label
                className="mx-2 cursor-pointer text-blue-600"
                htmlFor="sign in"
              >
                Sign in
              </label>
            </Link>
          </div>
        </form>
      </div>
      {status === "loading" && <div>loading</div>}
      {status === "failed" && <div>{error}</div>}
    </div>
  );
};
export default SignUp;
