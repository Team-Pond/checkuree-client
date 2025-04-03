import { useEffect } from 'react'
import toast, { Toaster, useToasterStore } from 'react-hot-toast'

export function RootToaster({
  max = 10,
  ...props
}: React.ComponentProps<typeof Toaster> & {
  max?: number
}) {
  const { toasts } = useToasterStore()

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= max)
      .forEach((t) => toast.dismiss(t.id))
  }, [toasts, max])

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        // warn
        icon: (
          <img
            src="/images/icons/toast/ico-warning.svg"
            width={22}
            height={22}
          />
        ),
        className:
          '!pl-5 min-w-[358px] !rounded-2xl  !h-[56px] !bg-[#6D6D6D] !text-white !font-medium !text-md !text-center',

        // success
        success: {
          icon: (
            <img
              src="/images/icons/toast/ico-success.svg"
              width={22}
              height={22}
              data-cy="toast-success"
              aria-label="toast-success"
            />
          ),
          className:
            '!pl-5 min-w-[358px] !rounded-2xl !h-[56px] !bg-[#6D6D6D] !text-white !font-medium !text-md !text-center',
        },
        // error
        error: {
          icon: (
            <img
              src="/images/icons/toast/ico-fail.svg"
              width={22}
              height={22}
              data-cy="toast-error"
              aria-label="toast-error"
            />
          ),
          className:
            '!pl-5 min-w-[358px] !rounded-2xl !h-[56px] !bg-[#6D6D6D] !text-white !font-medium !text-md !text-center',
        },
      }}
      {...props}
    />
  )
}
