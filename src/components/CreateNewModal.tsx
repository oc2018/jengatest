/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import CreateNewForm from "./CreateNewForm";

const CreateNewModal = ({
  title,
  formInitialState,
}: {
  title: string;
  formInitialState: Record<string, any>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer text-primary">
          new {title.toLowerCase()}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-dark-100/90 text-light-400">
        <DialogHeader className="space-y-3 text-12-semibold text-center">
          <DialogTitle>Enter new {title} Details</DialogTitle>
          <DialogDescription className="text-red-400 text-xs leading-0">
            Fill all the fields
          </DialogDescription>
        </DialogHeader>
        <CreateNewForm formInitialState={formInitialState} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewModal;
