'use client'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'

const ImageCropper = ({ getBlob, inputImg ,aspect}) => {
   const [crop, setCrop] = useState({ x: 0, y: 0 })
   const [zoom, setZoom] = useState(1)

   /* onCropComplete() will occur each time the user modifies the cropped area, 
   which isn't ideal. A better implementation would be getting the blob 
   only when the user hits the submit button, but this works for now  */
   const onCropComplete = async (croppedArea, croppedAreaPixels) => {
      const croppedImage = await getCroppedImg(
         inputImg,
         croppedAreaPixels,
         0
      )
      getBlob(croppedImage)
   }

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
   )
}

export default ImageCropper