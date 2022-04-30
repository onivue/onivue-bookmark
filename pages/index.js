import BookmarkRow from '@/components/Bookmarks/BookmarkRow'
import Hero from '@/components/Hero'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
    return (
        <div className="relative">
            {/* <Hero /> */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4">
                <BookmarkRow />
                <BookmarkRow />
                <BookmarkRow />
                <BookmarkRow />
                <BookmarkRow />
                <BookmarkRow />
            </div>
        </div>
    )
}
