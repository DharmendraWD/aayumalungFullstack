
"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import logo from '../../../../public/img/logof.png'
import Link from 'next/link'
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';

const page = () => {

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = React.useState('');
const [email, setEmail] = React.useState('');
const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState('');

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

     try {
      const res = await fetch(`${BASE_API}/admin/login`,  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // important to receive HTTP-only cookie
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      toast.success('Login successful! Redirecting...');
      setTimeout(() => router.push('/admin/dashboard'), 1000);
    }catch (err) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};



  return (
  <div className="relative h-screen bg-gray-50 overflow-hidden">
    <div
        className="absolute top-20 left-2 w-[500px] h-[500px] bg-[#D1208A80] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob">
    </div>
    <div
        className="absolute top-20 right-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-2000">
    </div>
    <div
        className="hidden xl:block absolute bottom-10 left-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
    </div>
    <div
        className="absolute bottom-10 right-52 w-[500px] z-[-1] h-[500px] bg-[#CAEEF580] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
    </div>
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image className="mx-auto w-auto"
            width={300}
            height={300}
                    src={logo} alt=" Company"/>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
             
                <Link href="/admin/register" className="font-medium text-indigo-600 hover:text-indigo-500">Create An Account ?
                    </Link>
                    </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <div className="mt-1">
                            <input 
                            id="email"
                             name="email"
                             type="email" autoComplete="email"
                             value={email}
                             required=""
                               onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 text-gray-900 py-2 placeholder-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                        </div>
                    </div>

                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Password</label>
      

                       <div className="relative mt-1">
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name='password'
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 text-gray-900 py-2 placeholder-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
          </button>
        </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" defaultChecked
                            
                                    className="h-4 z-10 w-4 rounded border-gray-300  cursor-pointer text-indigo-600 focus:ring-indigo-500"/>
                            <label htmlFor="remember-me" className="ml-2  block text-sm text-gray-900" >Remember me</label>
                        </div>

                        <div className="text-sm">
                            <Link href="/admin/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your
                                password?</Link>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                        onClick={handleSubmit}
                                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign
                                in</button>
                    </div>
                </form>

                
            </div>
        </div>
    </div>
</div>
  )
}

export default page