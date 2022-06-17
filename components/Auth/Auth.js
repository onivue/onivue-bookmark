import React from 'react'
import { useState } from 'react'
import useAuthStore from '@/stores/useAuthStore'
import Button from '@/components/Button/Button'
import LogoIcon from '@/components/LogoIcon/LogoIcon'
import Link from 'next/link'

const Auth = ({ mode }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = useAuthStore((state) => state.login)
    const register = useAuthStore((state) => state.register)
    const resetPassword = useAuthStore((state) => state.resetPassword)
    const errorMessage = useAuthStore((state) => state.errorMessage)

    const buttonName =
        mode === 'login'
            ? 'LOGIN'
            : mode === 'register'
            ? 'REGISTER'
            : mode === 'resetpassword' && 'RESET PASSWORD'

    return (
        <div className="grid h-screen grid-cols-1 justify-items-center lg:grid-cols-2 lg:pb-4">
            <div className="order-last hidden w-full rounded-bl-2xl bg-gradient-to-br from-blue-400 to-green-400 shadow-xl transition-all lg:block"></div>
            <div className="flex w-full flex-col items-center justify-center p-4">
                <Link href="/">
                    <a>
                        <LogoIcon className="h-12 w-12" />
                    </a>
                </Link>
                <div className="w-full max-w-md rounded-xl  px-8 py-12 ">
                    <form className="flex flex-col justify-around space-y-8">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium ">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 "
                                />
                            </div>
                        </div>

                        {mode !== 'resetpassword' && (
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium ">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 "
                                    />
                                </div>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="mt-3 rounded-lg border-2 border-red-400 bg-red-200 p-3 text-sm text-red-700">
                                {errorMessage}
                            </div>
                        )}

                        <Button
                            label="login"
                            className="w-full"
                            onClick={async (e) => {
                                e.preventDefault()
                                mode === 'login' && login(email, password)
                                mode === 'register' && register(email, password)
                                mode === 'resetpassword' && resetPassword(email, password)
                            }}
                        >
                            {buttonName}
                        </Button>
                        <div className="mt-24 flex justify-between text-gray-400">
                            {mode !== 'register' && (
                                <Link href="/auth/register">
                                    <a>Register here</a>
                                </Link>
                            )}

                            {mode !== 'resetpassword' && (
                                <Link href="/auth/resetpassword">
                                    <a>Forgot your password?</a>
                                </Link>
                            )}

                            {mode !== 'login' && (
                                <Link href="/auth/login">
                                    <a>Login</a>
                                </Link>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth
