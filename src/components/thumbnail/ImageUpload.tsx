'use client'
import React, { useState } from 'react';
import ImageCropper from './ImageCropper';
import Image from 'next/image';
import { cn } from '@/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"


interface PropType {
   image: string;
   onImage: (value: string) => void;
   aspect?: number;
   className?: string;
   modal?: boolean
}

const ImageUpload: React.FC<PropType> = ({ image = '', onImage, aspect = 16 / 9, className, modal = false }) => {
   const [blob, setBlob] = useState<string>('');
   const [inputImg, setInputImg] = useState<string>('');
   const [modalOpen, modalClose] = useState<boolean>(false);

   const getBlob = (blob: string) => {
      setBlob(blob);
   };

   const handleCrop = () => {
      onImage?.(blob);
      modalClose((prev) => !prev);
      console.log('first')
   };
   const onClose = () => {
      modalClose(prev => !prev)
   }

   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener(
         'load',
         () => {
            setInputImg(reader.result as string);
         },
         false
      );

      if (file) {
         reader.readAsDataURL(file);
      }
      modalClose((prev) => !prev);
   };

   return (
      <>
         <div className="">
            <div className={cn(`relative w-full border border-dashed aspect-[16/9]`, className)}>
               {blob ? (
                  <Image src={blob} width={100} height={125} alt='' className='w-full h-full object-contain' />
               ) : (
                  <Image src={image || "/placeholder/file_placeholder.png"} width={100} height={125} alt='' className='w-full h-full object-contain' />
               )}
               <div className="flex items-center justify-center absolute inset-0 w-full h-full z-10">
                  <span className='bg-gray-50 text-gray-500 p-1 opacity-60 rounded-full'>
                     <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fillRule="evenodd"
                           d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                        />
                     </svg>
                  </span>
                  <input type="file" onChange={onInputChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" />
               </div>
            </div>
         </div>
         <Dialog open={modalOpen} onOpenChange={onClose} modal={modal}>
            <DialogContent className='w-9/12 lg:w-6/12 p-0'>
               <DialogHeader>
                  <DialogTitle>Upload Image</DialogTitle>
                  <DialogDescription className='hidden'></DialogDescription>
               </DialogHeader>
               <div className="">
                  <div className="relative w-full aspect-video">
                     {inputImg && (
                        <ImageCropper getBlob={getBlob} inputImg={inputImg} aspect={aspect} />
                     )}
                  </div>
                  <div className="flex justify-end p-2">
                     <button onClick={handleCrop} className='border border-gray-400 rounded py-1 px-4'>Done</button>
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default ImageUpload;
