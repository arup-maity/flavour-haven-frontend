import clsx from 'clsx';
import { toast } from 'sonner';
import { twMerge } from "tailwind-merge";

export function handleApiError(error: any) {
   if (error.response && error.response.status === 409) {
      if (!error.response.data?.success) {
         toast.error(error.response.data?.message);
         return error.response.data?.message
      }
   } else {
      console.error('API request failed:', error);
      return 'Something went wrong'
   }
}


export function cn(...args: any[]) {
   return twMerge(clsx(args));
}
