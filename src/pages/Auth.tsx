import AuthForm from "../components/AuthForm";

const Auth = () => {
  return (
    <div className="flex w-full items-center h-full content-center flex-col">
      <div className="text-3xl font-bold">
        <h1 className="">Emirl Builders Limited</h1>
      </div>
      <div className="">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
