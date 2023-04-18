'use client';
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from 'react-icons/fc'
import {useState, useCallback} from 'react'
import {signIn} from 'next-auth/react'
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import useLoginModal from "../../hooks/useLoginModal"
import Modal from "."
import Heading from "../../heading"
import Input from "../../inputs"
import { toast } from "react-hot-toast"
import Button from "../../button"
import { useRouter } from "next/navigation"
import useRegisterModal from "../../hooks/useRegisterModal"

export default function LoginModal() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      console.log(callback)
      setIsLoading(false)
      if(callback?.ok) {
        toast.success('Logged in');
        router.refresh()
        loginModal.onClose()
      }
      if(callback?.error) {
        toast.error(callback.error)
      }
    })
  }
  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  },[loginModal, registerModal])
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account"/>
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
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
        First time using Airbnb?
        <span onClick={toggle} className="
          text-neutral-800
          cursor-pointer
          hover:underline
          ml-2
        ">Create an account</span>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
