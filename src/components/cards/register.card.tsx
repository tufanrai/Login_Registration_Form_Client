'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { CiUser, CiUnlock, CiLock, CiMail, CiPhone } from "react-icons/ci";
import { RegisterSchema } from '../schema/form.schemas';
import { IRegister } from '../interface/formInterface';
import { useMutation } from '@tanstack/react-query';
import { RegisterNewUser } from '@/app/api/form.api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const RegisterCard = () => {
    const [showPassword, setShow] = useState(false)
const router = useRouter();
    const {mutate} = useMutation({
        mutationFn: RegisterNewUser,
        mutationKey: ['RegisterNewUsere'],
        onSuccess: (data) => {
            toast.success('successfuly registered')
            setTimeout(() => {
                reset();
                router.replace('/auth/login');
            }, 1000);
        },
        onError: (err) => {
            toast.error(err.message)
            console.log(err);
            reset();
        }
    })
    const {register, handleSubmit, reset, formState: { errors }} = useForm({
        resolver: yupResolver(RegisterSchema)
    })

    const displayData = (data: IRegister) => {
        mutate(data)
    }
  return (
    <div className='max-w-100  w-full border rounded-lg px-4 md:px-8 py-2 md:py-4 backdrop-blur-sm shadow-xl/30 shadow-white'>
        <h1 className='w-full text-center font-bold text-lg py-4'>Register</h1>
        <form onSubmit={handleSubmit(displayData)} className='w-full flex flex-col items-start justify-center gap-2'>
            <div className='w-full flex flex-col items-start justify-center'>
                <label className='font-semibold text-md relative after:absolute after:top-0 after:right-0 after:text-red-500 after:content-["*"] p-2'>
                    Full name
                </label>
                <div className='w-full relative'>
                <input type="text" {...register('full_name')} className='w-full px-5 py-1 outline-none border border-1 border-white font-medium text-md text-stone-200 rounded-md' />
                <CiUser className='absolute top-2 right-4 font-bold text-xl'/>
                </div>
                {errors && errors.full_name?.message? (
                    <p className='w-full font-thin text-sm text-red-500 text-end'>{errors.full_name.message}</p>
                ): ''}
            </div>
            
            <div className='w-full flex flex-col items-start justify-center'>
                <label className='font-semibold text-md relative after:absolute after:top-0 after:right-0 after:text-red-500 after:content-["*"] p-2'>
                    E-mail
                </label>
                <div className='w-full relative'>
                <input type="text" {...register('email')} className='w-full px-5 py-1 outline-none border border-1 border-white font-medium text-md text-stone-200 rounded-md' />
                <CiMail className='absolute top-2 right-4 font-bold text-xl'/>
                </div>
                {errors && errors.email?.message? (
                    <p className='w-full font-thin text-sm text-red-500 text-end'>{errors.email.message}</p>
                ): ''}
            </div>
            <div className='w-full flex flex-col items-start justify-center'>
                <label className='font-semibold text-md relative after:absolute after:top-0 after:right-0 after:text-red-500 after:content-["*"] p-2'>
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
            </div>
            <div className='w-full flex flex-col items-start justify-center'>
                <label className='font-semibold text-md relative after:absolute after:top-0 after:right-0 after:text-red-500 after:content-["*"] p-2'>
                    Confirm password
                </label>
               <div className='w-full relative'>
                        <input {...register('confirmPassword')} type="password" className='w-full px-5 py-1 outline-none border border-1 border-white font-medium text-md text-stone-200 rounded-md' />
                        <CiLock className='absolute top-2 right-4 font-bold text-xl'/>
               </div>
               {errors && errors.confirmPassword?.message? (
                    <p className='w-full font-thin text-sm text-red-500 text-end'>{errors.confirmPassword.message}</p>
                ): ''}
            </div>
            <div className='w-full flex flex-col items-start justify-center mt-4'>
                <button className='w-full border rounded-md cursor-pointer py-2 font-medium text-lg ease duration-300 hover:bg-white hover:text-stone-600' type='submit'>Register</button>
            </div>
        </form>
        <hr className='my-6' />
        <div className='w-full py-4 flex items-center justify-center'>
            <p className='font-thin text-sm'>Already have an account? <Link className='font-medium hover:underline hover:text-blue-500' href={'/auth/login'}>Login</Link></p>
        </div>
    </div>
  )
}

export default RegisterCard