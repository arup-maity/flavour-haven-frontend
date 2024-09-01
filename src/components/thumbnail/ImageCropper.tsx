'use client'

import React, { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from './cropImage';

interface ImageCropperProps {
   getBlob: (blob: any) => void;
   inputImg: string;
   aspect: number;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ getBlob, inputImg, aspect }) => {
   const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
   const [zoom, setZoom] = useState<number>(1);

   const onCropComplete = async (_croppedArea: Area, croppedAreaPixels: Area) => {
      const croppedImage = await getCroppedImg(inputImg, croppedAreaPixels, 0);
      getBlob(croppedImage);
   };

   return (
      <Cropper
         image={inputImg}
         crop={crop}
         zoom={zoom}
         aspect={aspect}
         onCropChange={setCrop}
         onCropComplete={onCropComplete}
         onZoomChange={setZoom}
      />
   );
};

export default ImageCropper;
