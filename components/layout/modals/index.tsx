'use client';
import {useState, useEffect, useCallback} from 'react'
import {IoMdClose} from 'react-icons/io'
import Button from '../../button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string
  disabled?:boolean;
  secodaryAction?:() => void;
  secondaryActionLabel?: string
}

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secodaryAction,
  secondaryActionLabel,
}:ModalProps) {
  const [showModal, setShowModal] = useState<boolean>(false)
  useEffect(() => {
    setShowModal(isOpen ? true : false)
  },[isOpen])

  const handleClose = useCallback(() =>{
    if(disabled) return;

    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  },[disabled, onClose])

  const handleSubmit = useCallback(() => {
    if(disabled) return;
    onSubmit()
  },[disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if(disabled || !secodaryAction) return;
    secodaryAction()
  },[disabled, secodaryAction])

  if(!isOpen) return <></>

  return (
    <>
      <div className='
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        outline-none
        focus:outline-none
        bg-neutral-800/70
        z-20
      '>
        <div className='
          relative
          w-full
          md:w-4/6
          lg:w-3/7
          xl:w-2/5
          my-6
          mx-auto
          h-full
          lg:h-auto
          md:h-auto
        '>
          <div className={`
            translate
            duration-300
            h-full
            ${showModal ? `
              translate-y-0
              opacity-100
            ` : `
              translate-y-full
              opacity-0
            `}
          `}>
            <div className='
              traqnslate
              h-full
              lg:h-auto
              md:h-auto
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-white
              outline-none
              focus:outline-none
            '>
              <div className='
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
              '>
                <div onClick={handleClose} className='
                  p-1
                  border-0
                  hover:opacity-70
                  transition
                  left-9
                  absolute
                '>
                  <IoMdClose size={18} />
                </div>
                {title && <div className='text-lg font-semibold'>{title}</div>}
              </div>
              {body && <div className='
                relative
                p-6
                flex-auto
              '>
                {body}
                <div className='
                  flex
                  flex-row
                  items-center
                  gap-4
                  w-full
                  pt-6
                '>
                  {secodaryAction && secondaryActionLabel && <Button outline onClick={handleSecondaryAction} label={secondaryActionLabel} disabled={disabled} />}
                  <Button onClick={handleSubmit} label={actionLabel} disabled={disabled} />
                </div>
                {footer}
              </div>}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
