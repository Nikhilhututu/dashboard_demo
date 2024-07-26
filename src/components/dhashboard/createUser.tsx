import React from "react";
type CreateUserProps = {
  handle: () => void;
};
const CreateUser: React.FC<CreateUserProps> = ({ handle }) => {
  interface userInfo {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
  }
  const initialData: userInfo = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
  };
  const [userData, setUserData] = React.useState(initialData);
  const [error, setError] = React.useState({ show: false, msg: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error.show) return;
    const user = {
      ...userData,
      id: new Date().getTime() + "",
    };
    addUser(user);
    setUserData(initialData);
  };
  const addUser = async (user: any) => {
    const api = "http://localhost:5000/users";
    try {
      const checkResponse = await fetch(`${api}?email=${user.email}`);
      const existingUsers = await checkResponse.json();
      if (existingUsers.length > 0) {
        throw new Error("User with this email already exists");
      }
      await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      handle();
    } catch (error) {
      console.log(error);
      setError({ show: true, msg: error + "" });
      setTimeout(() => {
        setError({ show: false, msg: "" });
      }, 2000);
    }
  };
  const onValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex justify-center capitalize flex-col items-center">
      <h2 className="font-bold text-2xl">Create user</h2>
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
            value={userData.firstname}
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
            value={userData.lastname}
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
            value={userData.email}
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
            value={userData.phone}
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
            value={userData.address}
            placeholder="enter your phone address"
            required
            onChange={(e) => onValueChange(e)}
          />
        </div>
        <button className="py-2 px-6 capitalize bg-blue-500 text-white rounded-md hover:scale-90 transition-transform duration-300">
          create user
        </button>
      </form>
      {error.show && (
        <div className="bg-red-400 text-white p-4 rounded "> {error.msg} </div>
      )}
    </div>
  );
};

export default CreateUser;
