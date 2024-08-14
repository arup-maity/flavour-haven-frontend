'use client'
import { axiosInstance } from '@/config/axios'
import Image from 'next/image'
import React from 'react'

const Media = () => {
   async function handleFile(e) {
      try {
         const file = e.target.files[0]
         const formData = new FormData()
         formData.append('file', file)
         formData.append('bucket', 'restaurant')
         const res = await axiosInstance.post(`/file/upload-image`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })
         console.log('Upload', res)
      } catch (error) {
         console.log('error', error)
      }
   }

   return (
      <div>
         <input type="file" id="file" name="file" multiple onChange={handleFile} />
         <Image src='http://bucket.ovh.arupmaity.in/js-test-bucket/deer.jpg' width={250} height={250} alt='' />
         <Image src='http://bucket.ovh.arupmaity.in/js-test-bucket/nature-3082832_1920.jpg' width={250} height={250} alt='' />
      </div>
   )
}

export default Media