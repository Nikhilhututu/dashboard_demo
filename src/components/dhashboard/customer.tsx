import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { userType } from "./usersList";
import { logout } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Customer: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const api = "http://localhost:5000/users";
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("!! user list!! ", data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchUsers();
  }, []);
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
              Customer Panel
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
                backToLogin();
              }}
            >
              admin
            </li>
            <li
              className="hover:bg-blue-300 transition-colors"
              onClick={() => {
                // backToLogin();
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
      <div className="flex justify-center px-10">
        <div className="user-container w-[60rem] capitalize shadow-md pl-4">
          <div className="grid grid-cols-6 gap-4 py-6 border-b-2 ">
            {/* <h2>id</h2> */}
            <h2>email</h2>
            <h2>first name</h2>
            <h2>last name</h2>
            <h2>address</h2>
            <h2>phone</h2>
            <div></div>
          </div>
          <ul>
            {users.map((user_item: userType) => {
              return (
                <li key={user_item.id} className="border-b-2 hover:bg-gray-100">
                  <CustomerList user={user_item} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Customer;

interface UserProps {
  user: userType;
}

const CustomerList: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-6 items-center  gap-4 py-2">
      <h2 className="pointer-events-none select-none break-words">
        {user.email}
      </h2>
      <h2 className="pointer-events-none select-none break-words">
        {user.firstname}
      </h2>
      <h2 className="pointer-events-none select-none break-words">
        {user.lastname}
      </h2>
      <h2 className="pointer-events-none select-none break-words">
        {user.address}
      </h2>
      <h2 className="pointer-events-none select-none break-words">
        {user.phone}
      </h2>
    </div>
  );
};
