'use client';
import { useAuth } from '@/context/AuthContext';
import { AuthType } from '@/types/authTypes';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const RegisterForm = () => {
  const { authUser, signUp } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<AuthType>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (authUser) {
      router.push('/');
    }
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signUp(data.email, data.password);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-background p-4 py-8 shadow-md">
        <form action="" onSubmit={handleSubmit} className="group">
          <h5 className="mb-2 text-center text-2xl font-medium text-text-900">Sign Up</h5>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-text-900"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="valid:[&:not(:placeholder-shown)]:border-primary [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:ring-blue-500"
              autoComplete="off"
              required
              pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder="name@company.com"
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
            />
            <span className="mt-1 hidden text-sm text-red-400">
              Please enter a valid email address.{' '}
            </span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-text-900"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="valid:[&:not(:placeholder-shown)]:border-primary [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[\p{P}\p{S}]).{8,}$"
              required
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
            />
            <span className="mt-1 hidden text-sm text-red-400">
              Password must be at least 8 characters, one letter, one digit, one special
              character.{' '}
            </span>
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-text-900"
            >
              Repeat password
            </label>
            <input
              type="password"
              name="password"
              id="repeatpassword"
              placeholder="••••••••"
              className="valid:[&:not(:placeholder-shown)]:border-primary [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
              pattern={data.password ? `^${data.password}$` : '.*'}
              required
            />
            <span className="mt-1 hidden text-sm text-red-400">
              Passwords do not match.{' '}
            </span>
          </div>

          <button
            type="submit"
            className="mb-8 mt-2 w-full rounded-lg bg-primary px-5 py-3 text-center text-sm font-medium text-white hover:bg-accent focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gradient-to-br disabled:from-gray-100 disabled:to-gray-300 disabled:text-gray-400 group-invalid:pointer-events-none group-invalid:bg-gradient-to-br group-invalid:from-gray-100 group-invalid:to-gray-300 group-invalid:text-gray-400 group-invalid:opacity-70"
          >
            Register your account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
