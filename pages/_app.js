/* eslint-disable @next/next/no-img-element */
import '@/styles/globals.css'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import SideBar from '@/components/Layout/SideBar/SideBar'
import TopBar from '@/components/Layout/Header/Header'
import RightSection from '@/components/Layout/RightSection/RightSection'
import Footer from '@/components/Layout/Footer/Footer'

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no ,height=device-height"
                />
                <title>onivue-...</title>
            </Head>

            <SideBar>
                <TopBar />
                <div className="flex flex-1">
                    <section className="mb-4 mt-4 flex flex-1 grid-cols-1 flex-col justify-between rounded-lg px-4 pb-4">
                        <Component {...pageProps} />
                        <Footer />
                    </section>
                    {/* <RightSection /> */}
                </div>
            </SideBar>
        </>
    )
}

export default MyApp
