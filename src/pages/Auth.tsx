import AuthForm from "../components/AuthForm";
import logo from "@/assets/logo.png";

const Auth = () => {
  return (
    <section className="flex flex-col h-screen w-screen justify-center items-center p-10 ">
      <div className="">
        <img src={logo} alt="logo" width={200} />
      </div>
      <div className="max-w-3xl">
        <AuthForm />
      </div>
    </section>
  );
};

export default Auth;
