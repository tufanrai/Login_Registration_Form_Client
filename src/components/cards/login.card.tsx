'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { CiUser, CiUnlock, CiLock } from "react-icons/ci";
import { LoginSchema } from '../schema/form.schemas';
import { ILogin } from '../interface/formInterface';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { LogUser } from '@/app/api/form.api';
import { useRouter } from 'next/navigation';

const LoginCard = () => {
    const [showPassword, setShow] = useState(false)
    const router = useRouter();
    const {mutate} = useMutation({
        mutationFn: LogUser,
        mutationKey: ["AccessUser"],
        onSuccess: (data) => {
            sessionStorage.setItem('data', data.data.full_name);
            setTimeout(() => {reset()}, 1000)
            router.replace('/')
        },
        onError: (err) => {
            console.log(err);
            reset();
        }
    })

    const {register, handleSubmit, reset, formState: { errors }} = useForm({
        resolver: yupResolver(LoginSchema)
    })

    const displayData = (data: ILogin) => {
        mutate(data)
        toast.success('data successfuly received')
    }
  return (
    <div className='max-w-100  w-full border rounded-lg px-4 md:px-8 py-2 md:py-4 backdrop-blur-sm shadow-xl/30 shadow-white'>
        <h1 className='w-full text-center font-bold text-xl py-4'>Login</h1>
        <form onSubmit={handleSubmit(displayData)} className='w-full flex flex-col items-start justify-center gap-4'>
            <div className='w-full flex flex-col items-start justify-center gap-2'>
                <label className='font-semibold text-lg relative after:absolute after:top-0 after:right-0 after:text-red-500 after:content-["*"] p-2'>
                    E-mail
                </label>
                <div className='w-full relative'>
                <input type="text" {...register('email')} className='w-full px-5 py-1 outline-none border border-1 border-white font-medium text-md text-stone-200 rounded-md' />
                <CiUser className='absolute top-2 right-4 font-bold text-xl'/>
                </div>
                {errors && errors.email?.message? (
                    <p className='w-full font-thin text-sm text-red-500 text-end'>{errors.email.message}</p>
                ): ''}
            </div>
            <div className='w-full flex flex-col items-start justify-center gap-2'>
                <label className='font-semibold text-lg relative after:absolute after:top-0 after:right-0 after:text-red-500 after:content-["*"] p-2'>
                    Password
                </label>
               <div className='w-full relative'>
                    {showPassword && showPassword? (
                        <>
                        <input {...register('password')} type="text" className='w-full px-5 py-1 outline-none border border-1 border-white font-medium text-md text-stone-200 rounded-md' />
                <CiUnlock onClick={() => setShow(!showPassword)} className='absolute top-2 right-4 font-bold text-xl cursor-pointer'/>
                        </>
                    ): (
                        <>
                        <input {...register('password')} type="password" className='w-full px-5 py-1 outline-none border border-1 border-white font-medium text-md text-stone-200 rounded-md' />
                <CiLock onClick={() => setShow(!showPassword)} className='absolute top-2 right-4 font-bold text-xl cursor-pointer'/>
                        </>
                    )}
               </div>
               {errors && errors.password?.message? (
                    <p className='w-full font-thin text-sm text-red-500 text-end'>{errors.password.message}</p>
                ): ''}
                <p className='w-full font-thin text-sm underline cursor-pointer hover:text-blue-500'>forgot password?</p>
            </div>
            <div className='w-full flex flex-col items-start justify-center gap-4'>
                <button className='w-full border rounded-md cursor-pointer py-2 font-medium text-lg ease duration-300 hover:bg-white hover:text-stone-600' type='submit'>Login</button>
            </div>
        </form>
        <hr className='my-6' />
        <div className='w-full py-4 flex items-center justify-center'>
            <p className='font-thin text-sm'>Don&apos;t have an account? <Link className='font-medium hover:underline hover:text-blue-500' href={'/auth/register'}>Register</Link></p>
        </div>
    </div>
  )
}

export default LoginCard