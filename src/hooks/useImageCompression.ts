import { useState } from 'react'
import imageCompression from 'browser-image-compression'

// 초기 이미지 값을 선택적으로 받는 커스텀 훅을 정의합니다.
const useImageCompression = (initialImage?: string) => {
  // 이미지 데이터 URL을 관리하는 상태 변수를 정의하고, 초기값으로 initialImage를 설정합니다.
  const [image, setImage] = useState(initialImage)

  // 압축된 파일 객체를 관리하는 상태 변수를 정의하고, 초기값으로 null을 설정합니다.
  const [compressedFile, setCompressedFile] = useState<File | null>(null)

  // 비동기 함수 compressImage를 정의합니다. 이 함수는 File 객체를 매개변수로 받아 이미지 압축을 수행합니다.
  const compressImage = async (file: File) => {
    try {
      // 이미지 압축 옵션을 정의합니다.
      const options = {
        maxSizeMB: 0.05, // 최대 파일 크기는 0.3MB
        maxWidthOrHeight: 1920, // 최대 너비 또는 높이는 1920 픽셀
        useWebWorker: true, // Web Worker를 사용하여 압축을 백그라운드에서 수행
      }

      // imageCompression 함수를 호출하여 이미지를 압축하고 결과를 compressedFile 변수에 저장합니다.
      const compressedFile = await imageCompression(file, options)

      // 압축된 파일 데이터를 상태 변수에 저장합니다.
      setCompressedFile(compressedFile)

      // FileReader 객체를 생성합니다.
      const reader = new FileReader()

      // 파일 읽기가 완료되면, 결과를 image 상태 변수에 저장합니다.
      reader.onloadend = () => {
        setImage(reader.result as string)
      }

      // 압축된 파일을 데이터 URL로 읽습니다.
      reader.readAsDataURL(compressedFile)
    } catch (error) {
      // 에러가 발생하면 콘솔에 에러 메시지를 출력합니다.
      console.error('이미지 압축 에러', error)
    }
  }

  // 훅에서 반환된 객체; 이를 사용하여 컴포넌트에서 상태 변수와 compressImage 함수에 액세스할 수 있습니다.
  return { image, setImage, compressImage, compressedFile }
}

// 커스텀 훅을 내보냅니다, 이를 통해 다른 파일에서 이 훅을 임포트할 수 있습니다.
export default useImageCompression
