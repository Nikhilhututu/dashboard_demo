import React from "react";
import { userType } from "./usersList";
import { MdEdit, MdDelete } from "react-icons/md";
interface UserProps {
  user: userType;
  handle: (event: React.MouseEvent) => void;
  handleDelete: (user: userType) => void;
  handleEdit: (user: userType) => void;
}

const User: React.FC<UserProps> = ({
  user,
  handle,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div
      className="grid grid-cols-6 auto-cols-min items-center  gap-4 py-2"
      onClick={(e) => handle(e)}
    >
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
      <div>
        <MdEdit
          size={24}
          className="hover:text-blue-500 transition-colors"
          onClick={() => {
            console.log(user);
            handleEdit(user);
          }}
        />
        <MdDelete
          size={24}
          className="mt-4 hover:text-blue-500 transition-colors"
          onClick={() => {
            handleDelete(user);
          }}
        />
      </div>
    </div>
  );
};

export default User;
interface EditUserProps {
  user: userType;
  updateEdit:() => void;
}
export const EditUser: React.FC<EditUserProps> = ({ user, updateEdit}) => {
  const initialValue = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    address: user.address,
  };
  const [userInfo, setEditInfo] = React.useState(initialValue);
  const onValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateUser = async () => {
      const api = `http://localhost:5000/users/${user.id}`;
      const response = await fetch(api, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      console.log(data);
      updateEdit();
    };
    updateUser();
  };
  return (
    <div className="flex justify-center capitalize flex-col items-center">
      <form
        className="flex flex-col gap-4 items-center justify-center mt-6"
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
            value={userInfo.firstname}
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
            value={userInfo.lastname}
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
            value={userInfo.email}
            placeholder="enter your email"
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
            value={userInfo.phone}
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
            value={userInfo.address}
            placeholder="enter your phone address"
            required
            onChange={(e) => onValueChange(e)}
          />
        </div>
        <button
          type="submit"
          className="py-2 px-6 capitalize bg-blue-500 text-white rounded-md hover:scale-90 transition-transform duration-300"
        >
          submit
        </button>
      </form>
    </div>
  );
};
