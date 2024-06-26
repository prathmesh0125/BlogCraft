import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SignupInput } from "@bidve1/blogcraft-common";

import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
    aboutuser: " ",
  });
  const [loading, setLoading] = useState(false);

  async function sendRequest() {
    try {
      setLoading(true); // Set loading to true when request starts

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      toast.success(
        `${type === "signup" ? "Signup" : "Signin"} in successfully!`
      );
     // Decode JWT token to get username
    const decodedToken = jwtDecode<any>(jwt);
    console.log("Decoded Token:", decodedToken.username)

    // if (decodedToken.username) {
    //   console.log("Username:", decodedToken.name);
    // } else {
    //   console.error("Username not found in token");
    // }

      navigate("/blogs");
    } catch (error: any) {
      // Handle specific error cases
      if (error.response.status === 411) {
        // If sign-in fails due to incorrect credentials
        toast.error("Incorrect email or password. Please try again.");
      } else if (error.response) {
        toast.error("somthing happend wrong ");
      } else {
        // For other errors
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); // Reset loading to false when request completes
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col bg-gray-100  ">
      <div className="flex justify-center border-red-600 ">
        <div className=" px-10 py-10 shadow-md">
          <div className="px-10">
            {" "}
            <div className="text-3xl font-extrabold text-center">
              {type === "signin" ? "Welcome back" : "Sign Up"}
            </div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Enter your email and password to sign in."
                : "Enter your email and password to create an account."}
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="name"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}
            <LabelledInput
              label="email"
              placeholder="abc@email.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="123456"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            {type === "signup" ? (
              <LabelledInput
                label="About"
                type={"textarea"}
                rows={5}
                placeholder="write smothing about you"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    aboutuser: e.target.value,
                  });
                }}
              />
            ) : null}
            <button
              onClick={sendRequest}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              disabled={loading} // Disable the button when loading is true
            >
              {" "}
              {loading
                ? "Loading..."
                : type === "signup"
                ? "Sign up"
                : "Sign in"}
            </button>
          </div>
          <div className="text-slate-500">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              className="pl-2 underline"
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  rows?: number;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
  rows,
}: LabelledInputType) {
  const InputComponent = type === "textarea" ? "textarea" : "input";
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <InputComponent
        // @ts-ignore
        onChange={onChange}
        type={
          type === "password"
            ? showPassword
              ? "text"
              : "password"
            : type || "text"
        }
        id={label.toLowerCase().replace(/\s/g, "_")}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        rows={type === "textarea" ? rows || 3 : undefined} // Set rows only for textarea
        required
      />
      {type === "password" && (
        <div
          className="relative -top-7 left-[20rem] flex items-center text-sm leading-5 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}
    </div>
  );
}
