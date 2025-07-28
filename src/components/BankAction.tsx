import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import DetailsModal from "./DetailsModal";

const BankAction: React.FC<SendMoneyFormData> = ({ data, isMobile }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="cursor-pointer text-sm text-gray-600"
        >
          {isMobile ? "to Mobile" : "to Bank"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-dark-100/90 text-light-400">
        <DialogHeader className="space-y-3">
          <DialogTitle>Send Money</DialogTitle>
          <DialogDescription>
            Send money to another bank account
          </DialogDescription>
        </DialogHeader>
        <DetailsModal data={data} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default BankAction;
