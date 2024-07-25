import { toast } from 'sonner';

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