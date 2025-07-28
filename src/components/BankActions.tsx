import type React from "react";
import BankAction from "./BankAction";

const BankActions: React.FC = () => {
  const initialState = {
    type: "",
    accountId: "",
    amount: 0,
  };

  return (
    <div className="flex flex-row sm:flex-col gap-2 w-full max-w-xs border border-primary rounded-xl p-3 ">
      <div className="text-14-medium text-primary">Send Money</div>
      <div className="flex text-gray-500 justify-around">
        <BankAction data={initialState} isMobile={true} />
        <BankAction data={initialState} isMobile={false} />
      </div>
    </div>
  );
};

export default BankActions;
