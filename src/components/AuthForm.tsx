import React, { useEffect, useState, type ChangeEvent } from "react";
import {
  useSignUpMutation,
  useSignInMutation,
  useUploadImageMutation,
  // useGetMeQuery,
} from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/utils";
import { MdCloudUpload } from "react-icons/md";

const AuthForm: React.FC = () => {
  const initialState: User = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatarUrl: "",
  };

  // const profile = localStorage.getItem("profile");
  // const parsedProfile = profile ? JSON.parse(profile) : null;

  // const userId = parsedProfile?.user.id || undefined;
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [signup] = useSignUpMutation();
  const [signin] = useSignInMutation();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const skipGetme = !userId;
  // const { data: me, isSuccess } = useGetMeQuery(userId, { skip: skipGetme });
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [uploadImage] = useUploadImageMutation();

  // console.log(me, isSuccess);

  useEffect(() => {
    if (!file || !isSignup) return;

    const fileData = new FormData();
    fileData.append("image", file);

    (async () => {
      try {
        const result = await uploadImage(fileData).unwrap();
        console.log("result:", result);
        setFormData(() => ({ ...formData, avatarUrl: result.url }));
      } catch (error) {
        toast.error(extractErrorMessage(error));
        console.log(error);
      }
    })();
  }, [file, isSignup, uploadImage]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isSignup) {
        console.log("formData:", formData);
        if (!formData.avatarUrl) return toast.error("Image upload failed");
        const result = await signup(formData).unwrap();
        console.log(result);
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

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          className="w-full border-gray-600 border my-3 p-2 rounded-lg"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={formData.password}
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {isSignup && (
          <>
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
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="avatar-input"
            />
            <label
              htmlFor="avatar-input"
              className="flex flex-row gap-3 items-center justify-center w-full h-10 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-primary transition mb-2 hover:text-primary"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Selected avatar"
                  className="w-16 h-16 object-cover rounded-full mb-2"
                />
              ) : (
                <>
                  <MdCloudUpload className="text-gray-400 text-3xl" />
                  <span className="text-gray-500 hover:text-primary text-sm my-1">
                    Upload a passport size photo
                  </span>
                </>
              )}
            </label>
          </>
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
