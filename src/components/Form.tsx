import { useState } from "react";
import { useSignUpMutation, useSignInMutation } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const Form = () => {
  const initialState: User = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [signup] = useSignUpMutation();
  const [signin] = useSignInMutation();
  const navigate = useNavigate();

  const handeleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isSignup) {
        signup(formData);
      } else {
        await signin(formData).unwrap();
        // console.log("Signin success payload", payload);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col max-w-3xl">
      <form onSubmit={handeleSubmit}>
        {isSignup && (
          <input
            className="w-full border-gray-600 border my-3 p-2 rounded-lg"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}

        <input
          className="w-full border-gray-600 border my-3 p-2 rounded-lg"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          className="w-full border-gray-600 border my-3 p-2 rounded-lg"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {isSignup && (
          <input
            className="w-full border-gray-600 border my-3 p-2 rounded-lg"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        )}

        <Button className="w-full bg-primary p-2 rounded-lg">
          {isSignup ? "Save Details" : "Login"}
        </Button>
      </form>
      <Button
        variant="ghost"
        className="w-full"
        onClick={() => setIsSignup((prev) => !prev)}
      >
        {isSignup
          ? `Already have an account, Login`
          : `Don't have an account, SignUp `}
      </Button>
    </div>
  );
};

export default Form;
