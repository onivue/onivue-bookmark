import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
    return (
        <div className="relative">
            <div className="mx-auto py-20 text-center">
                <h2 className="pb-4 text-xl font-bold">onivue.ch</h2>
                <h1 className="bg-gradient-to-r from-primary-200 via-primary-400 to-primary-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                    TEMPLATE
                </h1>
                <p className="pt-4 text-xl text-gray-500 ">
                    There are many ways to learn, some are better than others.
                </p>
            </div>
            <div className="mx-auto max-w-2xl  sm:py-24 lg:max-w-7xl ">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                    <div className="h-full w-full rounded-3xl bg-gradient-to-br from-yellow-300 to-pink-500 p-8 text-white  shadow-2xl">
                        <h3 className="text-3xl font-bold">Self-Paced Lectures</h3>
                        <p className="py-5">
                            You have a busy life, we undestand that and believe in learning asynchronous.
                            Easily access the course anytime you want to learn.
                        </p>
                    </div>
                    <div className="h-full w-full rounded-3xl bg-gradient-to-br from-pink-400 to-blue-400 p-8 text-white shadow-2xl">
                        <h3 className="text-3xl font-bold">Jam-Packed with Content</h3>
                        <p className="py-5">
                            Next.js, GraphQL, Shopify Storefront API, Tailwind CSS, Vercel, React Hooks and so
                            much more!
                        </p>
                    </div>
                    <div className="h-full w-full rounded-3xl bg-gradient-to-br from-green-400 to-blue-400 p-8 text-white shadow-2xl">
                        <h3 className="text-3xl font-bold">Action Based</h3>
                        <p className="py-5">
                            This course is designed to get your started in as little time as possible. There
                            are no Uhhs or Hmms. All straight to the point.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
