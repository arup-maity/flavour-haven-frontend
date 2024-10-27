import clsx from 'clsx';
import { toast } from 'sonner';
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from 'uuid';

export function handleApiError(error: any) {
   if (error.response && error.response.status === 409) {
      if (error.response.data?.success === false) {
         toast.error(error.response.data?.message);
         return error.response.data?.message
      }
      if (error.response.data?.type === 'zod') {
         console.log('type', error.response.data?.type)
         error.response.data.errors?.map((error: any) => toast.error(error?.message))
      }
   } else {
      console.error('API request failed:', error);
      return 'Something went wrong'
   }
}


export function cn(...args: any[]) {
   return twMerge(clsx(args));
}

export async function blobToImage(blobUrl: string) {
   try {
      const fileName = uuidv4()
      const res = await fetch(blobUrl);
      const blob = await res.blob();
      const file = new File([blob], `${fileName}.png`, { type: 'image/png' })
      return file
   } catch (error) {
      return ''
   }
}
