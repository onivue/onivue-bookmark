import Link from 'next/link'

export default function Home() {
    return (
        <div className="relative">
            <div className="mx-auto py-20 text-center">
                <h2 className="pb-4 text-xl font-bold">onivue.ch</h2>
                <h1 className="bg-gradient-to-r from-primary-200 via-primary-400 to-primary-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                    onivue-bookmark
                </h1>
                <p className="pt-4 text-xl text-gray-500 ">keep your links in one place.</p>
            </div>
            <div className="mx-auto max-w-2xl  sm:py-24 lg:max-w-7xl ">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-1 xl:grid-cols-1 xl:gap-x-8">
                    <Link
                        href="/bookmark"
                        className="grid h-full w-full justify-center rounded-3xl bg-gradient-to-tr from-cyan-300 to-pink-300 p-8 text-white  shadow-2xl"
                        passHref
                    >
                        <h3 className="text-3xl font-bold">open Bookmarks</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}
