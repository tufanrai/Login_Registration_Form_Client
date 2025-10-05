'use client';
import Link from "next/link";
import { useEffect, useState} from 'react';


export default function Home() {

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const   data = sessionStorage.getItem('data');
    setUserName(data);
  })
  return (
    <div className="max-w-[1280px] w-full h-screen flex flex-col items-center justify-center gap-2">
        <h1 className="font-bold text-lg md:text-xl italic">Welcome to this small project where you can test the functionality of Login and Registration From!</h1>
        <h3 className="font-semibold text-md md:text-lg italic">Enjoy!!!😃</h3>
        <br />
        <hr className="w-2/3 h-[1px] bg-white"/>
        <br />
        {userName && userName !== null? (
          <>
            <h1>Welcome! {userName}, your have successfuly logedin! 🥳</h1>
          </>
        ) : (
          <>
            <p>If you are visiting for the first time then you have to create an account but if you already have an account then you can login</p>
        <p><b><i>Question?</i></b>: How do you know that the form worked?</p>
        <p>Well if the code worked then you will be redirected here to this landing page and you will see your name and a welcoming message insted of this text.</p>
          </>
        )}
        <div className="w-full flex items-center justify-center gap-8">
         <Link href={'/auth/register'}>
          <button className="w-50 flex items-center justify-center px-5 py-1 font-medium text-md md:text-lg font-white border border-white rounded-md ease duration-300 cursor-pointer hover:bg-white hover:text-black">Register</button>
         </Link>
          <Link href={'/auth/login'}>
          <button className="w-50 flex items-center justify-center px-5 py-1 font-medium text-md md:text-lg font-white border border-white rounded-md ease duration-300 cursor-pointer hover:bg-white hover:text-black">Login</button>
          </Link>
        </div>

    </div>
  );
}
