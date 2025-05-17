'use client'

import React,  { useEffect,  useState } from 'react'
import { SubmitHandler,  useForm } from 'react-hook-form'
import { useAuth } from '@/providers/Auth'

type PhoneFormValues = {
  phoneNumber: string
}

const ChangePhoneNumberSection: React.FC = () => {
  const { user, updateUser } = useAuth()
  const [message, setMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PhoneFormValues>()

  useEffect(() => {
    if (user?.phoneNumber) {
      reset({ phoneNumber: user.phoneNumber })
    }
  }, [user, reset])

  const onSubmit: SubmitHandler<PhoneFormValues> = async (data) => {
    try {
      await updateUser({ phoneNumber: data.phoneNumber })
      setMessage('Zaktualizowano numer telefonu!')
      reset({ phoneNumber: data.phoneNumber })
    } catch (error) {
      console.error(error)
      alert('Błąd aktualizacji numeru telefonu!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <h3 className="font-semibold text-xl">Zmień numer telefonu</h3>
      <div>
        <label className="block mb-1 font-medium">Numer telefonu</label>
        <input type="tel" {...register('phoneNumber')} className="p-2 border rounded w-full" />
        {errors.phoneNumber && (
          <p className="mt-1 text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>
      <button type="submit">Zapisz numer</button>
      {message && <p className="mt-2 font-medium text-sm">{message}</p>}
    </form>
  )
}

export default ChangePhoneNumberSection
