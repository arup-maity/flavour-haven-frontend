'use client'
import React, { useState } from 'react'
import { createPortal } from "react-dom";
import ImageCropper from './ImageCropper'
import Image from 'next/image'
import { cn } from '@/ui-components/utils';
// import { v4 as uuidv4 } from 'uuid';

interface PropType {
   image?: string;
   onImage?: (value: string) => void;
   aspect?: number;
   className?: string;
}
const ImageUpload: React.FC<PropType> = ({ image = '', onImage, aspect = 16 / 9, className }) => {

   const [blob, setBlob] = useState<string>('')
   const [inputImg, setInputImg] = useState('')
   const [modalOpen, modalClose] = useState<boolean>(false)

   const getBlob = (blob: string) => {
      // pass blob up from the ImageCropper component
      setBlob(blob)
   }

   const handleCrop = () => {
      // const fileName = uuidv4()
      // const file: File = new File([blob], `${fileName}.jpg`, { type: "image/jpeg" });
      onImage?.(blob)
      modalClose(prev => !prev)
   }

   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // convert image file to base64 string
      if (!e.target.files) return;
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.addEventListener('load', () => {
         setInputImg(reader.result as string)
      }, false)

      if (file) {
         reader.readAsDataURL(file)
      }
      modalClose(prev => !prev)
   }

   return (
      <>
         <div className="">
            <div className={cn(`relative w-full border border-dashed aspect-[16/9]`, className)}>
               {
                  blob ? <Image src={blob} width={100} height={125} alt='' className='w-full h-full object-contain' /> :
                     (
                        image && < Image src={image} width={100} height={125} alt='' className='w-full h-full object-contain' />
                     )
               }
               <div className="flex items-center  justify-center absolute inset-0 w-full h-full z-10">
                  <span className='bg-gray-50 text-gray-500 p-1 opacity-60 rounded-full'>
                     <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"></path></svg>
                  </span>
                  <input type="file" onChange={onInputChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" />
               </div>
            </div>
         </div>
         {
            modalOpen &&
            createPortal(
               <div className="">
                  <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-[1050]">
                     <div className="w-[1000px] max-w-full h-[600px] max-h-full flex flex-col bg-white rounded p-4">
                        <div className="relative flex-grow">
                           {
                              inputImg && (
                                 <ImageCropper
                                    getBlob={getBlob}
                                    inputImg={inputImg}
                                    aspect={aspect}
                                 />
                              )
                           }
                        </div>
                        <div className="flex justify-end p-2">
                           <button onClick={handleCrop} className='border border-gray-400 rounded py-1 px-4'>Done</button>
                        </div>
                     </div>
                  </div>
                  <div className="fixed top-0 left-0 w-screen h-screen bg-[#000] transition-opacity duration-300 ease-linear z-[1040] opacity-40"></div>
               </div>
               , document.body
            )
         }
      </>
   )
}

export default ImageUpload

