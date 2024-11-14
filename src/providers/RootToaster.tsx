import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

export function RootToaster({
  max = 10,
  ...props
}: React.ComponentProps<typeof Toaster> & {
  max?: number;
}) {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= max)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts, max]);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        icon: null,
        className: "min-w-[400px] !bg-gray-900 !text-white !text-center",
        success: {
          className: "min-w-[400px] !bg-green-400 !text-white !text-center",
        },
        error: {
          className: "min-w-[400px] !bg-red-700 !text-white !text-center",
        },
      }}
      {...props}
    />
  );
}
