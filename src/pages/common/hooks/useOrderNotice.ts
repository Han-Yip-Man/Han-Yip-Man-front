import toast from 'react-hot-toast'

const useOrderNotice = () => {
  const playSound = (file: string) => {
    const audio = new Audio(file)
    // audio.muted = true
    audio.autoplay = true
    // audio.play()
  }

  const orderIncoming = (component: (toast: any) => React.ReactElement, sound: string) => {
    playSound(sound)
    return toast.custom(component)
  }

  const onClose = (id: string) => {
    toast.dismiss(id)
  }

  return { orderIncoming, onClose }
}

export default useOrderNotice
