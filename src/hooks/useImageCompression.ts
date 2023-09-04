// useImageCompression.ts

import { useState } from 'react'
import imageCompression from 'browser-image-compression'

const useImageCompression = (initialImage?: string) => {
  const [image, setImage] = useState(initialImage)
  const [compressedFile, setCompressedFile] = useState<File | null>(null)

  const compressImage = async (file: File) => {
    try {
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }

      const compressedFile = await imageCompression(file, options)
      setCompressedFile(compressedFile)

      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(compressedFile)
    } catch (error) {
      console.error('이미지 압축 에러', error)
    }
  }

  return { image, setImage, compressImage, compressedFile }
}

export default useImageCompression
