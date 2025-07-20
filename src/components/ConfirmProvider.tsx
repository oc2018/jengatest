import { useState, type ReactNode } from "react";
import { Button } from "./ui/button";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ConfirmContext } from "@/lib/utils";

interface ConfirmProviderProps {
  children: ReactNode;
}

const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
  const [opts, setOpts] = useState<null | {
    title: string;
    description: string;
    resolve: (v: boolean) => void;
  }>(null);

  const open = Boolean(opts);

  const confirm = (o: { title: string; description: string }) =>
    new Promise<boolean>((res) => setOpts({ ...o, resolve: res }));

  const handleClose = (result: boolean) => {
    opts?.resolve(result);
    setOpts(null);
  };
  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <AlertDialog.Root
        open={open}
        onOpenChange={(val) => {
          if (!val) handleClose(false);
        }}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed flex flex-col gap-5 text-light-300 text-14-medium items-center bg-dark-100/80 rounded-xl  p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <AlertDialog.Title className="text-red text-2xl font-bold">
              {opts?.title}
            </AlertDialog.Title>
            <AlertDialog.Description>
              {opts?.description}
            </AlertDialog.Description>
            <div className="flex gap-2">
              <AlertDialog.Cancel asChild>
                <Button
                  onClick={() => handleClose(false)}
                  className="font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  onClick={() => handleClose(true)}
                  className="font-bold rounded-lg cursor-pointer"
                >
                  Confirm
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </ConfirmContext.Provider>
  );
};

export default ConfirmProvider;
