
import { axiosInstance } from '@/config/axios';
import { v4 as uuidv4 } from 'uuid';
export async function uploadFile(fileURL: any) {
   try {
      const fileName = uuidv4()
      const res = await fetch(fileURL);
      const blob = await res.blob();
      const file = new File([blob], `${fileName}.jpg`, { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append("file", file);
      formData.append('bucket', 'restaurant')
      const { data } = await axiosInstance.post(`/file/upload-image`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         }
      })
      return data.object
   } catch (error) {
      console.log(error)
   }
}
