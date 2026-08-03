// components/form-dialog.tsx
"use client";

import { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DialogCloseContext = createContext<(() => void) | null>(null);

/** Call inside any form rendered as a FormDialog child to close it on success. */
export const useDialogClose = () => {
  const close = useContext(DialogCloseContext);
  if (!close) {
    throw new Error("useDialogClose must be used within a FormDialog");
  }
  return close;
};

type ProviderFormDialogProps = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const ProviderFormDialog = ({
  trigger,
  title,
  description,
  children,
}: ProviderFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogCloseContext.Provider value={close}>
          {children}
        </DialogCloseContext.Provider>
      </DialogContent>
    </Dialog>
  );
};
