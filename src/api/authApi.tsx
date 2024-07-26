import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = "http://localhost:5000";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}
export const signUp = createAsyncThunk<User, any>(
  "auth/signup",
  async (user) => {
    try {
      const checkResponse = await fetch(
        `${BASE_URL}/admin?email=${user.email}`
      );
      const existingUsers = await checkResponse.json();
      if (existingUsers.length > 0) {
        throw new Error("User with this email already exists");
      }
      const response = await fetch(`${BASE_URL}/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error, "  sign up   ");
    }
  }
);

export const logInApi = createAsyncThunk<User, any>(
  "auth/login",
  async (user_info) => {
    try {
      const response = await fetch(
        `${BASE_URL}/admin?email=${user_info.email}&password=${user_info.password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.length < 1) {
        throw new Error("Invalid credentials");
      }
      return data[0];
    } catch (error) {
      console.log(error, "  login   ");
    }
  }
);
