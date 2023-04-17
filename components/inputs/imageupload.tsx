import { useCallback, useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';

interface ImageUploadProps {
  value: string
  onChange:(value: string) => void;
}


export default function ImageUpload({
  value,
  onChange
}:ImageUploadProps) {

  const handleUpload = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      let image = window.URL.createObjectURL(file);
      onChange(image);
    }
  },[onChange])
  
  return (
    <div className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'>
      <TbPhotoPlus size={50} />
      <input type='file' accept='image/*'onChange={handleUpload} className='absolute w-full h-full opacity-0 top-0 left-0' />
      <div className='font-semibold text-lg'>Click to upload</div>
      {value && <div className='absolute inset-0 w-full h-full'><Image alt="Upload" src={value} fill style={{objectFit: 'cover'}} /></div>}
    </div>
  )
}
