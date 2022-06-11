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
    const user = useAuthStore((state) => state.user)
    const loading = useAuthStore((state) => state.loading)
    const logout = useAuthStore((state) => state.logout)
    return (
        <>
            <div className="fixed inset-x-0 z-10 h-16 w-full backdrop-blur"></div>

            <div className="sticky top-0 z-10 flex items-center py-5 px-3 lg:h-16">
                <div className="relative flex w-full items-center justify-between lg:flex-row-reverse">
                    <div className="mx-2 grid h-full place-items-center rounded-lg lg:hidden">
                        <Link href="/">
                            <a>
                                <LogoIcon className="h-7 w-7" />
                            </a>
                        </Link>
                    </div>
                    <div className="flex items-center divide-primary-200 text-sm">
                        <div className="false cursor-pointer px-3 text-zinc-400 hover:text-primary-600">
                            <HiOutlineCog className="h-8 w-8" />
                        </div>
                        <div className="flex cursor-pointer items-center  px-3 hover:text-primary-500">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 p-2 ring-2 ring-primary-300">
                                <HiOutlineUser className="h-full w-full text-primary-500" />
                            </div>
                            <span className="ml-2 hidden  flex-grow overflow-hidden text-ellipsis whitespace-nowrap lg:block">
                                {user?.email}
                            </span>
                        </div>
                        {user && !loading && (
                            <>
                                <Button size="sm" onClick={() => logout()}>
                                    <HiOutlineLogout className="h-5 w-5" />
                                </Button>
                            </>
                        )}
                        {!user && !loading && (
                            <>
                                <Link href="/auth/login">
                                    <a>
                                        <Button size="sm">
                                            <HiOutlineLogin className="h-5 w-5" />
                                        </Button>
                                    </a>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header
