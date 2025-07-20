import { useState } from "react";
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

const Action = ({
  data,
  title,
}: {
  data: Tenant | Property| Expense;
  title: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer text-primary" variant="ghost">
          edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-dark-100/90 text-light-400">
        <DialogHeader className="space-y-3 text-12-semibold">
          <DialogTitle>{title} Details</DialogTitle>
          <DialogDescription>Edit details here..</DialogDescription>
        </DialogHeader>
        <DetailsModal data={data} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default Action;
