/* eslint-disable @next/next/no-img-element */
import '@/styles/globals.css'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import SideBar from '@/components/Layout/SideBar/SideBar'
import Header from '@/components/Layout/Header/Header'
import RightSection from '@/components/Layout/RightSection/RightSection'
import Footer from '@/components/Layout/Footer/Footer'
import useAuthStore from '@/stores/useAuthStore'
import Unathorized from '@/components/Unauthorized/Unathorized'

function MyApp({ Component, pageProps }) {
    const user = useAuthStore((state) => state.user)
    const authListener = useAuthStore((state) => state.authListener)
    const loading = useAuthStore((state) => state.loading)
    const router = useRouter()
    /* MANDATORY FOR AUTH SYSTEM */
    useEffect(() => {
        let unsubscribe
        const subscribe = () => (unsubscribe = authListener())
        subscribe()
        return () => unsubscribe()
    }, [authListener])
    /* IF USER IS AUTHENTICATED REDIRECT AUTH PAGES ... */
    useEffect(() => {
        if (user) {
            if (router.pathname === '/auth/register' || router.pathname === '/auth/login') {
                router.push('/')
            }
        }
    }, [user, router])

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no ,height=device-height"
                />
                <title>onivue-bookmark</title>
            </Head>
            {router.pathname !== '/auth/register' &&
            router.pathname !== '/auth/resetpassword' &&
            router.pathname !== '/auth/login' &&
            router.pathname !== '/_error' &&
            !user &&
            !loading ? (
                <Unathorized />
            ) : (
                !loading && (
                    <div className="flex h-screen">
                        <SideBar width="20rem" />
                        <div className="flex flex-1 flex-col overflow-auto rounded-lg px-4 pb-4">
                            <Header />
                            <main>
                                <Component {...pageProps} />
                                {/* <RightSection /> */}
                            </main>
                            <Footer />
                        </div>
                    </div>
                )
            )}
        </>
    )
}

export default MyApp
