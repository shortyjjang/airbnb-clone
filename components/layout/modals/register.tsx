import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from 'react-icons/fc'
import {useState, useCallback} from 'react'
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import useRegisterModal from "../../hooks/useRegisterModal"
import Modal from "."
import Heading from "../../heading"
import Input from "../../inputs"
import { toast } from "react-hot-toast"
import Button from "../../button"
import {signIn} from 'next-auth/react'
import useLoginModal from "../../hooks/useLoginModal"

export default function RegisterModal() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    try {
      await axios.post('/api/register', data)
      registerModal.onClose()
      setIsLoading(false)
    }catch(e) {
      toast.error('에러가 발생했습니다')
    }
  }
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen()
  },[loginModal, registerModal])
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account"/>
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
    </div>
  )
  const footerContent = (
    <div className="flex flex-col gap-4 mt-6">
      <hr />
      <Button outline label="Signup with Google" icon={FcGoogle} onClick={() => signIn('github')} />
      <Button outline label="Signup with Github" icon={AiFillGithub} onClick={() => signIn('google')} />
      <div className="
        text-neutral-500
        text-center
        mt4
        font-light
      ">
        Already have an account
        <span onClick={toggle} className="
          text-neutral-800
          cursor-pointer
          hover:underline
          ml-2
        ">Login</span>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
