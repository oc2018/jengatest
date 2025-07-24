import { useState } from "react";
import { useSignUpMutation, useSignInMutation } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/utils";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthForm = () => {
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
      }
      navigate("/");
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      toast.error(msg);
      console.error(err);
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
          autoComplete="new-password"
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
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        )}

        <Button className="w-full bg-primary p-2 rounded-lg text-light-300 font-bold text-xl cursor-pointer">
          {isSignup ? "Save Details" : "Login"}
        </Button>
      </form>
      <Button
        variant="ghost"
        className="w-full cursor-pointer text-primary"
        onClick={() => setIsSignup((prev) => !prev)}
      >
        {isSignup
          ? `Already have an account, Login`
          : `Don't have an account, SignUp `}
      </Button>
    </div>
  );
};

export default AuthForm;
