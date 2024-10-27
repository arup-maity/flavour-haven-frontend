
import { axiosInstance } from '@/config/axios';
import { v4 as uuidv4 } from 'uuid';

export async function uploadFile(fileURL: any) {
   try {
      const fileName = uuidv4()
      const res = await fetch(fileURL);
      const blob = await res.blob();
      const file = new File([blob], `${fileName}.jpg`, { type: 'image/jpeg' });

      const datas = {
         folder: 'taxonomy',
      }

      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axiosInstance.post(`/upload/upload-image`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
      return data.object
   } catch (error) {
      console.log(error)
   }
}



// 00524dbff94e2d2503310953b8a7924ff954ba64d9