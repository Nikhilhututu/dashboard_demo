import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import CreateUser from "./createUser";
import UsersList from "./usersList";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/authSlice";
const AdminDashboard: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [create, setCreate] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onHandleCreate = () => {
    setCreate(false);
  };
  const backToLogin = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div>
      <div className="relative">
        <header>
          <div className="bg-blue-400 p-6 flex justify-between shadow-md">
            <GiHamburgerMenu
              size={32}
              className="text-slate-50 cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <h2 className="text-center text-white text-lg font-bold  m-auto">
              Admin Panel
            </h2>
          </div>
        </header>
        <div
          className={`absolute top-0  w-72 h-[100vh] bg-blue-900 cursor-pointer select-none  transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="capitalize text-white py-4 px-4 my-4 flex flex-col gap-4 text-lg">
            <li
              className="hover:bg-blue-300 transition-colors"
              onClick={() => {
                // backToLogin();
              }}
            >
              admin
            </li>
            <li
              className="hover:bg-blue-300 transition-colors"
              onClick={() => {
                backToLogin();
              }}
            >
              customer
            </li>
          </ul>
          <AiOutlineClose
            size={24}
            className="absolute right-0 top-0 m-2 text-white cursor-pointer"
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
      </div>
      <div
        className={`flex justify-center items-center gap-2 my-8 cursor-pointer ${
          create ? "hidden" : "block"
        }`}
        onClick={() => setCreate(true)}
      >
        <IoAddOutline size={28} className="text-blue-800" />
        <h2 className="text-2xl text-blue-800">Create</h2>
      </div>
      {create && <CreateUser handle={onHandleCreate} />}
      {!create && <UsersList />}
    </div>
  );
};

export default AdminDashboard;
