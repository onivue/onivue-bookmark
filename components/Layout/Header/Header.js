import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import router from 'next/router'
import { HiOutlineCog, HiOutlineUser } from 'react-icons/hi'
import { BsPinAngle } from 'react-icons/bs'
import LogoIcon from '@/components/LogoIcon/LogoIcon'
import Button from '@/components/Button/Button'
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi'
import useAuthStore from '@/stores/useAuthStore'

function Header() {
    const { user, loading, logout } = useAuthStore()
    return (
        <header className="sticky top-0 z-10 flex items-center py-5 px-3 backdrop-blur lg:h-16">
            <div className="relative flex w-full items-center justify-between lg:flex-row-reverse">
                <div className="mx-2 grid h-full place-items-center rounded-lg lg:hidden">
                    <Link href="/" passHref>
                        <LogoIcon className="h-7 w-7" />
                    </Link>
                </div>
                <div className="flex items-center text-sm">
                    {/* <div className="false cursor-pointer px-3 text-zinc-400 hover:text-primary-600">
                        <HiOutlineCog className="h-8 w-8" />
                    </div> */}
                    {user && (
                        <div className="flex cursor-pointer items-center  px-3 hover:text-primary-500">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 p-2 ring-2 ring-primary-300">
                                <HiOutlineUser className="h-full w-full text-primary-500" />
                            </div>
                            <span className="ml-2 hidden  flex-grow overflow-hidden text-ellipsis whitespace-nowrap lg:block">
                                {user?.email}
                            </span>
                        </div>
                    )}

                    {user && !loading && (
                        <div className="pl-3">
                            <Button size="sm" onClick={() => logout()}>
                                <HiOutlineLogout className="h-5 w-5" />
                            </Button>
                        </div>
                    )}
                    {!user && !loading && (
                        <>
                            <Link href="/auth/login" passHref className="pl-3">
                                <Button size="sm">
                                    <HiOutlineLogin className="h-5 w-5" />
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
export default Header
