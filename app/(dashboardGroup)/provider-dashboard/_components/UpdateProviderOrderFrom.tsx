// components/update-status-form.tsx
"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDialogClose } from "./ProviderFormDialog";

export type StatusUpdateState = {
  success: boolean;
  message?: string;
} | null;

export type UpdateProviderStatusFormProps = {
  id: string;
  currentStatus: string;
  statusOptions: string[];
  action: (
    prevState: StatusUpdateState,
    formData: FormData,
  ) => Promise<StatusUpdateState>;
};

export const UpdateProviderStatusForm = ({
  id,
  currentStatus,
  statusOptions,
  action,
}: UpdateProviderStatusFormProps) => {
  const [state, formAction, isPending] = useActionState(action, null);
  const close = useDialogClose();

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message ?? "Updated successfully.");
      close();
    } else {
      toast.error(state.message ?? "Something went wrong.");
    }
  }, [state, close]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={id} />

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue={currentStatus}>
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
};
