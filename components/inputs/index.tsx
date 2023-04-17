import {
  FieldValues,
  UseFormRegister,
  FieldErrors
} from 'react-hook-form'


export default function Input({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}:{
  id: string;
  label:string;
  type?:string
  disabled?:boolean;
  required?:boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}) {
  return (
    <div className='w-full relative'>
      <input id={id} disabled={disabled} 
      {...register(id, {required})}
      type={type}
      className={`
        peer
        w-full
        px-4
        pb-2
        pt-7
        font-light
        bg-white
        rounded-md
        outline-none
        transition
        disabled:cursor-not-allowed
        disabled:opacity-70
        border-2
        ${errors[id] ? `
          border-rose-500
          focus:border-rose-500
        `:`
          border-neutral-300
          focus:border-black
        `}
      `}
      />
      <label className={`
        absolute
        text-sm
        duration-150
        transform
        -translate-y-3
        top-5
        z-10
        left-4
        origin-[0]
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:-translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? `text-rose-500` :`text-zinc-400`}

      `}>{label}</label>
    </div>
  )
}
