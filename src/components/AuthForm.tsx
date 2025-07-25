import { useEffect, useState } from "react";
import {
  useSignUpMutation,
  useSignInMutation,
  // useGetMeQuery,
} from "../services/userApi";
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

  // const profile = localStorage.getItem("profile");
  // const parsedProfile = profile ? JSON.parse(profile) : null;

  // const userId = parsedProfile?.user.id || undefined;
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [signup] = useSignUpMutation();
  const [signin] = useSignInMutation();
  // const skipGetme = !userId;
  // const { data: me, isSuccess } = useGetMeQuery(userId, { skip: skipGetme });
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);

  // console.log(me, isSuccess);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(formData).unwrap();
        navigate("/auth");
      } else {
        const result = await signin(formData).unwrap();
        if (result?.token) {
          setLoginSuccess(true);
          toast.success("Login Successful");
        }
      }
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      toast.error(msg);
      console.error(err);
    }
  };

  useEffect(() => {
    if (loginSuccess) navigate("/");
  }, [navigate, loginSuccess]);

  return (
    <div className="flex flex-col max-w-3xl">
      <form onSubmit={handleSubmit}>
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
