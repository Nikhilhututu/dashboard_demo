import React from "react";
import User, { EditUser } from "./User";

export interface userType {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: number;
}
interface EditUserState {
  edit: boolean;
  user: userType | null;
}
const initialEditUserState: EditUserState = {
  edit: false,
  user: null,
};
const UsersList: React.FC = () => {
  const [users, setUsers] = React.useState([]);
  const [editUser, setEditUser] = React.useState(initialEditUserState);
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
  }, [editUser.user]);
  const handleUser = (e: any) => {
    e.stopPropagation();
    const item = e.target.querySelector(".check_box");
    if (!item) return;
    item.checked = true;
    console.log(item);
  };
  const handleDelete = (user: userType) => {
    console.log(user);
    if (!user) return;
    const deleteUser = async () => {
      try {
        const api = `http://localhost:5000/users/${user.id}`;
        const response = await fetch(api, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        fetchUsers();
      } catch (error) {
        console.log(error);
      }
    };
    deleteUser();
  };
  const handleEdit = (user: userType) => {
    if (!user) return;
    setEditUser({ edit: true, user: user });
  };
  const updateEdit = () => {
    setEditUser(initialEditUserState);
  };
  return (
    <>
      {editUser.edit && editUser.user ? (
        <div className="flex justify-center">
          <EditUser user={editUser.user} updateEdit={updateEdit} />
        </div>
      ) : (
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
                  <li
                    key={user_item.id}
                    className="border-b-2 hover:bg-gray-100"
                  >
                    <User
                      user={user_item}
                      handle={handleUser}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
export default UsersList;
